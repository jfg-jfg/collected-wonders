#!/usr/bin/env bash
# ============================================================
# 拾遗 · 五站公约数检查 — 设计约定里"每站都有"的公共件，一处都不能少
# 约定清单见 docs/DESIGN.md「五站公约数」节；新增公约数时先补文档再补本脚本。
# 用法：bash tools/check-parity.sh
# ============================================================
set -u
cd "$(dirname "$0")/.."

SITES="index.html ink/index.html echo/index.html scape/index.html letters/index.html fold/index.html"

# 名称:字面量（grep -F 直配，全部是当前六站真实存在的写法）
CHECKS=(
  "zh-html-lang:<html lang=\"zh\">"
  "viewport-meta:name=\"viewport\""
  "error-hook:addEventListener('error'"
  "err-dom-sink:'ERR: '"
  "reduced-motion:prefers-reduced-motion"
  "color-scheme:color-scheme"
  "lang-hash-direct:match(/lang=("   # #lang=en|zh 直达（正则前半段为共同字面量）
)

fail=0
printf "%-22s" "site"
for c in "${CHECKS[@]}"; do printf " %-18s" "${c%%:*}"; done
echo
for site in $SITES; do
  printf "%-22s" "$site"
  for c in "${CHECKS[@]}"; do
    pat="${c#*:}"
    if grep -qF "$pat" "$site"; then
      printf " %-18s" "✓"
    else
      printf " %-18s" "✗ 缺"
      fail=$((fail + 1))
    fi
  done
  echo
done

echo
if [ "$fail" -eq 0 ]; then
  echo "全部通过 ✓ — 六站公约数齐备"
else
  echo "有 $fail 处缺失 ✗ — 五站公约数要求同步补齐（见 docs/DESIGN.md）"
fi
exit "$fail"
