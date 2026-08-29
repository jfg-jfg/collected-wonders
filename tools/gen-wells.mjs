#!/usr/bin/env node
/* 生成 ECHO「名井集」精选关卡码：与游戏内 v3 生成器同源（从 echo/index.html 提取） */
import { readFileSync } from 'fs';
const code = readFileSync('echo/index.html', 'utf8');

function extract(name) {
  const start = code.indexOf(`function ${name}`);
  if (start < 0) throw new Error(`function ${name} not found`);
  let depth = 0, end = start;
  for (let i = start; i < code.length; i++) {
    if (code[i] === '{') depth++;
    if (code[i] === '}') { depth--; if (depth === 0) { end = i + 1; break; } }
  }
  return code.slice(start, end);
}

const src = ['mulberry32', 'genLevel', 'bfsDist', 'validateLevel', 'finishLevel'].map(extract).join('\n');
const make = new Function(src + '; return { mulberry32, genLevel, validateLevel, finishLevel };')();
const { mulberry32, genLevel, validateLevel, finishLevel } = make;

/* 新井规格：风格/尺寸/游魂各异；种子扫range内挑首个过验证且指标合适的 */
const specs = [
  { name: '乱石井', nameEn: 'Scree Well', w: 17, h: 13, style: 'random', ghosts: 1, seed: 41000, minPath: 24 },
  { name: '长巷井', nameEn: 'Long Lane Well', w: 25, h: 17, style: 'streets', ghosts: 2, seed: 52000 },
  { name: '回音壁', nameEn: 'Echo Wall', w: 21, h: 15, style: 'comb', ghosts: 1, seed: 63000 }
];

for (const s of specs) {
  for (let a = 0; a < 120; a++) {
    const rng = mulberry32(s.seed + a * 7919);
    const g = genLevel(s.w, s.h, rng, s.style);
    const fin = finishLevel(g);
    const val = validateLevel(fin.map, s.w, s.h);
    if (!val.valid) continue;
    if (val.pathLen < (s.minPath ?? s.w + s.h)) continue;   // 路径要有分量
    console.log(`✓ ${s.name} (${s.w}x${s.h} ${s.style}, attempt ${a}): par=${fin.par} path=${val.pathLen} junc=${val.junctions} ghosts=${s.ghosts}`);
    console.log('  ', JSON.stringify({ name: s.name, nameEn: s.nameEn, par: fin.par, ghosts: s.ghosts, code: btoa(fin.map.join('\n')) }));
    break;
  }
}
