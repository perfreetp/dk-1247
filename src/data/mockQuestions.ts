import { Question, Answer } from '../types/question';

export const mockQuestions: Question[] = [
  {
    id: '1',
    title: '猫咪最近食欲下降怎么办？',
    content: '我家猫咪最近两天都不怎么吃东西，平时喜欢的罐头也不吃了，但是精神状态还行，这是怎么回事？',
    petType: 'cat',
    category: 'health',
    petInfo: {
      breed: '英短',
      age: 2,
      symptoms: ['食欲下降', '精神尚可'],
      diet: '皇家猫粮 + 偶尔罐头'
    },
    createdAt: '2024-01-15',
    status: 'answered'
  },
  {
    id: '2',
    title: '狗狗总是乱咬拖鞋怎么纠正？',
    content: '我家3个月大的小狗总喜欢咬拖鞋和鞋子，训斥也没用，怎么办？',
    petType: 'dog',
    category: 'behavior',
    petInfo: {
      breed: '金毛',
      age: 0.25
    },
    createdAt: '2024-01-14',
    status: 'answered'
  },
  {
    id: '3',
    title: '幼猫应该怎么科学喂养？',
    content: '刚领养了一只2个月的小猫，不知道该怎么喂养，喂什么牌子的猫粮比较好？',
    petType: 'cat',
    category: 'feeding',
    petInfo: {
      breed: '中华田园猫',
      age: 0.17
    },
    createdAt: '2024-01-13',
    status: 'answered'
  },
  {
    id: '4',
    title: '兔子拉肚子怎么办？',
    content: '我的兔子今天拉的便便很稀，是怎么回事？',
    petType: 'rabbit',
    category: 'health',
    createdAt: '2024-01-12',
    status: 'answered'
  },
  {
    id: '5',
    title: '猫咪掉毛严重是正常的吗？',
    content: '每到换季猫咪掉毛特别厉害，家里到处都是毛，这正常吗？',
    petType: 'cat',
    category: 'care',
    createdAt: '2024-01-11',
    status: 'answered'
  }
];

export const mockAnswers: Answer[] = [
  {
    id: '1',
    questionId: '1',
    content: '猫咪食欲下降可能由多种原因导致：\n\n1. **口腔问题**：检查猫咪是否有口腔溃疡、牙龈红肿等\n2. **消化问题**：可能是肠胃不适，可以喂些益生菌\n3. **毛球症**：猫咪舔毛过多会导致毛球积累，影响食欲\n4. **应激反应**：环境变化或受到惊吓也会导致食欲下降\n\n建议：先观察24小时，如果持续不进食或出现其他症状（如呕吐、精神萎靡），应及时就医。',
    category: 'health',
    helpful: 128,
    outdated: 3,
    createdAt: '2024-01-15',
    isVerified: true
  },
  {
    id: '2',
    questionId: '2',
    content: '幼犬咬东西是正常行为，因为正在长牙期。可以尝试以下方法：\n\n1. **提供替代品**：给狗狗准备咬胶、磨牙棒等\n2. **正向引导**：当狗狗咬正确的东西时给予奖励和表扬\n3. **环境管理**：将拖鞋等贵重物品放在狗狗够不到的地方\n4. **消耗精力**：多带狗狗外出运动，消耗过剩精力\n5. **不要惩罚**：咬东西时不要大声训斥，这只会让狗狗更紧张\n\n坚持训练，狗狗会慢慢学会什么可以咬，什么不可以咬。',
    category: 'behavior',
    helpful: 256,
    outdated: 5,
    createdAt: '2024-01-14',
    isVerified: true
  },
  {
    id: '3',
    questionId: '3',
    content: '幼猫喂养需要注意以下几点：\n\n**关于猫粮选择**：\n- 选择专为幼猫设计的猫粮，蛋白质含量要高于30%\n- 推荐品牌：皇家、渴望、爱肯拿等口碑较好的猫粮\n- 不要给幼猫喂成猫粮，营养成分不匹配\n\n**喂养频率**：\n- 2-3个月：每天4-5次\n- 3-6个月：每天3-4次\n- 6个月以上：每天2-3次\n\n**注意事项**：\n- 猫粮要用温水泡软后再喂\n- 保持饮水充足和新鲜\n- 可以适当添加羊奶粉补充营养\n- 不要喂牛奶，猫咪乳糖不耐受',
    category: 'feeding',
    helpful: 389,
    outdated: 2,
    createdAt: '2024-01-13',
    isVerified: true
  }
];
