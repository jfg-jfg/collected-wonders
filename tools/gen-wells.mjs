#!/usr/bin/env node
/* 生成 ECHO「名井集」精选关卡码：与游戏内 v3 生成器同源（直读 echo/level-gen.js） */
import { readFileSync } from 'fs';
const src = readFileSync('echo/level-gen.js', 'utf8');
const make = new Function(src + '; return { mulberry32, genLevel, validateLevel, finishLevel };')();
const { mulberry32, genLevel, validateLevel, finishLevel } = make;

/* 新井规格：风格/尺寸/游魂各异；种子扫range内挑首个过验证且指标合适的 */
const specs = [
  { name: '同心井', nameEn: 'Concentric Well', w: 23, h: 17, style: 'rings', ghosts: 2, seed: 81000, minPath: 30 },
  { name: '石阵井', nameEn: 'Pillar Garden', w: 19, h: 15, style: 'pillars', ghosts: 1, seed: 94000, minPath: 26 }
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
