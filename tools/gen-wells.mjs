#!/usr/bin/env node
/* 生成 ECHO「名井集」精选关卡码：与游戏内同款生成器逻辑 */
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function genMaze(w, h, rng, braid) {
  const g = Array.from({ length: h }, () => Array(w).fill('#'));
  const stack = [[1, 1]]; g[1][1] = '.';
  while (stack.length) {
    const [x, y] = stack[stack.length - 1];
    const dirs = [[2, 0], [-2, 0], [0, 2], [0, -2]].filter(([dx, dy]) => {
      const nx = x + dx, ny = y + dy;
      return nx > 0 && ny > 0 && nx < w - 1 && ny < h - 1 && g[ny][nx] === '#';
    });
    if (!dirs.length) { stack.pop(); continue; }
    const [dx, dy] = dirs[Math.floor(rng() * dirs.length)];
    g[y + dy / 2][x + dx / 2] = '.';
    g[y + dy][x + dx] = '.';
    stack.push([x + dx, y + dy]);
  }
  if (braid > 0) {
    for (let y = 1; y < h - 1; y++) for (let x = 1; x < w - 1; x++) {
      if (g[y][x] !== '.') continue;
      const nbs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
      const open = nbs.filter(([dx, dy]) => g[y + dy][x + dx] === '.');
      if (open.length === 1 && rng() < braid) {
        const cand = nbs.filter(([dx, dy]) => {
          const nx = x + dx, ny = y + dy, fx = x + dx * 2, fy = y + dy * 2;
          return nx > 0 && ny > 0 && nx < w - 1 && ny < h - 1 &&
                 g[ny][nx] === '#' && fy < h && fx < w && g[fy][fx] === '.';
        });
        if (cand.length) {
          const [dx, dy] = cand[Math.floor(rng() * cand.length)];
          g[y + dy][x + dx] = '.';
        }
      }
    }
  }
  return g;
}
function bfsDist(g, sx, sy) {
  const h = g.length, w = g[0].length;
  const dist = Array.from({ length: h }, () => Array(w).fill(-1));
  dist[sy][sx] = 0;
  const q = [[sx, sy]];
  let qi = 0;
  while (qi < q.length) {
    const [x, y] = q[qi++];
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nx = x + dx, ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= w || ny >= h || g[ny][nx] === '#') continue;
      if (dist[ny][nx] === -1) { dist[ny][nx] = dist[y][x] + 1; q.push([nx, ny]); }
    }
  }
  return dist;
}
function finishLevel(g) {
  const h = g.length, w = g[0].length;
  const dist = bfsDist(g, 1, 1);
  let gx = 1, gy = 1, best = -1;
  for (let y = 1; y < h - 1; y++) for (let x = 1; x < w - 1; x++)
    if (dist[y][x] > best) { best = dist[y][x]; gx = x; gy = y; }
  g[1][1] = 'S'; g[gy][gx] = 'G';
  const cand = [];
  for (let y = 1; y < h - 1; y++) for (let x = 1; x < w - 1; x++)
    if (g[y][x] === '.' && dist[y][x] > best * 0.35) cand.push([x, y, dist[y][x]]);
  cand.sort((a, b) => b[2] - a[2]);
  const picked = [];
  for (const c of cand) {
    if (picked.length >= 3) break;
    if (picked.every(p => Math.abs(p[0] - c[0]) + Math.abs(p[1] - c[1]) > 4)) picked.push(c);
  }
  picked.forEach(([x, y]) => g[y][x] = '*');
  const par = Math.round(best * 1.2) + 4;
  return { par, code: Buffer.from(g.map(r => r.join('')).join('\n'), 'utf8').toString('base64') };
}
/* 精选参数：不同手感的三口井（种子为手工挑选） */
const specs = [
  { name: '回纹井', w: 15, h: 11, braid: 0.0,  seed: 90210 },
  { name: '螺旋井', w: 19, h: 13, braid: 0.12, seed: 77031 },
  { name: '千廊井', w: 23, h: 15, braid: 0.22, seed: 31415 }
];
for (const s of specs) {
  const g = genMaze(s.w, s.h, mulberry32(s.seed), s.braid);
  const r = finishLevel(g);
  console.log(`${s.name} (${s.w}x${s.h}, braid ${s.braid}): par=${r.par}`);
  console.log('  code:', r.code);
}
