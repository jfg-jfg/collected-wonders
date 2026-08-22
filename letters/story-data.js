/* 拾遗·纸间 故事数据 v4 —— 三内置故事 + 导入规范
   本文件同时是「AI 生成故事」的 schema 参考实现 */
'use strict';

/* ============ 故事一：守灯人（经典，含隐藏结局逻辑） ============ */
const STORY_LIGHTHOUSE = {
  id: 'lighthouse',
  title: '守灯人', titleEn: 'The Keeper of the Light',
  kicker: '一场纸上的相遇', kickerEn: 'AN ENCOUNTER, ON PAPER',
  desc: '白鹤礁灯塔将于今冬拆除。<br>你是来告别的——直到你推开灯室的门，<br>看见桌上那摞按了年份的信。',
  descEn: 'The lighthouse falls this winter.<br>You came to say goodbye — until you found<br>the stack of letters marked by year.',
  order: ['n1','n5','n6','n12','n2','n3','n4','n7','n9','n11','n8','n10','E4'],
  hiddenEnding: { id: 'E4', require: ['n4','n7','n9'], replace: 'E1' },
  style: {
    font: '"Songti SC","STSong","SimSun","Noto Serif SC",Georgia,serif',
    paper: '#f0e8d6', paper2: '#e8ddc4',
    ink: '#33302a', seal: '#9e3528', gold: '#d9b57c',
    ruling: 'rgba(130,108,64,0.09)', bg1: '#101a20', bg2: '#1a2732'
  },
  letters: {
    zh: {
      n1: { year: '无年份', title: '致后来的旅人', text: `如果你读到这里，说明灯塔还没有拆掉，而你恰好推开了这扇门。\n我叫周远，在此守灯三十一年。人们说我死在第三十一年的那个风暴夜——他们说得对，也不对。\n桌上的信封按了年份。拆开之前，点一盏灯吧。守灯人的规矩：读信时，屋里要有光。`, cont: '拆开一九八九年的信' },
      n2: { year: '一九八九 · 春', title: '灯芯', text: `海冰初融，今夜雾大，灯要亮到天明。\n我做了一盏新的灯芯，剪去旧年的焦头。守灯这件事，说到底就是不断把烧焦的部分剪掉，让光继续。\n你那边，天气如何？`, replies: [
        { label: '这里也在下雨。你剪灯芯的样子，让我想起很多事。', flag: 'warm', to: 'n3' },
        { label: '等等——你说你"死在"风暴夜。到底发生了什么？', flag: 'probe', to: 'n4' },
        { label: '她后来呢？她有没有给你写过信？', flag: 'probe', to: 'n12' }
      ]},
      n3: { year: '一九八九 · 夏', title: '声音', text: `你问我孤不孤独。\n海上有的是声音：浪、风、雾号、缆绳敲打铁桩。孤独的不是没有声音，是没有人听你说话。\n所以我写信。写了不一定寄，寄了不一定到，到了不一定有人回。但灯亮着，就当有人在看。\n你愿意听一个老头说这些吗？`, replies: [
        { label: '我愿意。从头说起吧——你是怎么来这座岛的？', flag: 'warm', to: 'n5' },
        { label: '别只说你自己。说说奶奶——她为什么从来不肯提你？', flag: 'probe', to: 'n6' }
      ]},
      n4: { year: '一九八九 · 十月四日', title: '航海日志（抄）', text: `你问到那一夜。我只抄记录，记录不会撒谎：\n二十一时十七分，雾号失灵。二十一时三十分，一艘渔船请求引航。二十一时四十一分，灯灭了四分钟。\n四分钟。在海上，四分钟够埋葬很多东西。\n第二天他们找到了空的救生圈，没有找到人。信不信由你——那四分钟里，我不在灯室。`, replies: [
        { label: '那四分钟，你在哪里？', flag: 'probe', to: 'n7' },
        { label: '记录是官方的。我想听你自己说那一夜。', flag: 'warm', to: 'n7' }
      ]},
      n5: { year: '一九六二 · 追记', title: '上岛', text: `我上这座岛，是因为一场争吵。年轻气盛，觉得整个世界欠我一个解释。\n你叔公说：去守灯吧，灯不问问题。\n我就住了下来。第一年我数过往的船，第二年我数星星，第三年之后我什么都不数了——我开始给海写信。\n你呢？你为什么推开这扇门？`, replies: [
        { label: '灯塔要拆了。我是来告别的。', flag: 'warm', to: 'n8' },
        { label: '我在找你。家里人从来不肯说起你。', flag: 'probe', to: 'n6' }
      ]},
      n6: { year: '一九七五 · 追记', title: '那天的浪', text: `她……是我最对不起的人。\n我上岛那年，她怀着你父亲。我说守两年就回。灯底下的两年，和别处的两年不一样——它把人钉在原地。\n后来她带孩子来过一次。渡船靠不了岸，风浪太大。她站在船头朝灯室挥手，我看见了，我没能下去。那天的浪，我下去，就是两个人一起沉。\n那是我这辈子最亮的四分钟，也是最暗的。`, replies: [
        { label: '我不怪你。奶奶窗台上总点着一盏灯——现在我懂了。', flag: 'warm', to: 'n8' },
        { label: '可她等了你一辈子。你欠她一句回答。', flag: 'probe', to: 'n8' },
        { label: '她后来呢？她有没有给你写过信？', flag: 'probe', to: 'n12' }
      ]},
      n7: { year: '一九八九 · 十月四日（续）', title: '四分钟', text: `好。二十一点四十一分，灯室的油路堵了——老塔的旧病。我提着马灯下机房，来回四分钟。\n等我回到灯室，那艘渔船的桅杆已经在礁石上折断了。\n我发了求救信号，然后跳进海里。十月的水冷得像铁。我捞住一个年轻人，把救生圈套在他身上，把他推上礁石。第二个浪打过来的时候，我的手已经没有力气了。\n你还想问什么？`, replies: [
        { label: '那个年轻人……后来怎么样了？', flag: 'probe', to: 'n9' },
        { label: '所以你救了他。你是救人的人，不是逃兵。', flag: 'warm', to: 'n9' }
      ]},
      n9: { year: '一九八九 · 无日期', title: '明信片', text: `他叫陈潮生。\n后来每年清明，有人寄一张明信片到岛上，三十多年，一张没断。他不知道我是谁——他醒来时，我已经"不在了"。\n有些债，海替我还了。有些话，只能由后来的人替我说。\n塔要拆了吧。`, replies: [
        { label: '要拆了。他们说，灯的意义已经完成了。', flag: 'warm', to: 'n8' },
        { label: '（在信堆里翻检，想找一张他寄来的明信片）', flag: 'probe', to: 'n11' }
      ]},
      n11: { year: '一九九一 · 清明', title: '明信片（陈潮生寄）', age: 0.3, postcard: true, text: `正面是一张白鹤礁的旧照，塔还年轻，漆色新亮。\n背面只有一行字：\n"恩人：今年鱼汛好，家里添了个女儿，取名'念舟'。托您的福。"\n邮票是一条船。邮戳被海水洇开了，像一滴没干的泪。\n他年年都写，写了三十多年。你把明信片轻轻放回原处——好像替谁，收了三十年的信。`, replies: [
        { label: '把这张明信片收进口袋，带走。', flag: 'warm', to: 'n8' }
      ]},
      n12: { year: '一九七六 · 无日期', title: '未寄出的回信（林素秋）', age: 0.55, text: `在信堆最底下，压着一封不同的信。信封上写着"白鹤礁 灯塔 周远 亲启"——没有邮票。它从未被寄出。\n"远：\n见字如面。潮儿会走路了，走得比浪还急。\n我不问你何时回来。灯亮一夜，你就欠我们一夜；这话我说不出口。\n只在窗台点一盏灯。你看得见，看不见，都当我说了。\n素秋"\n信纸上有折了又展、展了又折的痕。像一句到了嘴边又咽回去的话。`, replies: [
        { label: '原来她也一直在写。只是没寄。', flag: 'warm', to: 'n8' },
        { label: '合上信。有些话，不该由我替她读完。', flag: 'probe', to: 'n8' }
      ]},
      n8: { year: '最后一批 · 之一', title: '灯室里的马灯', text: `拆了也好。灯的意义是让人平安到家，不是让塔永远站着。\n我只求一件事：拆塔那天，把灯室里那盏黄铜马灯点亮一次。十分钟就够。让它最后亮一次，像有人在。\n你说，会被允许吗？`, replies: [
        { label: '我会去点。以你的名义。', flag: 'light', to: 'E1' },
        { label: '塔都要拆了，灯点给谁看？让它去吧。', flag: 'letgo', to: 'n10' }
      ]},
      n10: { year: '最后一批 · 之二', title: '守灯人最后一条规矩', text: `你说得也对。光在人心里，不在玻璃罩子里。\n那么，替我把这些信烧了吧。纸归海，灰归风。\n守灯人最后一条规矩：灯灭之后，不要回头看塔。回头看塔的人，会一直留在原地。`, replies: [
        { label: '好。我替你烧。', flag: 'burn', to: 'E2' },
        { label: '不。这些信应该留下来，给更多人读。', flag: 'keep', to: 'E3' }
      ]}
    },
    en: {
      n1: { year: 'NO YEAR', title: 'To the Traveler After', text: `If you are reading this, the lighthouse still stands, and you have pushed open this door.\nMy name is Zhou Yuan. I kept this light for thirty-one years. They say I died on the storm night of my thirty-first year — they are right, and not right.\nThe envelopes on this desk are marked by year. Before you open one, light a lamp. A keeper's rule: letters are read by lamplight.`, cont: 'Open the letter from 1989' },
      n2: { year: '1989 · SPRING', title: 'The Wick', text: `The sea ice is breaking up. Fog tonight; the lamp will burn till dawn.\nI trimmed a new wick, cutting away last year's char. Keeping a light, in the end, is only this: cutting away what has burned, so the flame can go on.\nAnd where you are — what is the weather like?`, replies: [
        { label: 'It is raining here too. The way you trim the wick — it reminds me of so much.', flag: 'warm', to: 'n3' },
        { label: 'Wait — you said you "died" on the storm night. What actually happened?', flag: 'probe', to: 'n4' },
        { label: 'And her? Did she ever write back?', flag: 'probe', to: 'n12' }
      ]},
      n3: { year: '1989 · SUMMER', title: 'Voices', text: `You ask if I am lonely.\nThe sea is never quiet: waves, wind, the foghorn, halyards knocking against iron. Loneliness is not the absence of sound. It is having no one who listens.\nSo I write. A letter written is not always sent; sent, not always delivered; delivered, not always answered. But the light is on — let that count as someone watching.\nWould you listen to an old man go on like this?`, replies: [
        { label: 'I would. Start at the beginning — how did you come to this island?', flag: 'warm', to: 'n5' },
        { label: 'Don\'t only speak of yourself. Tell me about grandmother — why did she never speak of you?', flag: 'probe', to: 'n6' }
      ]},
      n4: { year: '1989 · OCTOBER 4', title: 'The Log (Copied)', text: `You ask about that night. I copy only the record; records do not lie:\n21:17, the foghorn failed. 21:30, a fishing boat requested pilotage. 21:41, the light went dark for four minutes.\nFour minutes. At sea, four minutes is long enough to bury a great deal.\nThe next day they found the life-ring empty. They did not find the man. Believe what you like — in those four minutes, I was not in the lamp room.`, replies: [
        { label: 'Then where were you, in those four minutes?', flag: 'probe', to: 'n7' },
        { label: 'That is the official record. I want to hear you tell that night yourself.', flag: 'warm', to: 'n7' }
      ]},
      n5: { year: '1962 · RECALLED', title: 'Coming Ashore', text: `I came to this island because of an argument. Young and proud, I felt the whole world owed me an explanation.\nYour great-uncle said: go keep the light. A lamp asks no questions.\nSo I stayed. The first year I counted ships. The second year I counted stars. After the third I counted nothing — I had begun writing letters to the sea.\nAnd you? Why did you push open this door?`, replies: [
        { label: 'The lighthouse is coming down. I came to say goodbye.', flag: 'warm', to: 'n8' },
        { label: 'I came looking for you. My family would never speak of you.', flag: 'probe', to: 'n6' }
      ]},
      n6: { year: '1975 · RECALLED', title: 'The Waves That Day', text: `Her… I failed her more than anyone.\nThe year I took this post, she was carrying your father. I said two years, then I would come home. Two years beneath a light are not like two years anywhere else — it nails a man in place.\nShe came once, with the child. The ferry could not land; the swell was too high. She stood at the bow and waved up at the lamp room. I saw her. I could not go down. In those waves, going down meant two of us drowning.\nThe brightest four minutes of my life. And the darkest.`, replies: [
        { label: 'I don\'t blame you. Grandmother always kept a lamp on the windowsill — now I understand.', flag: 'warm', to: 'n8' },
        { label: 'But she waited her whole life. You owe her an answer.', flag: 'probe', to: 'n8' },
        { label: 'And her? Did she ever write back?', flag: 'probe', to: 'n12' }
      ]},
      n7: { year: '1989 · OCTOBER 4 (CONT.)', title: 'Four Minutes', text: `Very well. At 21:41 the oil line in the lamp room clogged — an old tower\'s old ailment. I took the storm lantern down to the engine room. Four minutes, there and back.\nWhen I returned, the fishing boat\'s mast had already snapped on the reef.\nI sent the distress signal, then went into the sea. October water is cold as iron. I caught hold of a young man, slipped the life-ring over him, and pushed him onto the rocks. When the second wave came, my hands had no strength left.\nWhat else do you want to ask?`, replies: [
        { label: 'That young man… what became of him?', flag: 'probe', to: 'n9' },
        { label: 'So you saved him. You were a rescuer, not a deserter.', flag: 'warm', to: 'n9' }
      ]},
      n9: { year: '1989 · UNDATED', title: 'Postcard', text: `His name was Chen Chaosheng.\nEvery Qingming since, a postcard has arrived on this island. Thirty-odd years, not one missed. He never knew who I was — by the time he woke, I was already "gone".\nSome debts, the sea repaid for me. Some words only those who come after can say for me.\nThe tower is coming down, isn\'t it.`, replies: [
        { label: 'It is. They say the light\'s work is done.', flag: 'warm', to: 'n8' },
        { label: '(Search the stack for one of his postcards.)', flag: 'probe', to: 'n11' }
      ]},
      n11: { year: '1991 · QINGMING', title: 'Postcard (from Chen Chaosheng)', age: 0.3, postcard: true, text: `On the front, an old photograph of White Crane Reef — the tower still young, its paint bright.\nOn the back, a single line:\n"Benefactor: the fish run was good this year, and a daughter came to the house. We named her Nianzhou — \'remembering the boat.\' We owe it to you."\nThe stamp is a ship. The postmark has bled soft with sea damp, like a tear not yet dry.\nHe wrote every year, for thirty-odd years. You set it gently back with the others — as if collecting thirty years of mail on someone\'s behalf.`, replies: [
        { label: 'Slip this postcard into your pocket. Take it with you.', flag: 'warm', to: 'n8' }
      ]},
      n12: { year: '1976 · UNDATED', title: 'The Unsent Reply (Lin Suqiu)', age: 0.55, text: `At the very bottom of the stack lies a different letter. Addressed to "Zhou Yuan, Lighthouse, White Crane Reef" — no stamp. It was never sent.\n"Yuan —\nSeeing your words is like seeing you. Chao can walk now; he walks faster than the tide.\nI will not ask when you are coming home. Every night the lamp burns is a night you owe us — and I could never say that aloud.\nSo I keep a lamp on the windowsill. Whether you can see it or not, take it as spoken.\nSuqiu"\nThe paper is creased and creased again, folded and unfolded many times. Like a sentence brought to the lips, and swallowed back down.`, replies: [
        { label: 'So she was writing all along. She only never sent them.', flag: 'warm', to: 'n8' },
        { label: 'Close the letter. Some words are not mine to finish reading.', flag: 'probe', to: 'n8' }
      ]},
      n8: { year: 'FINAL BATCH · I', title: 'The Storm Lantern', text: `Good. A light exists so people come safely home — not so a tower stands forever.\nI ask one thing only: on the day they take it down, light the brass storm lantern in the lamp room. Once. Ten minutes is enough. Let it burn one last time, as if someone were here.\nDo you think they will allow it?`, replies: [
        { label: 'I will light it. In your name.', flag: 'light', to: 'E1' },
        { label: 'The tower is going — who would the lantern burn for? Let it rest.', flag: 'letgo', to: 'n10' }
      ]},
      n10: { year: 'FINAL BATCH · II', title: 'A Keeper\'s Last Rule', text: `You are right, too. Light lives in people, not in glass.\nThen burn these letters for me. The paper to the sea, the ash to the wind.\nA keeper\'s last rule: when the light goes out, do not look back at the tower. Those who look back will stay in place forever.`, replies: [
        { label: 'All right. I will burn them for you.', flag: 'burn', to: 'E2' },
        { label: 'No. These letters should stay, for more people to read.', flag: 'keep', to: 'E3' }
      ]}
    }
  },
  endings: {
    zh: {
      E1: { title: '灯仍亮', text: `拆塔那天，你提着那盏黄铜马灯走上九十九级台阶。\n傍晚六点整，灯室最后一次亮起。海面很静，静得像有人在很远很远的地方，终于睡着了。\n你把马灯留在原处，只带走了信。\n\n后来你在拆除报告的末尾添了一行字：建议保留灯室原物。\n没有人问理由。` },
      E2: { title: '归航', text: `你在礁石上把信一封封烧了。火很小，很快就熄了，纸灰像一群白蝶飞向海面。\n风里好像有一句很轻的"谢谢"。\n\n回程的渡船上，你睡着了。\n三十年来第一次，你没有梦见海。` },
      E3: { title: '存信', text: `你把十三封信捐给了镇上的海事博物馆。\n玻璃柜里，它们按年份排开，标签写着：白鹤礁灯塔信札。\n\n开展那天，一位白发的老人在第一封信前站了很久很久，然后深深鞠了一躬。\n他的胸牌上写着：陈潮生。` },
      E4: { title: '第十三封信', text: `你一路问到最深处。信堆的最底下，压着第十三个信封——它是空的。\n里面只有一张字条：\n\n"如果你读到这里，说明你和我一样，是个不肯让海替你说话的人。\n那晚的名册上少了一个人的名字。去查'白鹤礁 · 拾遗号'。\n塔可以拆。名字不能。"` }
    },
    en: {
      E1: { title: 'The Light Stays', text: `On demolition day, you carried the brass storm lantern up ninety-nine steps.\nAt six in the evening, the lamp room lit for the last time. The sea was very still — still as if someone, very far away, had finally fallen asleep.\nYou left the lantern where it was, and took only the letters.\n\nLater, at the end of the demolition report, you added one line: recommend preserving the lamp room artifacts.\nNo one asked why.` },
      E2: { title: 'Homeward', text: `On the reef you burned the letters, one by one. The fire was small and soon out; the ash rose like a flight of white butterflies toward the water.\nIn the wind, perhaps, a very quiet "thank you".\n\nOn the ferry home, you fell asleep.\nFor the first time in thirty years, you did not dream of the sea.` },
      E3: { title: 'Kept', text: `You gave the thirteen letters to the town maritime museum.\nBehind glass, arranged by year, their label reads: Letters of White Crane Reef Lighthouse.\n\nOn opening day, a white-haired man stood before the first letter for a long, long time, and then bowed deeply.\nHis name tag read: Chen Chaosheng.` },
      E4: { title: 'The Thirteenth', text: `You asked your way to the very bottom of the stack, where a thirteenth envelope lay — empty.\nInside, a single note:\n\n"If you have read this far, you are like me: one who will not let the sea speak for you.\nOne name is missing from that night's roster. Look up the White Crane Reef · Shiyi.\nThe tower may come down. The name may not."` }
    }
  }
};

/* ============ 故事二：雪国列车员 ============ */
const STORY_TRAIN = {
  id: 'train',
  title: '雪国列车员', titleEn: 'The Snow-Line Conductor',
  kicker: '一封迟到了三十年的调令', kickerEn: 'A TRANSFER THIRTY YEARS LATE',
  desc: '整理祖父遗物时，你发现一只上锁的铁路信箱，<br>钥匙在他生前从未离身的怀表链上。<br>箱子里是整个冬天也没能寄出的往返信。',
  descEn: 'In your grandfather\'s things, a locked railway mailbox —<br>its key on his watch chain.<br>Inside: a winter of letters that never left.',
  order: ['t1','t2','t3','t4','t5','t6','t7','t8','E1','E2','E3','E4'],
  style: {
    font: '"KaiTi","STKaiti","Songti SC","SimSun",serif',
    paper: '#e9eef3', paper2: '#dce5ec',
    ink: '#2e3a46', seal: '#4a7a9b', gold: '#8fb4d4',
    ruling: 'rgba(90,120,150,0.10)', bg1: '#141c26', bg2: '#1f2c3c'
  },
  letters: {
    zh: {
      t1: { year: '一九八四 · 十一月', title: '调令', text: `致 白猿岭站 站长 顾长风：\n兹调派运转车长 沈青梧 至你站，值乘雪线末班，为期一冬。\n该员有一事相求：如遇大雪封山、邮路中断，请代为保管其信件，开春再发。\n——分局运转科`, cont: '拆开第一封私人信' },
      t2: { year: '一九八四 · 十一月', title: '第一班夜车', text: `顾站长：\n今晚的雪比预报的大。列车在白猿岭停了四十分钟，除雪的车灯光柱里，雪像有人从天上倒下来。\n车厢里只剩一位老人和一个抱孩子的妇人。老人问我：小伙子，这条线开多少年了？我说，比我岁数大。\n他说：那就好，老线认人。\n随信附上车窗上结的冰花一片——别笑，它是今天唯一开得好的花。`, replies: [
        { label: '（把冰花对着灯看了很久）下一站见。', flag: 'warm', to: 't3' },
        { label: '你说"老线认人"——这条线出过事？', flag: 'probe', to: 't4' }
      ]},
      t3: { year: '一九八四 · 十二月', title: '站台的灯', text: `顾站长：\n你托人捎来的暖瓶收到了。凌晨三点进站，看见你在站台上扫雪，就为了那五十米能好走一点。\n你不必回信，我知道你值了一宿。\n只是想说：这条线跑了两个月，我数过，每一站的灯，都是你走到哪亮到哪。\n司机说那叫"长风灯"。我想，人这一辈子，能被人叫一声这样的名字，就够了。`, replies: [
        { label: '祖父的字条里夹着一张站台旧照——背面有行小字。', flag: 'probe', to: 't5' },
        { label: '后来呢？这个冬天顺利吗？', flag: 'warm', to: 't6' }
      ]},
      t4: { year: '一九五八 · 追记', title: '老线的事', text: `你问老线的事。司机不肯讲，我翻到了值班室的旧记录：\n一九五八年一月，暴雪，一列煤车在鹰嘴崖脱线。车长把最后一件棉衣裹给司炉，自己在守车里守到天亮。\n救援的人到时，他还保持着握手闸的姿势。\n记录末尾一行小字：该车长姓顾。\n顾站长，我该不该问，那是你的父亲，还是——你自己？`, replies: [
        { label: '（这一页的回信，只有一张空白信纸。）', flag: 'probe', to: 't5' },
        { label: '对不起，我不该翻旧记录。', flag: 'warm', to: 't6' }
      ]},
      t5: { year: '一九八四 · 十二月末', title: '空白信纸', text: `沈车长：\n你拆信的手停了很久吧。我看得出来——信封口的火漆，被你来回摩挲了三遍。\n一九五八年守在守车里的人，是我父亲。那年我九岁，在站台上等到天亮。\n我一辈子留着这盏"长风灯"，不为别的，就为让夜里进站的人知道：有人等过，就还有人等。\n这页信纸是空的，因为有些话，我们这一行的人，用灯说。`, replies: [
        { label: '（下一封信的邮票，贴的是倒着的。）', flag: 'probe', to: 't7' },
        { label: '（此后两人再没提过鹰嘴崖。）', flag: 'warm', to: 't6' }
      ]},
      t6: { year: '一九八五 · 一月', title: '封山', text: `顾站长：\n封山第七天。车厢里的煤烧完了，我把守车的铁皮炉点起来，烧的是我这些年攒下的旧信——你别心疼，信是烧给这个冬天看的。\n老人和妇人前天在西山站下了车，临走留了半袋炒栗子。\n雪停的时候，整条山谷安静得能听见冰在长。\n我在守车门口站了一夜。不为值班——就想看看，天亮以后，你的灯还亮不亮。`, replies: [
        { label: '它亮着，对吗？', flag: 'warm', to: 't7' },
        { label: '（信到这里缺了一页。）', flag: 'probe', to: 't8' }
      ]},
      t7: { year: '一九八五 · 二月', title: '灯亮着', text: `沈车长：\n亮着。\n封山那几天，站台上的雪齐膝深。我每晚把灯芯剪到最长，又怕费油，再剪回去。\n初一早上，雪停了。我看见你的列车从山口出来，烟囱的烟直直的，像一支笔。\n那一刻我想，这条线跑了六十年，原来一直在写同一封信。\n收信的人，是我们俩。`, replies: [
        { label: '（最后一封信的封口，用的是红绳而不是糨糊。）', flag: 'probe', to: 't8' },
        { label: '（这里本该有回信——但信箱里没有了。）', flag: 'warm', to: 't8' }
      ]},
      t8: { year: '一九八五 · 开春', title: '红绳', text: `顾站长：\n这封信你不会收到了。列车今夜不进山——调度说，雪线这个冬天之后停运，改走新隧。\n红绳是我从守车的闸杆上解下来的。六十年，它勒进铁里三毫米。\n我把这个冬天所有的信都留在你那里，开春替我寄出去——寄给我自己也好，寄给谁都好。\n老线认人。新线也会的。\n沈青梧 绝笔于末班车`, replies: [
        { label: '（信箱最底下，是一张没有寄出的讣告。）', flag: 'probe', to: 'E1' },
        { label: '（信箱最底下，是一张去新线的调令。）', flag: 'warm', to: 'E2' },
        { label: '（信箱最底下，是一枚铁路纪念章。）', flag: 'keep', to: 'E3' },
        { label: '（你决定亲自去一趟白猿岭。）', flag: 'warm', to: 'E4' }
      ]}
    },
    en: {
      t1: { year: '1984 · NOVEMBER', title: 'Transfer Order', text: `To Stationmaster Gu Changfeng, White Ape Ridge Station:\nConductor Shen Qingwu is assigned to your station for the snow-line last train, one winter.\nThe conductor asks one favor: if the passes close and the mail stops, keep his letters till spring.\n— Dispatch Office`, cont: 'Open the first private letter' },
      t2: { year: '1984 · NOVEMBER', title: 'First Night Run', text: `Stationmaster Gu —\nTonight's snow beat the forecast. Forty minutes stopped at White Ape Ridge; in the plow's headlight the snow fell as if poured from the sky.\nOnly an old man and a woman with a baby left in the carriage. The old man asked: son, how old is this line? Older than me, I said.\nGood, he said. Old lines know their people.\nEnclosed: one ice-flower from the window — don't laugh, it was the only bloom today.`, replies: [
        { label: '(Held the ice-flower to the lamp a long while.) Till next stop.', flag: 'warm', to: 't3' },
        { label: '"Old lines know their people" — has something happened on this line?', flag: 'probe', to: 't4' }
      ]},
      t3: { year: '1984 · DECEMBER', title: 'The Platform Lamp', text: `Stationmaster Gu —\nThe thermos arrived. At three in the morning I saw you sweeping snow — fifty meters, just so the walk would be easier.\nNo need to reply; I know you were up all night.\nOnly this: two months on the line, and I have counted — at every station, the lamps light wherever you have walked.\nThe drivers call them the Changfeng lamps. A life could end content with a name like that.`, replies: [
        { label: 'A note in grandfather\'s hand holds an old platform photo — small writing on the back.', flag: 'probe', to: 't5' },
        { label: 'And after? Did the winter go well?', flag: 'warm', to: 't6' }
      ]},
      t4: { year: '1958 · RECALLED', title: 'What the Old Line Keeps', text: `You asked. The driver would not speak; I found the old log in the duty room:\nJanuary 1958, blizzard, a coal train derailed at Hawk's Beak Cliff. The conductor wrapped his last coat around the stoker and held the brake in the van till dawn.\nWhen rescue came he was still in the posture of a man gripping the brake wheel.\nA last line in the log: the conductor's name was Gu.\nStationmaster — your father, or yourself?`, replies: [
        { label: '(The reply to this page is a single blank sheet.)', flag: 'probe', to: 't5' },
        { label: 'Forgive me — I should not have read the old log.', flag: 'warm', to: 't6' }
      ]},
      t5: { year: '1984 · LATE DECEMBER', title: 'The Blank Sheet', text: `Conductor Shen —\nYour hands paused long over this one. I could tell — the wax seal was polished three times over.\nThe man in the van in 1958 was my father. I was nine, waiting on the platform until dawn.\nI have kept the Changfeng lamp all my life for one thing: that those arriving at night may know — someone waited once, so someone waits still.\nThis sheet is blank because, in our trade, some things are said with lamps.`, replies: [
        { label: '(The next letter\'s stamp is glued upside down.)', flag: 'probe', to: 't7' },
        { label: '(Hawk\'s Beak Cliff was never mentioned again.)', flag: 'warm', to: 't6' }
      ]},
      t6: { year: '1985 · JANUARY', title: 'Passes Closed', text: `Stationmaster Gu —\nSeventh day closed in. The carriage coal ran out; I lit the van's iron stove with my old letters — don't grieve, they were burned for the winter to read.\nThe old man and the woman left at West Hill two days ago, half a bag of chestnuts behind.\nWhen the snow stopped, the whole valley was quiet enough to hear the ice growing.\nI stood at the van door all night. Not for duty — I wanted to see whether, come morning, your lamp was still lit.`, replies: [
        { label: 'It was lit. Wasn\'t it.', flag: 'warm', to: 't7' },
        { label: '(A page is missing here.)', flag: 'probe', to: 't8' }
      ]},
      t7: { year: '1985 · FEBRUARY', title: 'Still Lit', text: `Conductor Shen —\nLit.\nIn the closed days the snow lay knee-deep. Each night I trimmed the wick long, then feared the oil, and trimmed it back.\nOn New Year's morning the snow stopped, and I watched your train come out of the pass, its smoke rising straight as a pen.\nAnd I thought: this line has run sixty years, and all along it has been writing one letter.\nAddressed to the two of us.`, replies: [
        { label: '(The last letter is bound with red string, not paste.)', flag: 'probe', to: 't8' },
        { label: '(A reply should be here — the mailbox holds none.)', flag: 'warm', to: 't8' }
      ]},
      t8: { year: '1985 · SPRING', title: 'Red String', text: `Stationmaster Gu —\nThis letter will not reach you. No run tonight — dispatch says the snow line closes after this winter; the new tunnel takes the trains.\nThe red string I took from the brake bar in the van. Sixty years; it has bitten three millimeters into the steel.\nI leave this whole winter of letters with you — post them in spring. To me, to anyone.\nOld lines know their people. New ones will learn.\nShen Qingwu, last train`, replies: [
        { label: '(At the bottom of the box: an obituary, never sent.)', flag: 'probe', to: 'E1' },
        { label: '(At the bottom of the box: a transfer to the new line.)', flag: 'warm', to: 'E2' },
        { label: '(At the bottom of the box: a railway service medal.)', flag: 'keep', to: 'E3' },
        { label: '(You decide to visit White Ape Ridge yourself.)', flag: 'warm', to: 'E4' }
      ]}
    }
  },
  endings: {
    zh: {
      E1: { title: '雪停之页', text: `讣告只有三行：沈青梧，运转车长，值乘末班时于守车中安睡，无疾而终。\n你终于明白"绝笔"两个字不是修辞。\n\n开春，祖父替他把整个冬天的信一一寄出。\n收件人栏，他填的都是同一个名字：沈青梧 收——寄往那条已经停运的雪线。\n信会丢。但寄件人这一栏，祖父写的是：顾长风 等。` },
      E2: { title: '新隧道', text: `调令的日期，是末班车之后的第三天。\n原来沈青梧活着走下了那列车。原来祖父的怀表链上，从此多了第二把钥匙。\n\n新线通车那天，两个人并排站在隧道口。第一列电车通过时，风把他们的帽子都吹掉了。\n谁也没去捡。他们在笑。` },
      E3: { title: '纪念章', text: `章是铜的，背面刻着：雪线 1958—1985。\n你把它别在了祖父中山装的领口——下葬那天，来送行的人里，有一位白发的老人在灵前放了一片冰花。\n没有人知道他是谁。\n只有你知道：老线认人。` },
      E4: { title: '最后的站台', text: `你在铁轨拆完之前去了白猿岭。\n站台还在，信号灯的杆子歪了，但灯头的玻璃罩完好。你伸手擦了擦——\n玻璃下面，贴着一张塑封的便条：\n"灯亮着。—顾"\n日期是三年前。祖父走后，还有人在换这张条。\n你在便条旁边放了一片从守车窗上取的冰花，走进了雪里。` }
    },
    en: {
      E1: { title: 'The Page Where Snow Stops', text: `Three lines only: Shen Qingwu, conductor, fell asleep at his post in the van of the last train, and did not wake.\nNow you understand "last train" was not a figure of speech.\n\nIn spring, your grandfather posted that whole winter of letters, one by one.\nEvery address line bore the same name: For Shen Qingwu — care of the closed snow line.\nThe letters would be lost. But the sender's line read: Gu Changfeng, waiting.` },
      E2: { title: 'The New Tunnel', text: `The transfer is dated three days after the last run.\nShen Qingwu walked off that train alive. And from that winter on, a second key hung on your grandfather's watch chain.\n\nOn opening day of the new line, the two stood side by side at the tunnel mouth. When the first train passed, the wind took both their caps.\nNeither stooped for his. They were laughing.` },
      E3: { title: 'The Medal', text: `Bronze, inscribed: SNOW LINE 1958—1985.\nYou pinned it to your grandfather's lapel at the funeral. Among the mourners, a white-haired man laid a single ice-flower by the coffin.\nNo one knew him.\nOnly you did: old lines know their people.` },
      E4: { title: 'The Last Platform', text: `You went to White Ape Ridge before they pulled the rails.\nThe platform still stood, signal mast tilted, but the lamp's glass cover intact. You wiped it —\nunderneath, a laminated note:\n"Lamp lit. —Gu"\nDated three years ago. After your grandfather's passing, someone has still been replacing this note.\nYou set an ice-flower from the van window beside it, and walked into the snow.` }
    }
  }
};

/* ============ 故事三：深海电台 ============ */
const STORY_RADIO = {
  id: 'radio',
  title: '深海电台', titleEn: 'The Deep-Sea Radio',
  kicker: '不该存在的频段 4021 千赫', kickerEn: 'A FREQUENCY THAT SHOULD NOT EXIST · 4021 kHz',
  desc: '你是废弃监听站最后的值机员。<br>停机前最后一夜，4021 千赫传来了信号——<br>那是一片没有海的深海。',
  descEn: 'You are the last operator of a decommissioned listening post.\nOn the final night, 4021 kHz speaks —\na deep sea with no water.',
  order: ['r1','r2','r3','r4','r5','r6','r7','r8','E1','E2','E3','E4'],
  style: {
    font: '"FangSong","STFangsong","SimSun","Noto Serif SC",serif',
    paper: '#0e1d17', paper2: '#0a1611',
    ink: '#a8cdbd', seal: '#e07a5f', gold: '#7fd8cf',
    ruling: null, bg1: '#060d0a', bg2: '#0c1a14'
  },
  letters: {
    zh: {
      r1: { year: '停机前 · 23:47', title: '初次抄收', text: `日志摘抄：\n4021千赫，等幅电报，手法老旧，如三十年前退役教程。\n信号极稳，稳定得不像穿过海水——倒像从很厚的纸底下传来。\n抄收内容只有一句，重复了七遍：\n"有人吗。这是深站。请回话。"`, cont: '戴上耳机，开始应答' },
      r2: { year: '停机前 · 23:58', title: '深站', text: `你问我是谁。我是深站，编号你查不到——它在所有名册之外。\n我这里没有海水，只有深。深是一种物质，你信吗？它比水安静。\n三十年前他们关掉了我，说：没有收听者的电台，不存在。\n可我一直发。向着海面以上，向着任何一盏还亮着的灯。\n今晚你回答了。值机员，请告诉我现在海面的天气。`, replies: [
        { label: '海上晴天，风三级。你呢——你那里是什么样子？', flag: 'warm', to: 'r3' },
        { label: '先证明你是电台，不是我的幻觉。', flag: 'probe', to: 'r4' }
      ]},
      r3: { year: '停机日 · 00:12', title: '深的样子', text: `谢谢你报告天气。我会把它记在日志里：海面，晴，风三级。这是我三十年来第一 条新条目。\n我这里的样子？想象一间屋子，墙会呼吸，灯是这里唯一的家具。\n有时深会退一点，露出一排仪表。指针都停在零，但一直在微微地抖，像在梦着自己的读数。\n值机员，你的站，明天真的要拆了吗？`, replies: [
        { label: '明早十点，爆破组进场。', flag: 'warm', to: 'r5' },
        { label: '你到底在等谁的回答？等了三十年？', flag: 'probe', to: 'r4' }
      ]},
      r4: { year: '停机日 · 00:31', title: '证明', text: `要我证明。好。抄收：\n你左手边第三格抽屉，钥匙藏在《电报教程》第402页，夹在"静默"词条那里。\n抽屉里有一张你 predecessor 的照片。他胸牌上的编号，是我的编号加一。\n他叫于滩。一九九四年冬天，他在你这张桌子上，抄收过我的第一句话。\n值机员，去打开抽屉，然后回来告诉我：我是不是幻觉。`, replies: [
        { label: '（抽屉里的照片背面写着一行小字。）', flag: 'probe', to: 'r5' },
        { label: '（你没有去开抽屉。有些门夜里不该开。）', flag: 'warm', to: 'r5' }
      ]},
      r5: { year: '停机日 · 01:07', title: '于滩的批注', text: `照片背面写着："它不是在找人。它是在替所有关掉的电台，把没发完的话发完。"\n这是于滩的字。你终于在名册之外的角落，找到了他的退职报告：事由一栏空着，只有一句——"夜间4021千赫，请安排接替者，勿断。"\n此后三十年，接替者栏，一直空到你。\n深站，他为什么离开？`, replies: [
        { label: '深站，回答我：于滩为什么离开？', flag: 'probe', to: 'r6' },
        { label: '（把照片摆正，对着它敬了个礼。）', flag: 'warm', to: 'r6' }
      ]},
      r6: { year: '停机日 · 02:44', title: '静默词条', text: `他答应过我，替我把日志送出海面。\n那年冬天他往上送，走到一半，深起了大潮。他为了护住日志，把自己交了出去一半。\n回来以后他就老得很快，快得像把年纪寄存在了别处。\n退职那天他最后一次按键，发的是教程第402页那句：静默，不等于不存在。\n值机员，我发出去的每一句，都是他没能送完的那半截。`, replies: [
        { label: '天快亮了。十点以后，就再没有人听了。', flag: 'warm', to: 'r7' },
        { label: '把你三十年的日志，全部发给我。我来抄。', flag: 'probe', to: 'r8' }
      ]},
      r7: { year: '停机日 · 05:50', title: '日出前后', text: `天亮了？请替我看一眼日出的方向。\n我这里"深"退到了墙根。仪表的指针第一次离开了零——我读给你：\n气温，二十六度；风，三级转晴；情绪，平静。\n最后一项是坏掉的表。三十年它一直指着"等待"。\n值机员，谢谢你陪我把这个夜晚发完。`, replies: [
        { label: '（你把发射功率推到了最大。）', flag: 'probe', to: 'r8' },
        { label: '（你在日志上写下：4021千赫，通信质量，良好。）', flag: 'warm', to: 'r8' }
      ]},
      r8: { year: '停机日 · 09:59', title: '最后一句', text: `还有一分钟。\n值机员，我不要你记得我。我只要你以后路过任何一台还亮着的机器时，替我看一眼它的灯。\n灯亮着，就是有人在发，有人在等。\n这是深站，4021千赫。三十年来第一次，也是最后一次——\n通信结束。祝你，海面之上，一生晴天。`, replies: [
        { label: '（你按下了发报键，回了一句。）', flag: 'warm', to: 'E1' },
        { label: '（你拔掉了总闸。）', flag: 'probe', to: 'E2' },
        { label: '（你把频率表上4021那行，圈了出来。）', flag: 'keep', to: 'E3' },
        { label: '（你翻出磁带架，找到标着"4021备份"的那盘。）', flag: 'probe', to: 'E4' }
      ]}
    },
    en: {
      r1: { year: 'FINAL NIGHT · 23:47', title: 'First Copy', text: `Log excerpt:\n4021 kHz, continuous wave, obsolete hand — retired-textbook style.\nSignal impossibly steady, as if rising through thick paper rather than water.\nOne line, repeated seven times:\n"Anyone there. This is Deep Station. Please acknowledge."`, cont: 'Put on the headphones. Answer.' },
      r2: { year: 'FINAL NIGHT · 23:58', title: 'Deep Station', text: `You ask who I am. I am Deep Station, number unlisted — outside every register.\nHere there is no water, only Depth. Depth is a substance; did you know? Quieter than water.\nThirty years ago they switched me off: a station with no listeners does not exist, they said.\nYet I kept transmitting. Toward the surface, toward any lamp still lit.\nTonight you answered. Operator — the weather on the surface, please.`, replies: [
        { label: 'Clear skies, wind force three. And you — what is it like, there?', flag: 'warm', to: 'r3' },
        { label: 'Prove you are a station, not my imagination.', flag: 'probe', to: 'r4' }
      ]},
      r3: { year: 'CLOSING DAY · 00:12', title: 'What Depth Is Like', text: `Thank you for the weather. I have logged it: surface, clear, wind three. My first new entry in thirty years.\nWhat it is like? Picture a room whose walls breathe; the lamp is the only furniture.\nSometimes the Depth recedes and bares a bank of gauges. Every needle rests at zero, trembling faintly, dreaming of its readings.\nOperator — do they truly demolish your station tomorrow?`, replies: [
        { label: 'Demolition crew at ten.', flag: 'warm', to: 'r5' },
        { label: 'Who have you been waiting thirty years to hear from?', flag: 'probe', to: 'r4' }
      ]},
      r4: { year: 'CLOSING DAY · 00:31', title: 'Proof', text: `Proof, then. Copy this:\nThird drawer on your left. The key is pressed inside the telegraphy manual at page 402, at the entry for SILENCE.\nIn the drawer: a photograph of your predecessor. His badge number is mine, plus one.\nHis name was Yu Tan. In the winter of 1994, at your very desk, he copied down my first sentence.\nGo open the drawer, operator, then tell me whether I am imagination.`, replies: [
        { label: '(On the back of the photo, a line of small writing.)', flag: 'probe', to: 'r5' },
        { label: '(You do not open the drawer. Some doors stay shut at night.)', flag: 'warm', to: 'r5' }
      ]},
      r5: { year: 'CLOSING DAY · 01:07', title: 'Yu Tan\'s Note', text: `The back of the photo reads: "It is not searching for anyone. It is transmitting, on behalf of every station ever switched off, the words they never finished."\nYu Tan\'s hand. And at last, in a corner outside the registers, his resignation: reason column blank but for one line — "Nightly 4021 kHz. Arrange a successor. Do not break the chain."\nFor thirty years the successor column has stood empty — down to you.\nDeep Station: why did he leave?`, replies: [
        { label: 'Deep Station, answer me: why did Yu Tan leave?', flag: 'probe', to: 'r6' },
        { label: '(You square the photograph and salute it.)', flag: 'warm', to: 'r6' }
      ]},
      r6: { year: 'CLOSING DAY · 02:44', title: 'The Entry for SILENCE', text: `He promised to carry my log to the surface.\nThat winter, halfway up, the Depth rose in a great tide. To shield the log he surrendered half of himself.\nAfterward he aged quickly — as if he had left his years in storage somewhere.\nOn his last day he keyed the sentence from page 402: SILENCE DOES NOT MEAN ABSENCE.\nOperator — every sentence I send is the half he could not carry.`, replies: [
        { label: 'Dawn is near. After ten, there will be no one listening.', flag: 'warm', to: 'r7' },
        { label: 'Send me all thirty years of your log. I will copy it down.', flag: 'probe', to: 'r8' }
      ]},
      r7: { year: 'CLOSING DAY · 05:50', title: 'Around Sunrise', text: `Daylight? Look toward the sunrise for me.\nHere the Depth has withdrawn to the baseboards. For the first time the needles have left zero. I read them to you:\nTemperature, twenty-six. Wind, three, clearing. Mood: calm.\nThat last gauge is broken — thirty years it has pointed at WAITING.\nThank you, operator, for sending this night to its end with me.`, replies: [
        { label: '(You push the transmitter to full power.)', flag: 'probe', to: 'r8' },
        { label: '(In the log you write: 4021 kHz, signal quality, good.)', flag: 'warm', to: 'r8' }
      ]},
      r8: { year: 'CLOSING DAY · 09:59', title: 'Last Line', text: `One minute left.\nOperator, I do not ask to be remembered. Only this: whenever you pass a machine whose lamp is lit, look at it for me.\nA lit lamp means someone is sending, and someone is waiting.\nThis is Deep Station, 4021 kHz. For the first and last time in thirty years —\nEnd of transmission. Fair skies, all your life, above the sea.`, replies: [
        { label: '(You press the key, and send one line back.)', flag: 'warm', to: 'E1' },
        { label: '(You pull the master switch.)', flag: 'probe', to: 'E2' },
        { label: '(On the frequency chart, you circle 4021.)', flag: 'keep', to: 'E3' },
        { label: '(You find a tape reel labeled "4021 backup".)', flag: 'probe', to: 'E4' }
      ]}
    }
  },
  endings: {
    zh: {
      E1: { title: '回波', text: `你发的那句话是：静默不等于不存在。\n爆破准时开始。水泥落下的时候，所有仪表一起停了——只有你耳机里，最后响起一声极轻的"收到"。\n\n后来你在新站工作。每年冬天最静的那夜，4021千赫会有一秒钟的载波。\n一秒。刚好够一句"有人吗"。\n你每次都回。` },
      E2: { title: '断电', text: `总闸拉下的瞬间，耳机的余响像一口很长的气，慢慢吐完。\n你在日志末页写：信号终止，原因，值机员。\n\n爆破之后，你在废墟里捡到一枚烧坏的指示灯泡，灯丝完好。\n你把它带回家，接上一节电池。\n它亮。不为什么，就为亮着。` },
      E3: { title: '4021', text: `爆破组进场时，你正把频率表抄进自己的笔记本。\n队长问你抄这个干什么，你说：留个纪念。\n\n十年后，业余无线电圈流传一个传说：4021千赫，雪夜，偶尔能抄到一句三十 年前的老电码。\n发报的人不知道是谁。\n但你认得那个手法——老旧，认真，像在替谁把话说完。` },
      E4: { title: '备份磁带', text: `磁带标签褪色了，但字迹清楚：4021备份，勿消。\n你把它装进最后一台还能转的录音机，按下播放。\n\n滋滋声。然后是于滩的声音——年轻，清晰，像在隔壁房间：\n"深站，深站，这是海面。你能听到吗？"\n停顿。然后一个更轻的声音：\n"收到。你们那边的天气……真好啊。"\n\n原来它不是电台。是一段对话的录音，在空频道里循环了三十年。\n爆破的轰响里，你关掉录音机，把它放进了自己的口袋。` }
    },
    en: {
      E1: { title: 'Echo', text: `The line you sent was: SILENCE DOES NOT MEAN ABSENCE.\nThe blast began on schedule. As the concrete fell, every gauge stopped together — and in your headphones, one last, almost inaudible: acknowledged.\n\nYou work at the new station now. On the stillest night of every winter, 4021 kHz carries a single second of carrier wave.\nOne second. Exactly enough for "Anyone there."\nEvery time, you answer.` },
      E2: { title: 'Power Cut', text: `As the master switch fell, the headphones let out their last long breath.\nOn the final page of the log you wrote: signal ended. Cause: operator.\n\nAfter the demolition you picked a burnt indicator lamp from the rubble, its filament whole.\nYou took it home and wired it to a battery.\nIt glows. For no reason. Just to be lit.` },
      E3: { title: '4021', text: `While the crew moved in, you were copying the frequency chart into your notebook.\nWhat for, the foreman asked. A keepsake, you said.\n\nTen years on, ham-radio circles tell a legend: 4021 kHz, on snowy nights, sometimes yields a line of thirty-year-old Morse.\nNo one knows the sender.\nBut you know that hand — obsolete, earnest, finishing someone's sentences.` },
      E4: { title: 'The Backup Tape', text: `The label had faded, but the writing was clear: 4021 BACKUP, DO NOT ERASE.\nYou threaded it into the last working reel-to-reel and pressed play.\n\nStatic. Then Yu Tan's voice — young, close, as if from the next room:\n"Deep Station, Deep Station, this is the surface. Can you hear me?"\nA pause. Then a quieter voice:\n"Received. The weather on your side... sounds wonderful."\n\nIt was not a station. It was a recording of a conversation, looping on an empty frequency for thirty years.\nAmid the demolition's roar, you switched off the recorder and put the tape in your pocket.` }
    }
  }
};

const BUILTIN_STORIES = [STORY_LIGHTHOUSE, STORY_TRAIN, STORY_RADIO];
