#!/usr/bin/env bash
# ============================================================
# 拾遗 · 一键全检 — 公约数 + 故事 + 关卡 + 名井 + 冒烟 + hash 回归
# 用法：bash tools/check.sh
# ============================================================
set -u
cd "$(dirname "$0")/.."
fail=0
step() {
  echo "=== $1 ==="
  shift
  if "$@"; then echo; else echo "✗ $1 失败"; fail=1; echo; fi
}
step "五站公约数"   bash tools/check-parity.sh
step "纸间故事包"   node tools/validate-stories.mjs
step "回声关卡"     node tools/validate-levels.mjs
step "名井生成器"   node tools/gen-wells.mjs
step "冒烟测试"     bash tools/smoke-test.sh
step "hash 回归"    bash tools/hash-test.sh
echo
[ "$fail" -eq 0 ] && echo "全部通过 ✓" || echo "有失败 ✗"
exit "$fail"
