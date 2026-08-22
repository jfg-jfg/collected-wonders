/* 独立验证脚本：从 echo/index.html 提取关卡生成代码并验证 */
import { readFileSync } from 'fs';
const code = readFileSync('echo/index.html', 'utf8');

function extract(name) {
  const start = code.indexOf(`function ${name}`);
  if (start < 0) return null;
  let depth = 0, end = start;
  for (let i = start; i < code.length; i++) {
    if (code[i] === '{') depth++;
    if (code[i] === '}') { depth--; if (depth === 0) { end = i + 1; break; } }
  }
  return code.slice(start, end);
}

const fns = ['mulberry32', 'genChamberMaze', 'bfsDist', 'validateLevel', 'finishLevel']
  .map(extract).filter(Boolean).join('\n');
const make = new Function(fns + '; return { mulberry32, genChamberMaze, bfsDist, validateLevel, finishLevel };')();
const { mulberry32, genChamberMaze, validateLevel, finishLevel } = make;

const specs = [
  { w: 13, h: 9,  seed: 1101 }, { w: 15, h: 11, seed: 2202 },
  { w: 17, h: 13, seed: 3303 }, { w: 19, h: 13, seed: 4404 },
  { w: 21, h: 15, seed: 5505 }, { w: 21, h: 15, seed: 6606 },
  { w: 15, h: 11, seed: 7707 }, { w: 17, h: 13, seed: 8808 },
  { w: 19, h: 15, seed: 9909 }
];

let allValid = true;
specs.forEach(({ w, h, seed }, li) => {
  let result = null;
  for (let a = 0; a < 20; a++) {
    const rng = mulberry32(seed + a * 7919);
    const g = genChamberMaze(w, h, rng);
    const fin = finishLevel(g);
    const val = validateLevel(fin.map, w, h);
    if (val.valid) { result = { val, attempt: a }; break; }
    if (a === 19) result = { val, attempt: a };
  }
  const v = result.val;
  const ok = v.valid ? '✓' : '✗ ' + v.issues.join('; ');
  console.log(`L${li + 1} (${w}x${h}): path=${v.pathLen} junc=${v.junctions} niche=${v.niches} maxCorr=${v.maxCorridor} ${ok}${result.attempt > 0 ? ' (retry ' + result.attempt + ')' : ''}`);
  if (!v.valid) allValid = false;
});
console.log(allValid ? '\n全部通过 ✓' : '\n有失败 ✗');
