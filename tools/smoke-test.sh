#!/usr/bin/env bash
# ============================================================
# 拾遗 · 冒烟测试 — 无头浏览器逐站加载：渲染存活 + JS 错误检查
# 用法：bash tools/smoke-test.sh
#       （自动发现 Chrome/Edge；也可 BROWSER_BIN=/path/to/chrome 指定）
# 全部 OK = 九个状态页面真实渲染（dump 含 </html>）且无脚本错误
#
# 视口须知：本机 Chrome/Edge headless 最窄视口约 518 CSS px
# （--window-size 小于该值会被钳制，新旧 headless 皆然）。
# 要测真 390px 需真机/仿真器；518 以下布局风险靠静态审计
# （nowrap/固定宽）兜底。
# ============================================================
set -u
. "$(dirname "$0")/_browser.sh"
init_browser
PASS=0; FAIL=0

for rel in "index.html" "ink/index.html" "ink/index.html#dbg=album" "echo/index.html#lv0" \
           "echo/index.html#dbg=daily" "scape/index.html" \
           "letters/index.html#p=lighthouse&n=n2" "letters/index.html#dbg=editor" "fold/index.html"; do
  dom=$(dump_dom "$rel" 4000)
  if ! grep -q '</html>' <<<"$dom"; then
    echo "  [FAIL] $rel"
    echo "         页面未渲染（dump 为空/截断——浏览器是否静默失败？）"
    FAIL=$((FAIL + 1))
    continue
  fi
  err=$(grep -aoE 'ERR: [^<"]*' <<<"$dom" | grep -v 'e\.message' | head -1)
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
