import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import { mockAnswers } from '@/data/mockQuestions';

interface AnswerData {
  id: string;
  questionId: string;
  content: string;
  category: string;
  helpful: number;
  outdated: number;
  createdAt: string;
  isVerified: boolean;
}

const AnswerPage: React.FC = () => {
  const [petType, setPetType] = useState<string>('');
  const [symptoms, setSymptoms] = useState<string>('');
  const [breed, setBreed] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [diet, setDiet] = useState<string>('');
  const [selectedAnswer, setSelectedAnswer] = useState<AnswerData | null>(null);
  const [isHelpful, setIsHelpful] = useState(false);
  const [isOutdated, setIsOutdated] = useState(false);

  useEffect(() => {
    const { petType: pt, symptoms: s, breed: b, age: a, diet: d } = 
      Taro.getCurrentInstance().router?.params || {};
    setPetType(pt || 'cat');
    setSymptoms(decodeURIComponent(s || ''));
    setBreed(decodeURIComponent(b || ''));
    setAge(decodeURIComponent(a || ''));
    setDiet(decodeURIComponent(d || ''));

    if (mockAnswers.length > 0) {
      setSelectedAnswer(mockAnswers[0]);
    }
  }, []);

  const getPetEmoji = (type: string) => {
    const emojis: Record<string, string> = {
      cat: '🐱',
      dog: '🐶',
      rabbit: '🐰',
      bird: '🐦'
    };
    return emojis[type] || '🐾';
  };

  const getPetName = (type: string) => {
    const names: Record<string, string> = {
      cat: '猫咪',
      dog: '狗狗',
      rabbit: '兔子',
      bird: '鸟类'
    };
    return names[type] || '宠物';
  };

  const handleMarkHelpful = () => {
    if (isHelpful) {
      setIsHelpful(false);
    } else {
      setIsHelpful(true);
      setIsOutdated(false);
      Taro.showToast({
        title: '感谢您的反馈',
        icon: 'success'
      });
    }
  };

  const handleMarkOutdated = () => {
    if (isOutdated) {
      setIsOutdated(false);
    } else {
      setIsOutdated(true);
      setIsHelpful(false);
      Taro.showToast({
        title: '感谢您的反馈',
        icon: 'success'
      });
    }
  };

  const handleConsultDoctor = () => {
    Taro.showToast({
      title: '正在跳转到咨询页面',
      icon: 'none'
    });
  };

  const generateAnswerContent = () => {
    const categoryContents = {
      feeding: `根据您的描述，${getPetName(petType)}的喂养建议如下：

1. **定时定量喂食**：${getPetName(petType)}需要养成规律的饮食习惯，建议每天喂食2-3次
2. **选择优质主粮**：根据年龄和品种选择适合的宠物粮，注意查看成分表
3. **新鲜水源**：确保${getPetName(petType)}随时有干净的饮水
4. **避免人类食物**：很多人类食物对宠物有毒，如巧克力、洋葱等
${diet ? `关于您提到的饮食情况：${diet}` : ''}`,
      
      care: `护理建议：

1. **定期梳毛**：根据${getPetName(petType)}的毛发类型，定期梳理可以减少掉毛和毛球
2. **指甲修剪**：每月修剪一次指甲，避免过长影响行走
3. **耳朵清洁**：定期检查耳朵，清除耳垢，预防耳道感染
4. **口腔护理**：养成刷牙习惯，预防牙结石和口腔疾病
${breed ? `${getPetName(petType)}品种特点：${breed}需要特定的护理方式` : ''}`,
      
      behavior: `行为建议：

1. **耐心观察**：注意${getPetName(petType)}的行为变化，这可能是身体不适的信号
2. **正向训练**：使用奖励方式训练，避免惩罚
3. **环境丰富**：提供玩具和活动空间，满足${getPetName(petType)}的精神需求
4. **建立信任**：多陪伴互动，加深与${getPetName(petType)}的感情
${symptoms ? `关于当前症状：${symptoms}` : ''}`,
      
      health: `⚠️ 健康警示：

根据您描述的情况，建议密切关注以下症状：
- 食欲变化
- 精神状态
- 排泄情况
- 体重变化

${age ? `${getPetName(petType)}年龄：${age}，需要注意这个年龄段的常见健康问题` : ''}

如果症状持续或加重，建议尽快就医检查。`
    };

    return categoryContents;
  };

  return (
    <ScrollView className={styles.container} scrollY>
      <View className={styles.questionSummary}>
        <View className={styles.questionHeader}>
          <View className={styles.petBadge}>
            <Text className={styles.petIcon}>{getPetEmoji(petType)}</Text>
            <Text className={styles.petType}>{getPetName(petType)}</Text>
          </View>
          <Text className={styles.questionTime}>刚刚发布</Text>
        </View>
        <Text className={styles.questionContent}>
          {symptoms || '宠物健康问题咨询'}
        </Text>
        <View className={styles.petInfo}>
          {breed && <Text className={styles.infoTag}>品种：{breed}</Text>}
          {age && <Text className={styles.infoTag}>年龄：{age}</Text>}
          {diet && <Text className={styles.infoTag}>饮食：{diet}</Text>}
        </View>
      </View>

      <View className={styles.warningCard}>
        <View className={styles.warningHeader}>
          <Text className={styles.warningIcon}>🚨</Text>
          <Text className={styles.warningTitle}>温馨提示</Text>
        </View>
        <Text className={styles.warningContent}>
          本回答仅供参考，不能替代专业兽医诊断。如症状严重或持续，请立即就医。
        </Text>
      </View>

      <View className={styles.aiLabel}>
        <Text className={styles.aiIcon}>🤖</Text>
        <Text>智能分析建议</Text>
      </View>

      {['喂养建议', '护理建议', '行为指导', '健康预警'].map((title, index) => {
        const categoryKeys = ['feeding', 'care', 'behavior', 'health'] as const;
        const categoryIcons = ['🍖', '🧹', '🧠', '💊'];
        const content = generateAnswerContent()[categoryKeys[index]];
        
        return (
          <View key={index} className={styles.categorySection}>
            <Text className={styles.sectionTitle}>
              <Text className={styles.titleIcon}>{categoryIcons[index]}</Text>
              {title}
              {index === 3 && <Text className={styles.categoryBadge}>重要</Text>}
            </Text>
            <View className={styles.answerCard}>
              <Text className={styles.answerContent}>{content}</Text>
              <View className={styles.answerFooter}>
                <View className={styles.answerMeta}>
                  <View className={styles.verifiedBadge}>
                    <Text className={styles.checkIcon}>✓</Text>
                    已验证
                  </View>
                  <Text className={styles.helpfulCount}>
                    {index === 0 ? '128' : index === 1 ? '95' : index === 2 ? '156' : '203'}人认为有帮助
                  </Text>
                </View>
              </View>
            </View>
          </View>
        );
      })}

      <View className={styles.feedbackSection}>
        <Text className={styles.feedbackTitle}>这个回答对您有帮助吗？</Text>
        <View className={styles.feedbackButtons}>
          <View
            className={`${styles.feedbackBtn} ${isHelpful ? styles.active : ''}`}
            onClick={handleMarkHelpful}
          >
            <Text className={styles.feedbackIcon}>👍</Text>
            <Text className={styles.feedbackText}>有用</Text>
            <Text className={styles.feedbackCount}>
              {selectedAnswer ? selectedAnswer.helpful + (isHelpful ? 1 : 0) : 128} 人
            </Text>
          </View>
          <View
            className={`${styles.feedbackBtn} ${styles.outdated} ${isOutdated ? styles.active : ''}`}
            onClick={handleMarkOutdated}
          >
            <Text className={styles.feedbackIcon}>📝</Text>
            <Text className={styles.feedbackText}>信息过时</Text>
            <Text className={styles.feedbackCount}>
              {selectedAnswer ? selectedAnswer.outdated + (isOutdated ? 1 : 0) : 3} 人
            </Text>
          </View>
        </View>
      </View>

      <View className={styles.consultDoctorBtn} onClick={handleConsultDoctor}>
        在线咨询兽医 👨‍⚕️
      </View>
    </ScrollView>
  );
};

export default AnswerPage;
