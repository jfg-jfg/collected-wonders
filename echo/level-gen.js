/* 拾遗·回声 关卡生成器 —— 自 index.html 外置（v7.1）
   页面侧：<script src="level-gen.js"> 先于主脚本载入，LEVELS / FRAGS /
   生成函数以经典脚本全局词法绑定对主脚本可见（同 story-data.js 模式）。
   验证器侧：tools/validate-levels.mjs new Function 包装直读本文件，
   同种子必与页面同结果；validateLevels 的 #debug 报告带 location 守卫，
   node 下安全跳过。
   ================================================================ */

function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
/* ===================== 关卡生成 v2：房间-走廊 + 验证 ===================== */

/* 生成关卡 v3「加法结构」：从空地开始加策略墙
   比减法（从墙中挖房）更开阔、更少无意义厚墙 */
function genLevel(w, h, rng, style) {
  const g = Array.from({ length: h }, () => Array(w).fill('.'));
  // 边界
  for (let x = 0; x < w; x++) { g[0][x] = '#'; g[h-1][x] = '#'; }
  for (let y = 0; y < h; y++) { g[y][0] = '#'; g[y][w-1] = '#'; }

  const wall = (x, y) => { if (x >= 1 && x < w-1 && y >= 1 && y < h-1) g[y][x] = '#'; };
  const clear = (x, y) => { if (x >= 1 && x < w-1 && y >= 1 && y < h-1) g[y][x] = '.'; };

  switch (style) {
    case 'pillars': {
      // 柱阵：随机放置短墙段和孤柱，Ping 反射丰富
      const n = Math.floor(w * h * 0.10);
      for (let i = 0; i < n; i++) {
        const x = 2 + Math.floor(rng() * (w - 4));
        const y = 2 + Math.floor(rng() * (h - 4));
        const len = 1 + Math.floor(rng() * 3);
        const horiz = rng() > 0.5;
        for (let j = 0; j < len; j++) {
          wall(horiz ? x + j : x, horiz ? y : y + j);
        }
      }
      break;
    }
    case 'comb': {
      // 梳齿：交替上下/左右的齿状墙，形成蛇形通道
      const teeth = Math.floor(w / 4);
      for (let i = 1; i <= teeth; i++) {
        const x = 2 + i * 3;
        if (x >= w - 2) break;
        const fromTop = i % 2 === 1;
        const len = Math.floor(h * (0.5 + rng() * 0.25));
        for (let j = 1; j <= len && (fromTop ? j : h - 1 - j) > 0 && (fromTop ? j : h - 1 - j) < h - 1; j++) {
          wall(x, fromTop ? j : h - 1 - j);
        }
      }
      break;
    }
    case 'rooms': {
      // 蜂巢式房间：不规则墙段 + 策略性门 + 房间内柱
      const rw = Math.floor(w / 4), rh = Math.floor(h / 4);
      // 水平墙：不规则间距，部分段缺失
      for (let cy = 1; cy < rh; cy++) {
        const y = cy * 4 + Math.floor(rng() * 2);
        if (y >= h - 1) break;
        let x = 1;
        while (x < w - 1) {
          // 墙段长度随机 2-6
          const segLen = 2 + Math.floor(rng() * 5);
          // 跳过段（门/开口）
          const gapLen = rng() < 0.3 ? 1 + Math.floor(rng() * 2) : 0;
          for (let j = 0; j < segLen && x + j < w - 1; j++) wall(x + j, y);
          x += segLen + gapLen;
        }
      }
      // 垂直墙：类似但更稀疏
      for (let cx = 1; cx < rw; cx++) {
        const x = cx * 4 + Math.floor(rng() * 2);
        if (x >= w - 1) break;
        let y = 1;
        while (y < h - 1) {
          const segLen = 2 + Math.floor(rng() * 4);
          const gapLen = rng() < 0.35 ? 1 + Math.floor(rng() * 2) : 0;
          for (let j = 0; j < segLen && y + j < h - 1; j++) wall(x, y + j);
          y += segLen + gapLen;
        }
      }
      // 房间内柱：在开阔区加 1-3 格孤柱
      const pillarCount = Math.floor(rw * rh * 0.5);
      for (let i = 0; i < pillarCount; i++) {
        const px2 = 3 + Math.floor(rng() * (w - 6));
        const py2 = 3 + Math.floor(rng() * (h - 6));
        wall(px2, py2);
        if (rng() < 0.3) wall(px2 + 1, py2);  // 偶尔双柱
      }
      break;
    }
    case 'spiral': {
      // 螺旋壁：从外向内的弧形墙
      let x0 = 2, y0 = 2, x1 = w - 3, y1 = h - 3;
      let dir = 0; // 0→右 1→下 2→左 3→上
      while (x1 - x0 > 2 && y1 - y0 > 2) {
        if (dir === 0) { for (let x = x0; x <= x1; x++) wall(x, y0); y0 += 3; }
        else if (dir === 1) { for (let y = y0; y <= y1; y++) wall(x1, y); x1 -= 3; }
        else if (dir === 2) { for (let x = x1; x >= x0; x--) wall(x, y1); y1 -= 3; }
        else { for (let y = y1; y >= y0; y--) wall(x0, y); x0 += 3; }
        dir = (dir + 1) % 4;
      }
      // 开门
      for (let i = 0; i < 5; i++) {
        const x = 3 + Math.floor(rng() * (w - 6));
        const y = 3 + Math.floor(rng() * (h - 6));
        clear(x, y); clear(x + 1, y); clear(x, y + 1); clear(x + 1, y + 1);
      }
      break;
    }
    case 'streets': {
      // 街道网格：稀疏的横竖墙形成街区
      for (let cy = 2; cy < h - 2; cy += 4) {
        const gap1 = 2 + Math.floor(rng() * (w - 6));
        const gap2 = 2 + Math.floor(rng() * (w - 6));
        for (let x = 1; x < w - 1; x++) {
          if (Math.abs(x - gap1) > 1 && Math.abs(x - gap2) > 1) wall(x, cy);
        }
      }
      for (let cx = 2; cx < w - 2; cx += 5) {
        const gap1 = 2 + Math.floor(rng() * (h - 6));
        for (let y = 1; y < h - 1; y++) {
          if (Math.abs(y - gap1) > 1) wall(cx, y);
        }
      }
      break;
    }
    case 'random': {
      // 随机散墙：最灵活
      const n = Math.floor(w * h * 0.13);
      for (let i = 0; i < n; i++) {
        const x = 2 + Math.floor(rng() * (w - 4));
        const y = 2 + Math.floor(rng() * (h - 4));
        wall(x, y);
      }
      break;
    }
    case 'rings': {
      // 回环：同心环墙 + 交错缺口——声波在环间层层折返
      const cx = Math.floor(w / 2), cy = Math.floor(h / 2);
      const maxR = Math.floor(Math.min(w, h) / 2) - 1;
      for (let r = 3; r <= maxR; r += 2) {
        const baseA = rng() * Math.PI * 2;
        const gaps = [baseA, baseA + Math.PI * (0.7 + rng() * 0.6)];
        for (let y = 1; y < h - 1; y++) for (let x = 1; x < w - 1; x++) {
          if (Math.abs(Math.hypot(x - cx, y - cy) - r) < 0.85) {
            const a = Math.atan2(y - cy, x - cx);
            const nearGap = gaps.some(ga => {
              let da = Math.abs(a - ga) % (Math.PI * 2);
              if (da > Math.PI) da = Math.PI * 2 - da;
              return da < 0.5;
            });
            if (!nearGap) wall(x, y);
          }
        }
      }
      break;
    }
  }

  // 确保起点和终点周围开阔
  for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
    clear(2 + dx, 2 + dy);
    clear(w - 3 + dx, h - 3 + dy);
  }

  // 加壁龛（死胡同）：在墙边打 1-2 格深的凹槽
  const targetNiches = Math.max(4, Math.floor(w * h * 0.02));
  let nichesAdded = 0, guard = 0;
  while (nichesAdded < targetNiches && guard++ < 300) {
    const x = 2 + Math.floor(rng() * (w - 4));
    const y = 2 + Math.floor(rng() * (h - 4));
    if (g[y][x] !== '.') continue;
    // 找一面墙打开（形成死胡同）
    const dirs = [[1,0],[-1,0],[0,1],[0,-1]].filter(([dx,dy]) => {
      const nx = x + dx, ny = y + dy;
      return nx > 0 && ny > 0 && nx < w - 1 && ny < h - 1 && g[ny][nx] === '#';
    });
    if (!dirs.length) continue;
    const [dx, dy] = dirs[Math.floor(rng() * dirs.length)];
    const nx = x + dx, ny = y + dy;
    // 确保打开后是死胡同（nx,ny 的其他邻居仍是墙）
    let otherWalls = 0;
    for (const [ddx, ddy] of [[1,0],[-1,0],[0,1],[0,-1]]) {
      if (ddx === -dx && ddy === -dy) continue;  // 跳过来方向
      const px = nx + ddx, py = ny + ddy;
      if (px <= 0 || py <= 0 || px >= w - 1 || py >= h - 1 || g[py]?.[px] === '#') otherWalls++;
    }
    if (otherWalls >= 3) {
      g[ny][nx] = '.';
      nichesAdded++;
    }
  }
  return g;
}

/* BFS 距离场 */
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

/* 关卡验证：自动检查可玩性 */
function validateLevel(g, w, h) {
  const issues = [];
  // 找 S 和 G
  let sx = -1, sy = -1, gx = -1, gy = -1;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    if (g[y][x] === 'S') { sx = x; sy = y; }
    if (g[y][x] === 'G') { gx = x; gy = y; }
  }
  if (sx < 0 || gx < 0) { issues.push('no S/G'); return { valid: false, issues, pathLen: 0, niches: 0, junctions: 0 }; }
  // BFS 路径
  const dist = bfsDist(g, sx, sy);
  const pathLen = dist[gy][gx];
  if (pathLen < 0) issues.push('G unreachable');
  if (pathLen < 12) issues.push('path too short (' + pathLen + ')');
  if (pathLen > w * h * 0.5) issues.push('path too long (' + pathLen + ')');
  // 统计格型
  let junctions = 0, niches = 0, corridors = 0;
  for (let y = 1; y < h - 1; y++) for (let x = 1; x < w - 1; x++) {
    if (g[y][x] === '#') continue;
    let open = 0;
    for (const [dx, dy] of [[1,0],[-1,0],[0,1],[0,-1]])
      if (g[y + dy][x + dx] !== '#') open++;
    if (open >= 3) junctions++;
    else if (open === 1) niches++;
    else if (open === 2) corridors++;
  }
  if (junctions < 3) issues.push('too few junctions (' + junctions + ')');
  // 壁龛不强制（梳齿/螺旋结构天然少，靠环路和近距减速保可玩性）
  // 最长走廊段
  let maxRun = 0;
  for (let y = 1; y < h - 1; y++) {
    let run = 0;
    for (let x = 1; x < w - 1; x++) {
      if (g[y][x] !== '#') {
        let open = 0;
        for (const [dx, dy] of [[1,0],[-1,0],[0,1],[0,-1]])
          if (g[y + dy][x + dx] !== '#') open++;
        if (open === 2) run++;
        else { maxRun = Math.max(maxRun, run); run = 0; }
      } else { maxRun = Math.max(maxRun, run); run = 0; }
    }
  }
  if (maxRun > 20) issues.push('corridor too long (' + maxRun + ' cells)');  // 螺旋允许长走廊
  return {
    valid: issues.length === 0,
    issues,
    pathLen,
    niches,
    junctions,
    maxCorridor: maxRun
  };
}

/* 生成并通过验证的关卡（失败自动重试） */
function buildLevels() {
  const specs = [
    { w: 15, h: 11, seed: 1101, style: 'pillars' },  // 一 · 深井：柱阵
    { w: 17, h: 13, seed: 2202, style: 'comb' },      // 二 · 回廊：梳齿蛇形
    { w: 19, h: 13, seed: 3303, style: 'rooms' },     // 三 · 蜂巢：房间网格
    { w: 21, h: 15, seed: 4404, style: 'random' },    // 四 · 迷津：随机散墙
    { w: 23, h: 17, seed: 5505, style: 'rooms' },     // 五 · 巨殿：大房间
    { w: 23, h: 17, seed: 6606, style: 'rings' },     // 六 · 归途：回环（声波在环间折返）
    { w: 19, h: 13, seed: 7707, style: 'comb' },      // 七 · 旧钟楼：梳齿
    { w: 21, h: 15, seed: 8808, style: 'streets' },   // 八 · 沉街：街区
    { w: 23, h: 17, seed: 9909, style: 'spiral' },    // 九 · 门：螺旋+同心
    { w: 25, h: 17, seed: 11012, style: 'rooms' },    // 十 · 灯室：环厅房
    { w: 25, h: 19, seed: 12013, style: 'comb' },     // 十一 · 油路：管廊梳齿
    { w: 27, h: 19, seed: 13014, style: 'pillars' }   // 十二 · 天光：柱厅（与一层呼应）
  ];
  return specs.map(({ w, h, seed, style }) => {
    for (let a = 0; a < 20; a++) {
      const rng = mulberry32(seed + a * 7919);
      const g = genLevel(w, h, rng, style);
      const fin = finishLevel(g);
      const val = validateLevel(fin.map, w, h);
      if (val.valid) return fin;
    }
    const rng = mulberry32(seed);
    return finishLevel(genLevel(w, h, rng, style));
  });
}
/* 关卡完成器 v3：S 在角落附近、G 在 BFS 最远处（保证路径够长） */
function finishLevel(g) {
  const h = g.length, w = g[0].length;
  // 尝试多个起点，选路径最长的
  let bestS = null, bestG = null, bestLen = 0;
  const corners = [
    [2, 2], [w - 3, 2], [2, h - 3], [w - 3, h - 3],  // 四角
    [Math.floor(w / 2), 2], [2, Math.floor(h / 2)]     // 边中点
  ];
  for (const [cx, cy] of corners) {
    if (cx < 1 || cy < 1 || cx >= w - 1 || cy >= h - 1) continue;
    if (g[cy][cx] === '#') continue;
    const dist = bfsDist(g, cx, cy);
    let fx = cx, fy = cy, maxD = 0;
    for (let y = 1; y < h - 1; y++) for (let x = 1; x < w - 1; x++) {
      if (dist[y][x] > maxD) { maxD = dist[y][x]; fx = x; fy = y; }
    }
    if (maxD > bestLen) {
      bestLen = maxD;
      bestS = [cx, cy];
      bestG = [fx, fy];
    }
  }
  if (!bestS) {
    // 回退：第一个通路格
    for (let y = 1; y < h - 1; y++) for (let x = 1; x < w - 1; x++)
      if (g[y][x] !== '#') { bestS = [x, y]; y = h; break; }
    if (!bestS) bestS = [1, 1];
    const dist = bfsDist(g, bestS[0], bestS[1]);
    let maxD = 0; bestG = [bestS[0], bestS[1]];
    for (let y = 1; y < h - 1; y++) for (let x = 1; x < w - 1; x++)
      if (dist[y][x] > maxD) { maxD = dist[y][x]; bestG = [x, y]; }
    bestLen = maxD;
  }
  g[bestS[1]][bestS[0]] = 'S';
  g[bestG[1]][bestG[0]] = 'G';
  // 碎片
  const dist = bfsDist(g, bestS[0], bestS[1]);
  const cand = [];
  for (let y = 1; y < h - 1; y++) for (let x = 1; x < w - 1; x++)
    if (g[y][x] === '.' && dist[y][x] > bestLen * 0.2 && dist[y][x] > 0) cand.push([x, y, dist[y][x]]);
  cand.sort((a, b) => b[2] - a[2]);
  const picked = [];
  for (const c of cand) {
    if (picked.length >= 3) break;
    if (picked.every(p => Math.abs(p[0] - c[0]) + Math.abs(p[1] - c[1]) > 3)) picked.push(c);
  }
  picked.forEach(([x, y]) => g[y][x] = '*');
  const par = Math.round(bestLen * 1.2) + 4;
  return { par, map: g.map(r => r.join('')) };
}
const LEVELS = buildLevels();

/* 层级视觉主题：九层从浅到深的色调递变 */
const LV_THEMES = [
  { wall: [93,107,133], vig: [7,9,13],     glow: [125,145,180] },  // 一 · 深井：冷蓝灰
  { wall: [101,109,125], vig: [8,10,14],   glow: [130,148,172] },  // 二 · 回廊：微暖石板
  { wall: [133,113,83],  vig: [10,9,7],    glow: [180,158,120] },  // 三 · 蜂巢：琥珀蜜色
  { wall: [83,125,125],  vig: [6,10,10],   glow: [120,175,175] },  // 四 · 迷津：青碧
  { wall: [108,93,133],  vig: [9,7,13],    glow: [150,128,185] },  // 五 · 巨殿：深紫
  { wall: [133,108,75],  vig: [11,9,6],    glow: [195,168,115] },  // 六 · 归途：暖金
  { wall: [125,95,70],   vig: [10,7,5],    glow: [180,138,100] },  // 七 · 旧钟楼：铜锈
  { wall: [73,113,88],   vig: [5,10,7],    glow: [100,165,125] },  // 八 · 沉街：深绿
  { wall: [140,140,150], vig: [9,9,11],    glow: [200,200,215] },  // 九 · 门：银白
  { wall: [150,122,72],  vig: [11,9,5],    glow: [225,185,115] },  // 十 · 灯室：黄铜暖光
  { wall: [72,76,82],    vig: [5,6,7],     glow: [115,125,140] },  // 十一 · 油路：铁灰
  { wall: [172,176,186], vig: [12,12,13],  glow: [240,238,228] }   // 十二 · 天光：破晓银金
];
function lvTheme() { return LV_THEMES[Math.min(li, LV_THEMES.length - 1)]; }

/* 名井集：精选关卡码（tools/gen-wells.mjs 生成，种子手选） */
const WELL_PACK = [
  { name: "回纹井", nameEn: "Fret Well", par: 62, ghosts: 0,
    code: "IyMjIyMjIyMjIyMjIyMjCiNTLi4jLi4uLi4uLi4uIwojIyMuIyMjIyMjIy4jLiMKIyojLiMuLi4uLi4uIy4jCiMuIy4jLiMjIyMjIyMuIwojLiMuLi4jLipHIy4uLiMKIy4jIyMjIy4jIyMuIyMjCiMuLi4uLi4uIy4uLiMuIwojLiMuIyMjIyMuIyMjLiMKIyojLi4uLi4uLi4uLi4jCiMjIyMjIyMjIyMjIyMjIw==" },
  { name: "螺旋井", nameEn: "Spiral Well", par: 62, ghosts: 1,
    code: "IyMjIyMjIyMjIyMjIyMjIyMjIwojUy4uIy4uLi4uLi4jRyouLi4jCiMuIy4jLiMuIyMjLiMjIyMjLiMKIy4jLiMuIy4uLiMuIy4uLiMuIwojLiMuIy4jIyMuIy4jLiMuIy4jCiMuIy4jLi4uIy4jLiMqIy4jLiMKIy4jLiMjIy4jLiMuIy4jLiMuIwojLi4uIy4uLiMuIy4uLiMuLi4jCiMuIyMjLiMjIy4jIyMjIyMjLiMKIy4uLiMqIy4uLiMuLi4uLiMuIwojIyMuIyMjLiMuIy4jIyMuIy4jCiMuLi4uLi4uIy4uLi4uIy4uLiMKIyMjIyMjIyMjIyMjIyMjIyMjIw==" },
  { name: "千廊井", nameEn: "Thousand Halls", par: 131, ghosts: 2,
    code: "IyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMKI1MuLiMuLi4uLi4uLi4uLiMuLi4uLiMKIyMjLiMuIyMjLiMjIyMjLiMuIy4jLiMKI0cjLiMuLi4jLiMuLi4jLiMuIy4uLiMKIyojLiMjIy4jLiMuIy4jLiMjIyMjLiMKIy4jLi4uIy4jLi4uIy4jLi4uLi4uLiMKIy4jIyMuIy4jIyMjIy4jIyMjIyMjLiMKIy4uKiMuIy4jLi4uLi4jLi4uIy4uLiMKIyMjLiMuIyMjLiMjIyMjIyMuIy4jIyMKIy4uLiMuLi4uLiMuLi4uLi4uIy4uLiMKIyojLiMjIyMjIyMuIyMjIyMuIyMjLiMKIy4jLiMuLi4uLi4uIy4uLiMuIy4uLiMKIy4jIyMuIyMjLiMuIy4jLiMjIy4jIyMKIy4uLi4uLi4uLiMuLi4jLi4uLi4uLiMKIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyM=" }
,
  { name: "乱石井", nameEn: "Scree Well", par: 33, ghosts: 1,
    code: "IyMjIyMjIyMjIyMjIyMjIyMKIy4uLi4uLi4uLi4uLi4uLiMKIy5TLi4uLiMuLi4uIy4uLiMKIy4uLi4uLi4uLi4jLi4uLiMKIy4uLiMuLi4uLi4jLi4jLiMKIy4uLiMuLi4jLiNHIyMuLiMKIy4jLi4uLi4uLiMuKiMuLiMKIy4uIy4jLi4uIy4uIy4uLiMKIy4uLi4uIy4uLiMuLi4uLiMKIy4uLi4uLi4uLiMuLi4qLiMKIy4uIy4jLi4uIyMqLi4uLiMKIy4uLi4uLi4uLi4uLi4uLiMKIyMjIyMjIyMjIyMjIyMjIyM=" },
  { name: "长巷井", nameEn: "Long Lane Well", par: 54, ghosts: 2,
    code: "IyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIwojLi4uLi4uLi4uLiojLi4uLiMuLi4uIy4jCiMuLi4jIyMjIyMjIy4uLi4uLiMjIyMjIyMKIy4uLi4uLi4uLi4uLi4uLi4jLi4uLiMuIwojLi4uLi4uIy4uLi4uLi4uLiMuLi4uIy4jCiMuLi4uLi4jLi4uLiMuLi4uIy4uLi4jLiMKIyMuIy4uLi4jIyMjIyMjIy4jLiMjIyMjIwojLiMuLi4uIy4uLi4jLi4uLiMuLi4uIy4jCiMuIy4uLi4jLi4uLiMuLi4uIy4uLi4jLiMKIy4jLi4uLiMuLi4uIy4uLi4jLi4uLiMuIwojIyMjLi4uIyMjIyMjIy4uLiMjIyMjLiMjCiMuIy4uLi4jLi4uLiMuLi4uLi4uLi4uLiMKIy4jLi4uLiMuLi4uIy4uLi4uLi4uLi4uIwojLiMuLi4uIy4uLi4jLi4uLi4uLi4uLi4jCiMuIyouLi4qIyMjIyMjIyMjLiMjIy5TLiMKIy4jRy4uLiMuLi4uIy4uLi4jLi4uLi4uIwojIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMj" },
  { name: "回音壁", nameEn: "Echo Wall", par: 66, ghosts: 1,
    code: "IyMjIyMjIyMjIyMjIyMjIyMjIyMjCiMuLi4uIy4uLi4uIy4uLi4uIypHIwojLlMuLiMuLi4uLiMuLi4uLiMuLiMKIy4uLi4jLi4uLi4jLi4uLi4jLi4jCiMuLi4uIy4uLi4uIy4uIy4uIy4qIwojLi4uLiMuLiMuLiMuLiMuLiMuLiMKIy4uLi4jLi4jLi4jLi4jLi4jLi4jCiMuLi4uIy4uIy4uIy4uIy4uIy4uIwojLi4uLi4uLiMuLiMuLiMuLiMuLiMKIy4uLi4uLi4jLi4uLi4jLi4uLi4jCiMuLi4uLi4uIy4uLi4uIy4uLi4uIwojLi4uLi4uLiMuLi4uLiMuLi4uLiMKIy4uLi4uLi4jLi4uLi4jLi4uLi4jCiMuLi4uLi4uIy4uLi4uIy4uLi4qIwojIyMjIyMjIyMjIyMjIyMjIyMjIyM=" },
  { name: "同心井", nameEn: "Concentric Well", par: 40, ghosts: 2,
    code: "IyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMKIy4uLi4uLi4jIyMuIyMjLi4uLi4uLiMKIy4uLi4uLiMjIy4uLiMjIyMuLi4uLiMKIy4uLi4uLi4uLiMjIyMjIyMjLi4uLiMKIy4uLi4uLi4uLi4uLiMjIyMjLi4uLiMKIy4uLi4uLi4uIyMjLi4jIyMjIy4uLiMKIy4uLi4uLi4jIyMuLi4uIy4jIy4uLiMKIy4uLi4uIy4jIy4uLi4jLi4uIy4uLiMKIy4uLi4uIy4jLi4uLi4jLi4uLi4uLiMKIy4uLiMuIy4uIy4uLiMjLi4uLi4uLiMKIy4uLiMuIyMjKi4uLiojLi4uLi4uLiMKIy4uLiMjIyMjIy4uLiMjIy4uLi4uLiMKIy4uLi4uIyMjI0cqLiMjIy4uLi4uLiMKIy4uLi4jIyMjIyMjIyMjLi4uLi4uLiMKIy5TLi4uIyMjIy4uLiMuLi4uLi4uLiMKIy4uLi4uLi4jIyMjIyMjLi4uLi4uLiMKIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyM=" },
  { name: "石阵井", nameEn: "Pillar Garden", par: 38, ghosts: 1,
    code: "IyMjIyMjIyMjIyMjIyMjIyMjIwojLi4uLi4uLi4uLi4uLi4uKkcjCiMuLi4uIy4uLi4uLi4jIyMuLiMKIy4uLiMjIy4jLi4uLi4uLi4uIwojLi4jLiMjLiMjLi4jIy4uLiojCiMuLiMuLiMuLiMuLi4uLi4uLiMKIy4uLiMjIyMjLiMuLi4uLi4uIwojLi4uLi4uLi4uLi4uLi4uLi4jCiMuLi4uLi4uLi4uLi4jIyMuLiMKIy4uLi4uLi4uLiMjLi4uLi4uIwojLi4jLi4uLi4uLi4jLi4uLi4jCiMuIy4uLiMjIy4uIyMuIy4uLiMKIy5TIy4uIyMuLiMuLi4jLi4uIwojLi4uLi4uLi4uIy4uLiMuLiojCiMjIyMjIyMjIyMjIyMjIyMjIyM=" }];

/* 无尽层：通关全部主线后解锁，尺寸与密度随深度增长 */
function buildEndless(di) {
  const w = Math.min(29, 21 + di * 2), h = Math.min(21, 15 + di);
  const styles = ['pillars','comb','rooms','random','spiral','streets','rings'];
  const style = styles[di % styles.length];
  for (let a = 0; a < 20; a++) {
    const rng = mulberry32(7700 + di * 137 + a * 7919);
    const g = genLevel(w, h, rng, style);
    const fin = finishLevel(g);
    if (validateLevel(fin.map, w, h).valid) return fin;
  }
  const rng = mulberry32(7700 + di * 137);
  return finishLevel(genLevel(w, h, rng, style));
}
const lvName = i => isCustom ? customName : (i < LEVELS.length ? T().lvNames[i] : T().endlessName(i - LEVELS.length));

/* 每日挑战：日期种子迷宫 */
function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
function buildDaily() {
  let s = 0;
  for (const ch of todayKey()) s = (s * 31 + ch.charCodeAt(0)) >>> 0;
  const styles = ['pillars','comb','rooms','random','spiral','streets','rings'];
  const style = styles[s % styles.length];
  for (let a = 0; a < 20; a++) {
    const rng = mulberry32(s + a * 7919);
    const g = genLevel(19, 13, rng, style);
    const fin = finishLevel(g);
    if (validateLevel(fin.map, 19, 13).valid) return fin;
  }
  const rng = mulberry32(s);
  return finishLevel(genLevel(19, 13, rng, style));
}
/* 每日碎片：日期种子从守灯人日记选一句做当日专属碎片 */
function dailyFrag() {
  const frags = lang === 'zh' ? FRAGS.zh : FRAGS.en;
  let s = 0;
  for (const ch of todayKey()) s = (s * 31 + ch.charCodeAt(0)) >>> 0;
  return frags[s % frags.length];
}

/* BFS 连通性校验 + 验证报告 */
function validateLevels() {
  LEVELS.forEach((L, li) => {
    const g = L.map;
    const h = g.length, w = g[0].length;
    let start = null, goal = null;
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      if (g[y][x] === 'S') start = [x, y];
      if (g[y][x] === 'G') goal = [x, y];
    }
    if (!start || !goal) throw new Error('level ' + li + ': missing S/G');
    const seen = new Set([start.join(',')]);
    const q = [start];
    while (q.length) {
      const [x, y] = q.shift();
      for (const [dx, dy] of [[1,0],[-1,0],[0,1],[0,-1]]) {
        const nx = x + dx, ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
        const c = g[ny][nx];
        if (c === '#') continue;
        const k = nx + ',' + ny;
        if (!seen.has(k)) { seen.add(k); q.push([nx, ny]); }
      }
    }
    if (!seen.has(goal.join(','))) throw new Error('level ' + li + ': goal unreachable');
    // #debug 输出验证报告
    if (typeof location !== 'undefined' && location.hash.includes('debug')) {
      const val = validateLevel(g, w, h);
      console.log(`L${li + 1}: path=${val.pathLen} junctions=${val.junctions} niches=${val.niches} maxCorr=${val.maxCorridor} valid=${val.valid}${val.issues.length ? ' ISSUES: ' + val.issues.join('; ') : ''}`);
    }
  });
}
validateLevels();

/* 剧情碎片：每层一句（双语） */
const FRAGS = {
  zh: [
    '「第一夜：井水涨了三寸。有人在水下敲墙，节奏像摇篮曲。」',
    '「第三年：我们不再数星星。我们数船——它们再也不来了。」',
    '「第七年：搬来的人走了，留下的门全朝着海。他们说黑暗比风暴仁慈。」',
    '「第十一年：孩子问我：回声是谁在说话？我说：是我们走过的路，替我们记得。」',
    '「第十九年：巨殿的石柱上刻满了名字。我数到最后一个，是我自己的。」',
    '「第二十三年：钟楼的齿轮卡住了一封信。信封上写着——给还活着的人。」',
    '「第二十七年：沉街的窗台上，鞋还成双摆着。有人到最后一刻，仍在等另一个人回来穿鞋。」',
    '「第三十一年：灯还亮着。我不知道是谁在添油。我不敢下去看。」',
    '「最后一夜：门开了。门外不是海，是光。我听见有人在光里叫我的名字——是我的声音。」',
    '「灯室：钥匙挂在门后第三颗钉子上，我闭着眼也够得到。在这座城里，手比眼睛可靠。」',
    '「油路：又堵了，老塔的旧病。我提着马灯下机房，来回四分钟。四分钟，够埋葬很多东西——也够救回一个年轻人。」',
    '「如果有一天你读到这里：替我把灯点亮一次，十分钟就够。让它最后亮一次，像有人在。——周远」'
  ],
  en: [
    '"Night one: the well water rose three inches. Someone knocking from below, in lullaby rhythm."',
    '"Year three: we stopped counting stars. We counted ships — they stopped coming."',
    '"Year seven: the newcomers left, doors facing the sea. They said darkness is kinder than storms."',
    '"Year eleven: a child asked me — who speaks in echoes? I said: the roads we walked, remembering for us."',
    '"Year nineteen: the great hall pillars covered in names. I counted to the last one. It was mine."',
    '"Year twenty-three: a letter wedged in the clockwork. The envelope reads — to whoever is still alive."',
    '"Year twenty-seven: on the drowned street, shoes still paired on windowsills. Some, in the last moment, still waited for someone to come home and put them on."',
    '"Year thirty-one: the lamp is still lit. I don\'t know who tends it. I\'m afraid to go down and look."',
    '"The last night: the gate opened. Beyond it not the sea, but light. I heard someone call my name in the light — it was my own voice."',
    '"The lamp room: the key hangs on the third nail behind the door; I can reach it with my eyes closed. In this city, hands are truer than eyes."',
    '"The oil line: choked again — an old tower\'s old ailment. I took the storm lantern down to the engine room, four minutes, there and back. Four minutes is long enough to bury many things, and long enough to save one young man."',
    '"If you ever read this far: light the lamp once for me. Ten minutes is enough. Let it burn one last time, as if someone were here. — Zhou Yuan"'
  ]
};
