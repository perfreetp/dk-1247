import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import PetCard from '@/components/PetCard';
import DailyTipCard from '@/components/DailyTipCard';
import { mockQuestions } from '@/data/mockQuestions';
import { mockDailyTips } from '@/data/mockKnowledge';

const HomePage: React.FC = () => {
  const [dailyTip, setDailyTip] = useState(mockDailyTips[0]);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const tip = mockDailyTips.find(t => t.date === today) || mockDailyTips[0];
    setDailyTip(tip);
  }, []);

  const handlePetClick = (type: string) => {
    Taro.navigateTo({
      url: `/pages/knowledge/index?petType=${type}`
    });
  };

  const handleEmergencyClick = () => {
    Taro.navigateTo({
      url: '/pages/emergency/index'
    });
  };

  const handleQuestionClick = (questionId: string) => {
    Taro.navigateTo({
      url: `/pages/answer/index?id=${questionId}`
    });
  };

  const hotQuestions = mockQuestions.filter(q => q.status === 'answered').slice(0, 5);

  const petTypes = [
    { type: 'cat' as const, name: '猫咪', count: 128 },
    { type: 'dog' as const, name: '狗狗', count: 156 },
    { type: 'rabbit' as const, name: '兔子', count: 45 },
    { type: 'bird' as const, name: '鸟类', count: 32 }
  ];

  return (
    <ScrollView className={styles.container} scrollY>
      <View className={styles.header}>
        <Text className={styles.title}>🐾 宠物问答助手</Text>
        <Text className={styles.subtitle}>新手主人的养宠百科全书</Text>
      </View>

      <View className={styles.section}>
        <Text className={styles.sectionTitle}>
          <Text className={styles.titleIcon}>🐾</Text>
          选择您的宠物
        </Text>
        <View className={styles.petGrid}>
          {petTypes.map(pet => (
            <PetCard
              key={pet.type}
              type={pet.type}
              name={pet.name}
              count={pet.count}
              onClick={() => handlePetClick(pet.type)}
            />
          ))}
        </View>
      </View>

      <View className={styles.section}>
        <DailyTipCard content={dailyTip.content} date={dailyTip.date} />
      </View>

      <View className={styles.section}>
        <Text className={styles.sectionTitle}>
          <Text className={styles.titleIcon}>🔥</Text>
          热门问题
        </Text>
        <View className={styles.hotQuestions}>
          {hotQuestions.map(question => (
            <View
              key={question.id}
              className={styles.questionItem}
              onClick={() => handleQuestionClick(question.id)}
            >
              <View className={styles.questionIcon}>
                <Text className={styles.iconText}>
                  {question.petType === 'cat' ? '🐱' : 
                   question.petType === 'dog' ? '🐶' : 
                   question.petType === 'rabbit' ? '🐰' : '🐦'}
                </Text>
              </View>
              <View className={styles.questionContent}>
                <Text className={styles.questionTitle}>{question.title}</Text>
                <Text className={styles.questionMeta}>
                  {question.category === 'feeding' ? '💊 喂养' :
                   question.category === 'care' ? '🧹 护理' :
                   question.category === 'behavior' ? '🧠 行为' : '🏥 疾病'}
                </Text>
              </View>
              <Text className={styles.arrowIcon}>›</Text>
            </View>
          ))}
        </View>
      </View>

      <View className={styles.emergencyBanner} onClick={handleEmergencyClick}>
        <View className={styles.emergencyIcon}>
          <Text className={styles.iconText}>🚨</Text>
        </View>
        <View className={styles.emergencyContent}>
          <Text className={styles.emergencyTitle}>紧急情况</Text>
          <Text className={styles.emergencyDesc}>点击查看需立即就医的信号</Text>
        </View>
        <Text className={styles.arrowIcon}>›</Text>
      </View>
    </ScrollView>
  );
};

export default HomePage;
