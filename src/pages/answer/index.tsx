import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import { mockQuestions, mockAnswers } from '@/data/mockQuestions';
import { Question } from '@/types/question';

const AnswerPage: React.FC = () => {
  const [question, setQuestion] = useState<Question | null>(null);
  const [isHelpful, setIsHelpful] = useState(false);
  const [isOutdated, setIsOutdated] = useState(false);

  useEffect(() => {
    const { id, petType, symptoms, breed, age, diet } = 
      Taro.getCurrentInstance().router?.params || {};

    if (id) {
      const foundQuestion = mockQuestions.find(q => q.id === id);
      if (foundQuestion) {
        setQuestion(foundQuestion);
      }
    } else {
      const newQuestion: Question = {
        id: Date.now().toString(),
        title: '宠物健康问题咨询',
        content: decodeURIComponent(symptoms || '宠物健康问题咨询'),
        petType: (petType || 'cat') as 'cat' | 'dog' | 'rabbit' | 'bird',
        category: 'health',
        petInfo: {
          breed: decodeURIComponent(breed || ''),
          age: parseFloat(decodeURIComponent(age || '0')) || 0,
          diet: decodeURIComponent(diet || '')
        },
        createdAt: new Date().toISOString().split('T')[0],
        status: 'answered'
      };
      setQuestion(newQuestion);
    }
  }, []);

  const getPetEmoji = (type: string) => {
    const emojis: Record<string, string> = {
      cat: '🐱',
      dog: '🐶',
      rabbit: '🐰',
      bird: '🐦',
      all: '🐾'
    };
    return emojis[type] || '🐾';
  };

  const getPetName = (type: string) => {
    const names: Record<string, string> = {
      cat: '猫咪',
      dog: '狗狗',
      rabbit: '兔子',
      bird: '鸟类',
      all: '宠物'
    };
    return names[type] || '宠物';
  };

  const getCategoryName = (category: string) => {
    const names: Record<string, string> = {
      feeding: '💊 喂养',
      care: '🧹 护理',
      behavior: '🧠 行为',
      health: '🏥 疾病'
    };
    return names[category] || '🏥 其他';
  };

  const getAnswerForQuestion = (questionId: string) => {
    return mockAnswers.find(a => a.questionId === questionId);
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
    if (!question) return '';

    const petName = getPetName(question.petType);
    const breed = question.petInfo?.breed || '';
    const diet = question.petInfo?.diet || '';
    const age = question.petInfo?.age?.toString() || '';
    const symptoms = question.content;

    const categoryContents = {
      feeding: `根据您的描述，${petName}的喂养建议如下：

1. **定时定量喂食**：${petName}需要养成规律的饮食习惯，建议每天喂食2-3次
2. **选择优质主粮**：根据年龄和品种选择适合的宠物粮，注意查看成分表
3. **新鲜水源**：确保${petName}随时有干净的饮水
4. **避免人类食物**：很多人类食物对宠物有毒，如巧克力、洋葱等
${diet ? `关于您提到的饮食情况：${diet}` : ''}`,
      
      care: `护理建议：

1. **定期梳毛**：根据${petName}的毛发类型，定期梳理可以减少掉毛和毛球
2. **指甲修剪**：每月修剪一次指甲，避免过长影响行走
3. **耳朵清洁**：定期检查耳朵，清除耳垢，预防耳道感染
4. **口腔护理**：养成刷牙习惯，预防牙结石和口腔疾病
${breed ? `${petName}品种特点：${breed}需要特定的护理方式` : ''}`,
      
      behavior: `行为建议：

1. **耐心观察**：注意${petName}的行为变化，这可能是身体不适的信号
2. **正向训练**：使用奖励方式训练，避免惩罚
3. **环境丰富**：提供玩具和活动空间，满足${petName}的精神需求
4. **建立信任**：多陪伴互动，加深与${petName}的感情
${symptoms ? `关于当前症状：${symptoms}` : ''}`,
      
      health: `⚠️ 健康警示：

根据您描述的情况，建议密切关注以下症状：
- 食欲变化
- 精神状态
- 排泄情况
- 体重变化

${age ? `${petName}年龄：${age}岁，需要注意这个年龄段的常见健康问题` : ''}

如果症状持续或加重，建议尽快就医检查。`
    };

    return categoryContents;
  };

  if (!question) {
    return (
      <View className={styles.container}>
        <View style={{ textAlign: 'center', padding: '100rpx' }}>
          <Text>加载中...</Text>
        </View>
      </View>
    );
  }

  const answer = getAnswerForQuestion(question.id);
  const hasOfficialAnswer = !!answer;
  const categories = ['feeding', 'care', 'behavior', 'health'] as const;
  const categoryTitles = ['喂养建议', '护理建议', '行为指导', '健康预警'];
  const categoryIcons = ['🍖', '🧹', '🧠', '💊'];

  return (
    <ScrollView className={styles.container} scrollY>
      <View className={styles.questionSummary}>
        <View className={styles.questionHeader}>
          <View className={styles.petBadge}>
            <Text className={styles.petIcon}>{getPetEmoji(question.petType)}</Text>
            <Text className={styles.petType}>{getPetName(question.petType)}</Text>
          </View>
          <View style={{ display: 'flex', gap: '8rpx' }}>
            <Text className={styles.questionTime}>{question.createdAt}</Text>
            <Text className={styles.categoryBadge}>{getCategoryName(question.category)}</Text>
          </View>
        </View>
        <Text className={styles.questionTitle}>{question.title}</Text>
        <Text className={styles.questionContent}>{question.content}</Text>
        <View className={styles.petInfo}>
          {question.petInfo?.breed && (
            <Text className={styles.infoTag}>品种：{question.petInfo.breed}</Text>
          )}
          {question.petInfo?.age && (
            <Text className={styles.infoTag}>年龄：{question.petInfo.age}岁</Text>
          )}
          {question.petInfo?.diet && (
            <Text className={styles.infoTag}>饮食：{question.petInfo.diet}</Text>
          )}
        </View>
      </View>

      {hasOfficialAnswer ? (
        <View className={styles.expertAnswer}>
          <View className={styles.expertHeader}>
            <Text className={styles.expertIcon}>👨‍⚕️</Text>
            <View>
              <Text className={styles.expertLabel}>专业解答</Text>
              <Text className={styles.expertTime}>{answer.createdAt}</Text>
            </View>
          </View>
          <Text className={styles.expertContent}>{answer.content}</Text>
          <View className={styles.expertStats}>
            <Text className={styles.statItem}>
              👍 {answer.helpful}人认为有帮助
            </Text>
            {answer.isVerified && (
              <Text className={styles.verifiedBadge}>✓ 已验证</Text>
            )}
          </View>
        </View>
      ) : (
        <View className={styles.noAnswerCard}>
          <Text className={styles.noAnswerIcon}>📝</Text>
          <Text className={styles.noAnswerTitle}>暂无整理好的标准答案</Text>
          <Text className={styles.noAnswerDesc}>
            这条问题暂时还没有整理好标准答案。以下是根据您描述的情况生成的参考建议，仅供参考：
          </Text>
        </View>
      )}

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

      {categories.map((category, index) => (
        <View key={category} className={styles.categorySection}>
          <Text className={styles.sectionTitle}>
            <Text className={styles.titleIcon}>{categoryIcons[index]}</Text>
            {categoryTitles[index]}
            {index === 3 && <Text className={styles.categoryBadge}>重要</Text>}
          </Text>
          <View className={styles.answerCard}>
            <Text className={styles.answerContent}>
              {generateAnswerContent()[category]}
            </Text>
            {!hasOfficialAnswer && (
              <View className={styles.answerFooter}>
                <Text className={styles.aiHint}>
                  🤖 智能生成，仅供参考
                </Text>
              </View>
            )}
          </View>
        </View>
      ))}

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
              {hasOfficialAnswer ? answer.helpful + (isHelpful ? 1 : 0) : (isHelpful ? 1 : 0)} 人
            </Text>
          </View>
          <View
            className={`${styles.feedbackBtn} ${styles.outdated} ${isOutdated ? styles.active : ''}`}
            onClick={handleMarkOutdated}
          >
            <Text className={styles.feedbackIcon}>📝</Text>
            <Text className={styles.feedbackText}>信息过时</Text>
            <Text className={styles.feedbackCount}>
              {hasOfficialAnswer ? answer.outdated + (isOutdated ? 1 : 0) : (isOutdated ? 1 : 0)} 人
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
