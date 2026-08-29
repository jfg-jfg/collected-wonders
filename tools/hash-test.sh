#!/usr/bin/env bash
# ============================================================
# 拾遗 · 全站 hash 直达回归 — 一条命令验证所有调试/功能钩子
# 用法：bash tools/hash-test.sh
# ============================================================
set -u
EDGE="C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
[ -f "$EDGE" ] || EDGE="C:/Program Files/Microsoft/Edge/Application/msedge.exe"
[ -f "$EDGE" ] || { echo "[FAIL] 未找到 Edge"; exit 1; }
BASE="$(cd "$(dirname "$0")/.." && pwd)"
PASS=0; FAIL=0

run() {
  local name="$1" url="$2"
  local err
  err=$(timeout 30 "$EDGE" --headless --disable-gpu \
    --user-data-dir="$(mktemp -d)" \
    --window-size=400,300 --virtual-time-budget=3000 \
    --dump-dom "file:///$BASE/$url" 2>/dev/null \
    | tr -d '\000' | grep -aoE 'ERR: [^<"]*' | grep -v "e\.message" | head -1)
  if [ -z "$err" ]; then
    echo "  [OK]   $name"
    PASS=$((PASS + 1))
  else
    echo "  [FAIL] $name → $err"
    FAIL=$((FAIL + 1))
  fi
}

echo "=== 全站 hash 回归 ==="

# 褶皱
run "fold 默认"        "fold/index.html"
run "fold dbg"         "fold/index.html#dbg"
run "fold deep 1e15"   "fold/index.html#dbg&x=-0.7435,y=0.1314,s=1.4e-15"
run "fold newton"      "fold/index.html#dbg&newton"
run "fold grid"        "fold/index.html#grid=1"
run "fold postcard"    "fold/index.html#postcard&preview"

# 回声
run "echo lv0"         "echo/index.html#lv0"
run "echo lv9 锁"      "echo/index.html#lv9"
run "echo lv11"        "echo/index.html#lv11"
run "echo 无尽5"       "echo/index.html#lv16"
run "echo daily"       "echo/index.html#dbg=daily"
run "echo edit"        "echo/index.html#edit"

# 墨
run "ink 默认"         "ink/index.html"
run "ink album"        "ink/index.html#dbg=album"
run "ink bench"        "ink/index.html#bench"
run "ink lab"          "ink/index.html#lab"

# 纸间
run "letters story"    "letters/index.html#p=lighthouse&n=n2"
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

# 门户
run "gallery EN"       "index.html#lang=en"

# 404
run "404 page"         "404.html"

echo
echo "结果：$PASS 通过，$FAIL 失败"
[ "$FAIL" -eq 0 ] && echo "全部通过 ✓"
exit "$FAIL"
