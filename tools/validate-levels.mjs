/* 独立验证脚本：直读 echo/level-gen.js 复验全部内置关卡
   （页面 <script src> 与本脚本加载同一份生成器，同种子必同结果——
    替代旧版"从 index.html 花括号计数抠函数"的脆弱抽取） */
import { readFileSync } from 'fs';
const src = readFileSync('echo/level-gen.js', 'utf8');
const make = new Function(src + '; return { mulberry32, genLevel, validateLevel, finishLevel, buildLevels };')();
const { buildLevels, validateLevel } = make;

const specs = [
  { w: 15, h: 11 }, { w: 17, h: 13 }, { w: 19, h: 13 },
  { w: 21, h: 15 }, { w: 23, h: 17 }, { w: 23, h: 17 },
  { w: 19, h: 13 }, { w: 21, h: 15 }, { w: 23, h: 17 },
  { w: 25, h: 17 }, { w: 25, h: 19 }, { w: 27, h: 19 }
];

const LEVELS = buildLevels();
let allValid = true;
LEVELS.forEach((fin, li) => {
  const { w, h } = specs[li];
  const v = validateLevel(fin.map, w, h);
  const ok = v.valid ? '✓' : '✗ ' + v.issues.join('; ');
  console.log(`L${li + 1} (${w}x${h}): path=${v.pathLen} junc=${v.junctions} niche=${v.niches} maxCorr=${v.maxCorridor} ${ok}`);
  if (!v.valid) allValid = false;
});

/* 额外：随机种子压力测试 —— 生成器对任意种子也应稳定出可玩关卡（放宽 20 次重试上限即页面行为） */
let stressFail = 0;
for (let s = 1; s <= 40; s++) {
  const rng = make.mulberry32(s * 131);
  const styles = ['pillars','comb','rooms','random','spiral','streets','rings'];
  const g = make.genLevel(19, 13, rng, styles[s % 7]);
  const fin = make.finishLevel(g);
  if (!validateLevel(fin.map, 19, 13).valid) stressFail++;
}
console.log(`随机压力：40 样本 ${stressFail} 个未过（页面内会自动换种子重试）`);
console.log(allValid ? '\n全部通过 ✓' : '\n有失败 ✗');
process.exit(allValid ? 0 : 1);
