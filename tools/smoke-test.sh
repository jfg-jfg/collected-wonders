#!/usr/bin/env bash
# ============================================================
# 拾遗 · 冒烟测试 — 无头 Edge 逐站加载并检查 JS 错误
# 用法：bash tools/smoke-test.sh   （需 Git Bash / 任何 bash + Edge）
# 全部 OK = 六站无脚本错误
# ============================================================
set -u
EDGE="C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
[ -f "$EDGE" ] || EDGE="C:/Program Files/Microsoft/Edge/Application/msedge.exe"
[ -f "$EDGE" ] || { echo "[FAIL] 未找到 Edge"; exit 1; }

BASE="$(cd "$(dirname "$0")/.." && pwd)"
PASS=0; FAIL=0

for rel in "index.html" "ink/index.html" "echo/index.html#lv0" \
           "scape/index.html" "letters/index.html#n2" "fold/index.html"; do
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
