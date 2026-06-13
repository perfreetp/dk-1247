import { Article, GlossaryTerm, Pitfall, DailyTip } from '../types/knowledge';

export const mockArticles: Article[] = [
  {
    id: '1',
    title: '新手养猫完全指南：从入门到精通',
    summary: '涵盖猫咪喂养、日常护理、健康保健等全方位知识，适合第一次养猫的新手主人',
    content: '养猫前的准备...\n\n选择猫咪...\n\n日常喂养...\n\n护理保健...',
    coverImage: 'https://picsum.photos/id/237/750/500',
    category: 'care',
    tags: ['新手', '养猫', '入门'],
    readTime: 10,
    publishDate: '2024-01-10',
    isHot: true
  },
  {
    id: '2',
    title: '幼犬喂养注意事项大全',
    summary: '详细讲解幼犬不同阶段的营养需求和喂养方法，帮助狗狗健康成长',
    content: '幼犬喂养要点...\n\n分阶段喂养...\n\n营养配比...',
    coverImage: 'https://picsum.photos/id/659/750/500',
    category: 'feeding',
    tags: ['幼犬', '喂养', '营养'],
    readTime: 8,
    publishDate: '2024-01-08',
    isHot: true
  },
  {
    id: '3',
    title: '猫咪常见行为问题解析',
    summary: '解读猫咪的各种行为背后的含义，教你理解和应对猫咪的异常行为',
    content: '猫咪行为学...\n\n常见行为解析...\n\n应对策略...',
    coverImage: 'https://picsum.photos/id/218/750/500',
    category: 'behavior',
    tags: ['行为', '心理学', '训练'],
    readTime: 12,
    publishDate: '2024-01-05'
  },
  {
    id: '4',
    title: '宠物疫苗接种全攻略',
    summary: '详细介绍猫狗疫苗种类、接种时间表和注意事项',
    content: '疫苗基础知识...\n\n接种时间表...\n\n注意事项...',
    coverImage: 'https://picsum.photos/id/20/750/500',
    category: 'health',
    tags: ['疫苗', '健康', '预防'],
    readTime: 7,
    publishDate: '2024-01-03',
    isHot: true
  },
  {
    id: '5',
    title: '如何选择适合的猫粮',
    summary: '从成分表到品牌推荐，教你为猫咪挑选最合适的猫粮',
    content: '猫粮成分解析...\n\n如何看配料表...\n\n品牌推荐...',
    coverImage: 'https://picsum.photos/id/3/750/500',
    category: 'feeding',
    tags: ['猫粮', '营养', '选购'],
    readTime: 9,
    publishDate: '2024-01-01'
  },
  {
    id: '6',
    title: '狗狗行为训练基础教程',
    summary: '基础指令训练、社交化训练和行为纠正方法',
    content: '基础指令...\n\n社交化...\n\n行为纠正...',
    coverImage: 'https://picsum.photos/id/175/750/500',
    category: 'behavior',
    tags: ['训练', '狗狗', '基础'],
    readTime: 11,
    publishDate: '2023-12-28'
  },
  {
    id: '7',
    title: '宠物驱虫完全指南',
    summary: '体内外驱虫的方法、频率和注意事项',
    content: '驱虫重要性...\n\n驱虫方法...\n\n注意事项...',
    coverImage: 'https://picsum.photos/id/42/750/500',
    category: 'health',
    tags: ['驱虫', '保健', '健康'],
    readTime: 6,
    publishDate: '2023-12-25'
  },
  {
    id: '8',
    title: '猫咪毛发护理技巧',
    summary: '如何减少猫咪掉毛、预防毛球症和打造健康毛发',
    content: '毛发护理...\n\n减少掉毛...\n\n毛球预防...',
    coverImage: 'https://picsum.photos/id/60/750/500',
    category: 'care',
    tags: ['毛发', '护理', '美容'],
    readTime: 8,
    publishDate: '2023-12-20'
  }
];

export const mockGlossary: GlossaryTerm[] = [
  {
    id: '1',
    term: '疫苗加强针',
    definition: '在初次免疫完成后，需要定期接种的增强免疫效果的疫苗',
    category: '健康'
  },
  {
    id: '2',
    term: '毛球症',
    definition: '猫咪舔毛时吞入过多毛发，在胃里形成毛球，可能导致呕吐或肠道堵塞',
    category: '健康'
  },
  {
    id: '3',
    term: '社会化训练',
    definition: '让幼年宠物接触各种人、动物、环境和声音，培养其适应能力的过程',
    category: '行为'
  },
  {
    id: '4',
    term: '异食癖',
    definition: '宠物持续性地啃咬或吞食非食物物品的行为，常见于狗狗',
    category: '行为'
  },
  {
    id: '5',
    term: '定时定点喂食',
    definition: '在固定的时间和地点喂食，有助于建立良好的饮食习惯和消化规律',
    category: '喂养'
  },
  {
    id: '6',
    term: '绝育/去势',
    definition: '通过手术移除宠物生殖器官的手术，可以预防某些疾病和行为问题',
    category: '健康'
  },
  {
    id: '7',
    term: '应激反应',
    definition: '宠物面对环境变化、惊吓等压力时产生的生理和行为反应',
    category: '行为'
  },
  {
    id: '8',
    term: '全面营养',
    definition: '宠物食品中含有宠物所需的全部营养素，包括蛋白质、脂肪、碳水、维生素等',
    category: '喂养'
  }
];

export const mockPitfalls: Pitfall[] = [
  {
    id: '1',
    title: '给猫咪喂牛奶',
    description: '大多数猫咪都有乳糖不耐受，喝牛奶会导致腹泻、呕吐等消化问题。应该选择专门的猫咪奶粉或羊奶粉。',
    severity: 'high',
    petTypes: ['cat', 'dog']
  },
  {
    id: '2',
    title: '长期喂单一食物',
    description: '只给宠物吃一种食物会导致营养不均衡，缺乏必要的维生素和矿物质。应该选择营养全面的商品粮或科学配比的自制粮。',
    severity: 'medium',
    petTypes: ['cat', 'dog', 'rabbit', 'bird']
  },
  {
    id: '3',
    title: '不及时接种疫苗',
    description: '疫苗接种是预防传染病的最有效方法。未接种疫苗的宠物容易感染猫瘟、犬瘟热等致命疾病。',
    severity: 'high',
    petTypes: ['cat', 'dog']
  },
  {
    id: '4',
    title: '忽视牙齿护理',
    description: '宠物牙病会导致口臭、牙龈炎甚至心脏、肾脏问题。应该定期给宠物刷牙或提供口腔护理产品。',
    severity: 'medium',
    petTypes: ['cat', 'dog']
  },
  {
    id: '5',
    title: '给狗狗喂巧克力',
    description: '巧克力含有可可碱，对狗狗有毒，可能导致呕吐、腹泻、心律不齐甚至死亡。',
    severity: 'high',
    petTypes: ['dog']
  },
  {
    id: '6',
    title: '频繁洗澡',
    description: '猫咪的皮肤结构与人类不同，频繁洗澡会破坏皮肤油脂层，导致皮肤干燥、毛发质量下降。猫咪通常不需要经常洗澡。',
    severity: 'medium',
    petTypes: ['cat']
  },
  {
    id: '7',
    title: '使用人类洗发水',
    description: '人类洗发水的pH值不适合宠物皮肤，使用后可能导致皮肤干燥、瘙痒、皮屑等问题。应该使用宠物专用洗护产品。',
    severity: 'medium',
    petTypes: ['cat', 'dog', 'rabbit']
  },
  {
    id: '8',
    title: '忽视驱虫',
    description: '寄生虫会影响宠物的健康和生长发育，还可能传染给人类。应该按照推荐周期进行体内外驱虫。',
    severity: 'high',
    petTypes: ['cat', 'dog', 'rabbit', 'bird']
  }
];

export const mockDailyTips: DailyTip[] = [
  {
    id: '1',
    content: '💡 每日知识：猫咪每天需要睡眠12-16小时，这是正常的生理需求，不要担心它们嗜睡哦！',
    date: '2024-01-15',
    petType: 'cat'
  },
  {
    id: '2',
    content: '💡 每日知识：狗狗的鼻子湿润是健康的表现，如果鼻子干燥可能意味着它发烧了或脱水了。',
    date: '2024-01-14',
    petType: 'dog'
  },
  {
    id: '3',
    content: '💡 每日知识：兔子的牙齿会不断生长，需要提供干草等粗纤维食物帮助磨牙。',
    date: '2024-01-13',
    petType: 'rabbit'
  },
  {
    id: '4',
    content: '💡 每日知识：定期给宠物梳毛不仅能减少掉毛，还能促进皮肤血液循环，增进你们之间的感情！',
    date: '2024-01-12',
    petType: 'all'
  }
];
