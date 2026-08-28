/* 独立验证脚本：校验 letters/story-data.js 全部故事包
   覆盖：order 引用 / 回信与 contTo 悬挂 / 空正文 / 隐藏结局完整性 /
         图可达性（replies + contTo + order 顺延，与页面引擎一致）
   用法：node tools/validate-stories.mjs */
import { readFileSync } from 'fs';
const src = readFileSync('letters/story-data.js', 'utf8')
  .replace('const BUILTIN_STORIES', 'globalThis.BUILTIN_STORIES');
(0, eval)(src);
const ALL = globalThis.BUILTIN_STORIES;

let errs = [];
for (const p of ALL) {
  const known = new Set([...Object.keys(p.letters.zh), ...Object.keys(p.endings.zh)]);
  p.order.forEach(k => { if (!known.has(k)) errs.push(`${p.id} order→missing ${k}`); });
  for (const [lang, nodes] of Object.entries(p.letters)) {
    const ends = p.endings[lang] || {};
    for (const [k, n] of Object.entries(nodes)) {
      if (!n.text) errs.push(`${p.id}/${lang}/${k} empty text`);
      for (const r of (n.replies || []))
        if (!(nodes[r.to] || ends[r.to])) errs.push(`${p.id}/${lang}/${k} reply→${r.to} dangling`);
      if (n.contTo && !(nodes[n.contTo] || ends[n.contTo])) errs.push(`${p.id}/${lang}/${k} contTo→${n.contTo} dangling`);
    }
  }
  const h = p.hiddenEnding;
  if (h) {
    if (!p.endings.zh[h.id]) errs.push(`${p.id} hidden ending missing ${h.id}`);
    if (!p.endings.zh[h.replace]) errs.push(`${p.id} hidden replace missing ${h.replace}`);
    for (const req of h.require) if (!p.letters.zh[req]) errs.push(`${p.id} hidden require missing ${req}`);
  }
  // 图可达性
  const letters = p.order.filter(x => !String(x).startsWith('E'));
  const nextAfter = id => { const i = letters.indexOf(id); return letters[Math.min(i + 1, letters.length - 1)]; };
  for (const lang of Object.keys(p.letters)) {
    const nodes = p.letters[lang], ends = p.endings[lang] || {};
    const seen = new Set(), q = [letters[0]];
    while (q.length) {
      const k = q.pop();
      if (!k || seen.has(k)) continue;
      seen.add(k);
      const n = nodes[k];
      if (!n) continue;
      if (n.replies && n.replies.length) n.replies.forEach(r => q.push(r.to));
      else q.push(n.contTo || nextAfter(k));
    }
    for (const k of Object.keys(nodes)) if (!seen.has(k)) errs.push(`${p.id}/${lang} unreachable letter ${k}`);
    for (const k of Object.keys(ends))
      if (!(seen.has(k) || (h && k === h.id))) errs.push(`${p.id}/${lang} unreachable ending ${k}`);
  }
}

if (errs.length) {
  console.error('FAIL');
  errs.forEach(e => console.error('  ' + e));
  process.exit(1);
}
for (const p of ALL) {
  const h = p.hiddenEnding;
  const hid = h ? ` · hidden ${h.id}(${h.require.join('+')}→替换${h.replace})` : '';
  console.log(`✓ ${p.id}: ${Object.keys(p.letters.zh).length}信/${Object.keys(p.endings.zh).length}结局${hid}`);
}
console.log(`\n全部通过 ✓ — ${ALL.length} 个故事包`);
