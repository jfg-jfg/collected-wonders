# ============================================================
# 拾遗 · 无头浏览器公共件 — 被 smoke-test.sh / hash-test.sh source
#
# 事故背景（2026-09，记入 DESIGN.md 质量事故档案）：
#   ① 本机 Edge 更新后 --headless --dump-dom 静默输出空，旧脚本
#      "查无 ERR: 即 OK" 全绿空转——页面根本没渲染也算通过；
#   ② #lab 的失败输出是 `LAB FAIL/ERR`（无冒号），与捕获正则
#      'ERR: ' 不匹配，实验室失败对回归脚本不可见。
#
# 新约定：
#   ① 每个状态必须证明"页面真的渲染了"（dump 含 </html>）才算通过
#   ② lab 状态额外正向断言 LAB PASS（FAIL / ERR / 没跑到 都算失败）
#   ③ 浏览器自动发现：$BROWSER_BIN → Chrome → Edge → PATH
#      （Chrome 优先：软件 WebGL 跑 lab 更稳；Edge 保留兜底）
# ============================================================

find_browser() {
  local p
  if [ -n "${BROWSER_BIN:-}" ]; then
    { [ -f "$BROWSER_BIN" ] || command -v "$BROWSER_BIN" >/dev/null 2>&1; } \
      && { printf '%s' "$BROWSER_BIN"; return 0; }
    echo "[FAIL] BROWSER_BIN=$BROWSER_BIN 不存在" >&2
    return 1
  fi
  for p in \
    "/c/Program Files/Google/Chrome/Application/chrome.exe" \
    "/c/Program Files (x86)/Google/Chrome/Application/chrome.exe" \
    "/c/Program Files/Microsoft/Edge/Application/msedge.exe" \
    "/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" \
    google-chrome google-chrome-stable chromium chromium-browser chrome msedge microsoft-edge
  do
    case "$p" in
      /*) [ -f "$p" ] && { printf '%s' "$p"; return 0; } ;;
    *) command -v "$p" >/dev/null 2>&1 && { printf '%s' "$p"; return 0; } ;;
    esac
  done
  echo "[FAIL] 未找到 Chrome/Edge，可设 BROWSER_BIN 指定浏览器" >&2
  return 1
}

init_browser() {
  BROWSER="$(find_browser)" || exit 1
  BASE="$(cd "$(dirname "$0")/.." && pwd)"
  case "$(uname -s)" in
    MINGW*|MSYS*|CYGWIN*)
      # Git Bash 的 /d/... 路径 Chrome/Edge 不认，转盘符形式
      BASE="$(cygpath -m "$BASE")" ;;
  esac
  BFLAGS=(--headless=new --disable-gpu --enable-unsafe-swiftshader --no-first-run --window-size=800,600)
  # CI 容器/root 下 Chromium 沙箱常不可用
  if [ -n "${CI:-}" ] || [ "$(id -u 2>/dev/null || echo 1)" = "0" ]; then
    BFLAGS+=(--no-sandbox)
  fi
}

# dump_dom <rel-url> [virtual-time-budget-ms] → DOM 输出到 stdout（已去 \0）
# 注意：fold lab 的 BigInt 参考轨道约需 55s 真实 CPU 时间，virtual-time
# 预算加速不了同步计算——timeout 必须放宽，且空渲染重试一次（偶发）。
dump_dom() {
  local rel="$1" budget="${2:-4000}" prof out t=timeout
  command -v timeout >/dev/null 2>&1 || t=
  prof="$(mktemp -d)" || return 1
  case "$(uname -s)" in
    MINGW*|MSYS*|CYGWIN*) prof="$(cygpath -m "$prof")" ;;
  esac
  out=$($t 240 "$BROWSER" "${BFLAGS[@]}" --user-data-dir="$prof" \
    --virtual-time-budget="$budget" --dump-dom "file://$BASE/$rel" 2>/dev/null | tr -d '\000')
  if ! grep -q '</html>' <<<"$out"; then
    out=$($t 240 "$BROWSER" "${BFLAGS[@]}" --user-data-dir="$prof" \
      --virtual-time-budget="$budget" --dump-dom "file://$BASE/$rel" 2>/dev/null | tr -d '\000')
  fi
  rm -rf "$prof" 2>/dev/null || true
  printf '%s' "$out"
}
