#!/usr/bin/env bash
# ============================================================
# 拾遗 · 全站 hash 直达回归 — 一条命令验证所有调试/功能钩子
# 用法：bash tools/hash-test.sh
#       （自动发现 Chrome/Edge；也可 BROWSER_BIN=/path/to/chrome 指定）
# 判定：普通状态 = 页面真实渲染 + 无 JS 错误；
#       lab 状态 = 另加正向断言 LAB PASS（FAIL/ERR/没跑到都算失败）
# ============================================================
set -u
. "$(dirname "$0")/_browser.sh"
init_browser
PASS=0; FAIL=0

run() {
  local name="$1" url="$2" dom err
  dom=$(dump_dom "$url" 4000)
  if ! grep -q '</html>' <<<"$dom"; then
    echo "  [FAIL] $name → 页面未渲染（dump 为空/截断）"
    FAIL=$((FAIL + 1)); return
  fi
  err=$(grep -aoE 'ERR: [^<"]*' <<<"$dom" | grep -v 'e\.message' | head -1)
  if [ -z "$err" ]; then
    echo "  [OK]   $name"
    PASS=$((PASS + 1))
  else
    echo "  [FAIL] $name → $err"
    FAIL=$((FAIL + 1))
  fi
}

run_lab() {
  local name="$1" url="$2" dom err lab
  dom=$(dump_dom "$url" 8000)
  if ! grep -q '</html>' <<<"$dom"; then
    echo "  [FAIL] $name → 页面未渲染（dump 为空/截断）"
    FAIL=$((FAIL + 1)); return
  fi
  err=$(grep -aoE 'ERR: [^<"]*' <<<"$dom" | grep -v 'e\.message' | head -1)
  if [ -n "$err" ]; then
    echo "  [FAIL] $name → $err"
    FAIL=$((FAIL + 1)); return
  fi
  lab=$(grep -aoE 'LAB (PASS|FAIL|ERR)[^<"]*' <<<"$dom" | tail -1)
  case "$lab" in
    "LAB PASS"*)
      echo "  [OK]   $name（${lab:0:72}）"
      PASS=$((PASS + 1)) ;;
    *)
      echo "  [FAIL] $name → ${lab:-LAB 结果缺失（断言没跑到？）}"
      FAIL=$((FAIL + 1)) ;;
  esac
}

echo "=== 全站 hash 回归 ==="

# 褶皱
run "fold 默认"        "fold/index.html"
run_lab "fold lab"         "fold/index.html#lab"
run "fold dbg"         "fold/index.html#dbg"
run "fold deep 1e15"   "fold/index.html#dbg&x=-0.7435,y=0.1314,s=1.4e-15"
run "fold newton"      "fold/index.html#dbg&newton"
run "fold grid"        "fold/index.html#grid=1"
run "fold postcard"    "fold/index.html#postcard&preview"

# 回声
run "echo lv0"         "echo/index.html#lv0"
run_lab "echo lab"         "echo/index.html#lab"
run "echo lv9 锁"      "echo/index.html#lv9"
run "echo lv11"        "echo/index.html#lv11"
run "echo 无尽5"       "echo/index.html#lv16"
run "echo daily"       "echo/index.html#dbg=daily"
run "echo edit"        "echo/index.html#edit"

# 墨
run "ink 默认"         "ink/index.html"
run "ink album"        "ink/index.html#dbg=album"
run "ink bench"        "ink/index.html#bench"
run_lab "ink lab"          "ink/index.html#lab"

# 纸间
run "letters story"    "letters/index.html#p=lighthouse&n=n2"
run_lab "letters lab"      "letters/index.html#lab"
run "letters obs n1"   "letters/index.html#p=observatory&n=n1"
run "letters obs n8"   "letters/index.html#p=observatory&n=n8"
run "letters wreck n1" "letters/index.html#p=wreck&n=n1"
run "letters wreck n4" "letters/index.html#p=wreck&n=n4"
run "letters editor"   "letters/index.html#dbg=editor"
run "letters ai"       "letters/index.html#dbg=ai"
run "letters import"   "letters/index.html#dbg=import"

# 造境
run "scape 默认"       "scape/index.html"
run " scape capture"   "scape/index.html#capture"
run_lab " scape lab"       "scape/index.html#lab"

# 门户
run "gallery EN"       "index.html#lang=en"

# 404
run "404 page"         "404.html"

echo
echo "结果：$PASS 通过，$FAIL 失败"
[ "$FAIL" -eq 0 ] && echo "全部通过 ✓"
exit "$FAIL"
