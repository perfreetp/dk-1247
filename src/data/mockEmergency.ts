export interface EmergencySignal {
  id: string;
  title: string;
  description: string;
  urgency: 'critical' | 'urgent' | 'serious';
  symptoms: string[];
  petTypes: ('cat' | 'dog' | 'rabbit' | 'bird')[];
}

export const mockEmergencySignals: EmergencySignal[] = [
  {
    id: '1',
    title: '呼吸困难',
    description: '宠物出现张嘴呼吸、呼吸急促、呼吸声异常等症状',
    urgency: 'critical',
    symptoms: ['张嘴呼吸', '呼吸急促', '嘴唇发紫', '喘鸣声'],
    petTypes: ['cat', 'dog', 'rabbit', 'bird']
  },
  {
    id: '2',
    title: '严重出血',
    description: '无法止血的大量出血，或伤口较深、出血不止',
    urgency: 'critical',
    symptoms: ['大量出血', '血流不止', '伤口较深', '动脉出血'],
    petTypes: ['cat', 'dog', 'rabbit', 'bird']
  },
  {
    id: '3',
    title: '中毒症状',
    description: '误食有毒物质后出现呕吐、腹泻、抽搐、昏迷等',
    urgency: 'critical',
    symptoms: ['呕吐', '腹泻', '抽搐', '流涎', '瞳孔放大', '昏迷'],
    petTypes: ['cat', 'dog', 'rabbit', 'bird']
  },
  {
    id: '4',
    title: '无法排尿',
    description: '宠物频繁尝试排尿但无尿液排出，或排尿时表现痛苦',
    urgency: 'urgent',
    symptoms: ['频繁蹲便', '无尿液', '排尿困难', '尿液带血'],
    petTypes: ['cat', 'dog']
  },
  {
    id: '5',
    title: '持续呕吐/腹泻',
    description: '24小时内呕吐或腹泻超过3次，或伴随血便',
    urgency: 'urgent',
    symptoms: ['反复呕吐', '水样腹泻', '血便', '精神萎靡'],
    petTypes: ['cat', 'dog', 'rabbit', 'bird']
  },
  {
    id: '6',
    title: '高烧不退',
    description: '体温超过39.5°C且持续不降，或伴随其他症状',
    urgency: 'urgent',
    symptoms: ['体温升高', '精神沉郁', '食欲下降', '呼吸急促'],
    petTypes: ['cat', 'dog', 'rabbit', 'bird']
  },
  {
    id: '7',
    title: '虚脱/昏迷',
    description: '宠物突然虚脱、无法站立或昏迷',
    urgency: 'critical',
    symptoms: ['突然倒下', '意识丧失', '身体发软', '呼唤无反应'],
    petTypes: ['cat', 'dog', 'rabbit', 'bird']
  },
  {
    id: '8',
    title: '骨折或严重外伤',
    description: '明显骨折、坠落伤、车祸伤等严重外伤',
    urgency: 'critical',
    symptoms: ['明显畸形', '无法行走', '剧烈疼痛', '开放性伤口'],
    petTypes: ['cat', 'dog', 'rabbit', 'bird']
  },
  {
    id: '9',
    title: '难产',
    description: '母宠在生产过程中出现难产迹象',
    urgency: 'critical',
    symptoms: ['强烈宫缩30分钟无幼崽产出', '阴道大量流血', '精神极度不安'],
    petTypes: ['cat', 'dog', 'rabbit']
  },
  {
    id: '10',
    title: '眼睛突然受伤',
    description: '眼睛被异物刺伤、化学物质入眼等紧急情况',
    urgency: 'urgent',
    symptoms: ['眼睛红肿', '流脓', '眼球突出', '无法睁开'],
    petTypes: ['cat', 'dog', 'rabbit', 'bird']
  }
];
