#!/usr/bin/env bash
# ============================================================
# 拾遗 · 冒烟测试 — 无头 Edge 逐站加载并检查 JS 错误
# 用法：bash tools/smoke-test.sh   （需 Git Bash / 任何 bash + Edge）
# 全部 OK = 六站无脚本错误
#
# 视口须知：本机 Edge headless 最窄视口约 518 CSS px（--window-size
# 小于该值会被钳制，新旧 headless 皆然）。要测真 390px 需真机/仿真器；
# 518 以下布局风险靠静态审计（nowrap/固定宽）兜底。
# ============================================================
set -u
EDGE="C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
[ -f "$EDGE" ] || EDGE="C:/Program Files/Microsoft/Edge/Application/msedge.exe"
[ -f "$EDGE" ] || { echo "[FAIL] 未找到 Edge"; exit 1; }

BASE="$(cd "$(dirname "$0")/.." && pwd)"
PASS=0; FAIL=0

for rel in "index.html" "ink/index.html" "echo/index.html#lv0" \
           "scape/index.html" "letters/index.html#p=lighthouse&n=n2" "fold/index.html"; do
  err=$("$EDGE" --headless --disable-gpu-sandbox --window-size=800,600 \
        --virtual-time-budget=4000 --dump-dom "file:///$BASE/$rel" 2>/dev/null \
        | tr -d '\000' | grep -aoE 'ERR: [^<"]*' | grep -v 'e\.message' | head -1)
  if [ -z "$err" ]; then
    echo "  [OK]   $rel"
    PASS=$((PASS + 1))
  else
    echo "  [FAIL] $rel"
    echo "         $err"
    FAIL=$((FAIL + 1))
  fi
done

echo
echo "结果：$PASS 通过，$FAIL 失败"
[ "$FAIL" -eq 0 ] && echo "全部通过 ✓"
exit "$FAIL"
