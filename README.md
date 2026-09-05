# 拾遗 · Collected Wonders

[![CI](https://github.com/jfg-jfg/collected-wonders/actions/workflows/ci.yml/badge.svg)](https://github.com/jfg-jfg/collected-wonders/actions/workflows/ci.yml)

> 五件小小的奇物 · Five small wonders
> 零依赖 · 纯原生 HTML/CSS/JS · 双击即开 · 中英双语

一批以"创意网站"为载体的独立小作品。没有构建步骤、没有框架、没有 CDN、没有图片资源——每个作品都是一个自包含的 HTML 文件，双击即可在浏览器中运行。

**入口**：打开 `index.html`（序 · GALLERY 作品门户，含跨站使用统计）

**在线版**：<https://jfg-jfg.github.io/collected-wonders/> · **源码**：<https://github.com/jfg-jfg/collected-wonders>

## 作品 · Works

| # | 作品 | 类型 | 一句话 | 代表细节 |
|---|------|------|--------|----------|
| 1 | [墨 · INK](ink/index.html) | 视觉实验 / 流体 | 水墨流体画室：缓行则浓，疾书则淡 | 四笔刷 · 八色墨自定 · 四种纸质 · 真颜料 RGB 混色 · 湿边积墨 · 提按与枯笔丝缕 · 题款装裱 · 画册存档 |
| 2 | [回声 · ECHO](echo/index.html) | 游戏 / 解谜 | 无光迷宫中，以回声照亮前路 | 十二层主线+登塔终章 · 钥匙与天光之门 · 蓄力/定向声呐 · 三型游魂 AI · 造井编辑器 · 成就/每日/无尽 |
| 3 | [造境 · SCAPE](scape/index.html) | 工具 / 声景 | 声画同源的环境生成器 | 十声道纯数学合成 · 七主题 · 昼夜与季节 · 时光流转 · `#w=` 分享 · 录制 · 睡眠定时 · 每日气象 |
| 4 | [纸间 · LETTERS](letters/index.html) | 叙事 / 书信 | 六个信箱，或让 AI 写、亲手写你的故事 | 六内置故事（各含隐藏结局） · 分支书信图引擎 · AI 提示词 · 手写编辑器 · 导入校验 · WebAudio 纸声 |
| 5 | [褶皱 · FOLD](fold/index.html) | 技术 / 分形 | 一颗无限细节的星球 | 微扰引擎下限 10²⁰ · 四模式 · 航行日志 · 每日星球 · 叙事巡航 · 触底「灯还亮着」 |

每件作品的完整特性清单见 [docs/DESIGN.md](docs/DESIGN.md)。

### Works in English

- **INK** — an ink-wash fluid painting studio; slow strokes bloom dark, fast strokes leave dry-brush silk
- **ECHO** — a maze game in total darkness: sonar ripples are your only light
- **SCAPE** — a procedural soundscape & scene generator; ten synthesized channels, seven themes
- **LETTERS** — six mailboxes of branching letters; write with an AI, or by hand
- **FOLD** — a fractal planet of infinite detail; perturbation float down to 10²⁰

## 技术核心

- **墨**：WebGL2 手写 Stable Fluids 求解器（advection / vorticity / Jacobi 压力迭代），**真颜料 RGB 混色**（染料四通道：颜料预乘+湿度），动态三档画质
- **回声**：声呐涟漪照明、六风格加法式迷宫生成（开放底图 + 战略置墙 + BFS 结构验证，生成器外置 `echo/level-gen.js`）、游魂 BFS+评分 AI、WebAudio 全合成音效
- **造境**：十声道纯数学合成（零采样），时刻参数统一驱动天色/日月/星/窗灯/声音，事件调度器（雷/钟/鸟），MediaRecorder 音画同录
- **纸间**：分支书信图引擎（replies + contTo + 隐藏结局替换）、故事包 JSON schema、图可达性验证、WebAudio 纸声合成
- **褶皱**：df64 双单算术 GLSL 着色器、readPixels 密度分析巡航、按需渲染 + 空闲补帧

## 设计原则

- **零依赖**：不依赖任何外部资源，离线可用，`file://` 协议直接运行
- **单文件**：每个作品一个 `index.html`；仅两处例外，都是"页面与 node 验证器同源直读"的纯逻辑/数据文件（纸间故事数据 `letters/story-data.js`，回声关卡生成器 `echo/level-gen.js`）
- **双语**：全站中/EN 切换，localStorage 记忆偏好
- **移动优先**：全站 390px 逐屏体检（回声拖行连走、墨工具栏分组滚动+小屏自动极速、flex 溢出安全居中、iOS webkit 前缀与主屏全屏、OG 链接预览）
- **自验证**：`tools/` 验证链 + 各站 `#lab` 数值实验室（详见「开发」）
- **无障碍**：全站 `prefers-reduced-motion` / `color-scheme`
- **各自的视觉个性**：五站五种美学，门户统一串联并展示跨站统计

## 目录结构

```
toy/
├── index.html                  # 序 · GALLERY 门户（含跨站统计/上次到访/彩蛋提示）
├── ink/index.html              # 墨 · 水墨流体画室
├── echo/index.html             # 回声 · 回声定位迷宫
├── echo/level-gen.js           # 回声 · 关卡生成器（页面与验证器同源直读）
├── scape/index.html            # 造境 · 程序化声景
├── letters/index.html          # 纸间 · 互动书信（引擎）
├── letters/story-data.js       # 纸间 · 六个内置故事（含 AI schema）
├── fold/index.html             # 褶皱 · 分形星球
├── 404.html                    # 404 页（2 秒回门户）
├── tools/smoke-test.sh         # 冒烟测试（九状态渲染存活 + JS 错误检查）
├── tools/hash-test.sh          # 32 状态 hash 直达回归（lab 正向断言 LAB PASS）
├── tools/check-parity.sh       # 五站公约数检查（六站公共件齐备性）
├── tools/validate-levels.mjs   # 回声关卡验证器（直读 level-gen.js）
├── tools/validate-stories.mjs  # 纸间故事图验证器
├── tools/gen-wells.mjs         # 名井关卡码生成器
└── docs/                       # DESIGN 设计 / UNIVERSE 宇宙年表 / DEVICE-CHECK 真机 / POST-DRAFTS 发帖
```

## 快捷键速查

- **墨**：`1-4` 笔刷 · `[ ]` 笔宽 · `Z` 撤销 · `C` 墨色（**长按色点自定**） · `E` 极速 · `W` 洗纸 · `S` 保存
- **回声**：方向键/WASD 移动 · 空格/点击发声呐 · **长按**蓄力 · **双击/Shift+点**定向锥（前方 1.6× 更远、侧后盲区） · 壁龛藏身可**屏息** · `#lv0`~`#lvN`（N≥12 无尽）· `#edit[=码]` 造井 · `#dbg=daily` 每日
- **造境**：`1-9` 预设 · `0` 每日气象 · `T` 主题（七主题循环） · `M` 心境 · `F` 时光流转 · `R` 录制 · `←→` 时刻 · `#w=<base64>` 直达场景
- **纸间**：点击拆信 · 选择回信推进 · 点击信纸跳过渐显 · `Esc` 关弹层 · `#p=<id>` 直达信箱 · `#p=<id>&n=<节点>` 直达信
- **褶皱**：`+/-` 缩放 · 方向键平移 · `J` 四模式 · `P` 调色板 · `S` 寄明信片 · `G` 构图网格 · `H/?` 帮助 · `#x=,y=,s=&dx=,dy=` 坐标直达（含双单低位）· `#grid=1` 网格

## 给纸间写一个故事（AI 玩法）

打开纸间 →「让 AI 写一个」→ 选题材/信数/结局数/笔调/通信关系 → 复制提示词发给任意 AI → 把生成的 JSON 粘回「导入故事」（自动校验，容错剥离 ```json 包裹）。
也可以「✎ 手写故事」可视化编辑，或「改编当前故事」在底稿上重写。游戏内「分享此故事」可导出 JSON 或直达链接。schema 见 `letters/story-data.js`（四个完整示例，含隐藏结局与明信片/做旧参数）。

## 开发

- 冒烟测试：`bash tools/smoke-test.sh`（九状态：页面必须真实渲染 + 无 JS 错误；浏览器自动发现 Chrome/Edge，也可 `BROWSER_BIN=` 指定）
- hash 回归：`bash tools/hash-test.sh`（32 状态；五个 `#lab` 实验室做**正向断言**——必须看到 `LAB PASS`，FAIL/ERR/没跑到都算失败）
- 数值实验室：`ink#lab`（湿度写入/蒸发/真颜料占比/混色离带/readback）· `fold#lab`（微扰四档：内部/外部/1e-10 心形/1e-13 有限性）· `echo#lab`（玩法端到端：三型分魂/锁门/取钥/通关）· `scape#lab`（主题像素断言）· `letters#lab`（隐藏结局正反例）——实验室已抓获两个静默 bug（墨湿度被包装丢弃、游魂少生成）
- 关卡验证：`node tools/validate-levels.mjs`（直读 `echo/level-gen.js`，12 内置关 + 40 样本随机压力）
- 故事验证：`node tools/validate-stories.mjs`（引用完整性 + 图可达性 + 隐藏结局）
- 名井生成：`node tools/gen-wells.mjs`（与游戏内 v3 生成器同源）
- 公约数检查：`bash tools/check-parity.sh`（六站的错误钩子/语言直达/无障碍基线等公共件齐备性）
- CI：GitHub Actions 两条 job——node 验证器 + 语法 + 公约数；无头 Chrome 全量冒烟 + hash 回归
- 发帖物料：真浏览器打开 `ink/index.html#capture` / `scape/index.html#capture` 自录演示视频
- 设计文档：`docs/DESIGN.md` · 发帖文案：`docs/POST-DRAFTS.md` · 真机清单：`docs/DEVICE-CHECK.md` · 共享宇宙年表：`docs/UNIVERSE.md`

## 迭代史（节选）

- **1.0** 五站创作 + 门户
- **2.0–6.0** 深度打磨轮：笔刷/墨色/纸质/撤销 · 成就墙/每日/无尽 · 声道扩展 · 信堆图鉴 · Julia/燃烧之舰
- **7–15** 造井编辑器 · 名井集 · 长卷导出 · 山/海/城三主题 · 移动端适配
- **16+ 反馈轮** INK 细笔宽/纸面检视/印面上传 · ECHO 九层主线与游魂 AI · LETTERS 故事包/AI/编辑器雏形
- **R 系列 自动迭代** 闪电先于雷声 · 飞白干笔 · 逐句显影 · 深度地名 · 页面隐藏零消耗
- **v5 重建** SCAPE/LETTERS 交互层从零重写（约 300 行基座），修复静默 JS 错误导致的整站失效
- **v6** 造境：十声道补全（夜虫/雷/鸟鸣/远钟音频+视觉）、日月轨道修复、萤火/飞鸟/闪电/流星/极光/彩虹、时光流转、#w= 分享、录制、睡眠定时；纸间：五按钮全实现（信堆/分享/导入/AI/手写编辑器）、隐藏结局引擎、逐故事字体与做旧、WebAudio 纸声
- **v6.1** 纸间第四信箱《停钟巷》（第二隐藏结局）· 修复守灯人六级孤儿信链（图验证器首跑即捕获）· 验证链固化（dump-dom 认知修正 / 故事验证器 / 关卡验证器重写 / 冒烟全绿）
- **v6.2 移动优先轮** 回声十二层主线（守灯人日记合流纸间宇宙）· 墨极速模式（bench -31%）· 全站 390px 体检修复（flex 溢出/工具栏分组/拖行连走/HUD 可读性）· 造境渐变精灵化与录制 mp4 回退 · iOS 前缀与主屏全屏 · OG 预览
- **v7 玩法深化轮** 回声：游魂三型分魂（趋声/游荡/守灯）+ 钥匙与天光之门 + 蓄力声呐 + 壁龛屏息 + 第七结构「回环」+ 名井八口 + 13 成就；纸间：第五信箱《观星台》（27 年彗星之约）与第六信箱《拾遗号》（守灯人隐藏结局的正文）；墨：湿边积墨（dye 湿度通道）+ 提按笔锋 + 枯笔丝缕 + 悬停滴墨 + LUT 自定八色；造境：第七主题 🌿雨林（树冠/光柱/垂藤/林雾）+ 多利亚音阶 + 林夜听蛙预设；门户：FOLD 德罗斯特徽记 + 彩蛋提示系统
- **v7.1 工具链加固轮** 验证链自身的一次体检：修复 #lab 失败对回归脚本不可见（LAB FAIL 格式与捕获正则不匹配）· 修复浏览器静默空 dump 导致的"全绿空转"（渲染存活断言 + Chrome 优先 + 自动发现）· 回声关卡生成器外置 level-gen.js（验证器直读，弃花括号抽取）· 五站公约数检查脚本 · 浏览器回归进 CI

---

2026 · 以代码作墨，以浏览器为纸 · code as ink, browser as paper
