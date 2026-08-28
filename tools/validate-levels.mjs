/* 独立验证脚本：从 echo/index.html 提取关卡生成代码并复验全部内置关卡
   （与页面内 buildLevels 同源同种子，双保险） */
import { readFileSync } from 'fs';
const code = readFileSync('echo/index.html', 'utf8');

function extract(name) {
  const start = code.indexOf(`function ${name}`);
  if (start < 0) throw new Error(`function ${name} not found in echo/index.html`);
  let depth = 0, end = start;
  for (let i = start; i < code.length; i++) {
    if (code[i] === '{') depth++;
    if (code[i] === '}') { depth--; if (depth === 0) { end = i + 1; break; } }
  }
  return code.slice(start, end);
}

const names = ['mulberry32', 'genLevel', 'bfsDist', 'validateLevel', 'finishLevel', 'buildLevels'];
const src = names.map(extract).join('\n');
const make = new Function(src + '; return { mulberry32, genLevel, validateLevel, finishLevel, buildLevels };')();
const { buildLevels, validateLevel } = make;

const specs = [
  { w: 15, h: 11 }, { w: 17, h: 13 }, { w: 19, h: 13 },
  { w: 21, h: 15 }, { w: 23, h: 17 }, { w: 23, h: 17 },
  { w: 19, h: 13 }, { w: 21, h: 15 }, { w: 23, h: 17 }
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
  const styles = ['pillars','comb','rooms','random','spiral','streets'];
  const g = make.genLevel(19, 13, rng, styles[s % 6]);
  const fin = make.finishLevel(g);
  if (!validateLevel(fin.map, 19, 13).valid) stressFail++;
}
console.log(`随机压力：40 样本 ${stressFail} 个未过（页面内会自动换种子重试）`);
console.log(allValid ? '\n全部通过 ✓' : '\n有失败 ✗');
