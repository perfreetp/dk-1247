import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import { useAppContext } from '@/store/AppContext';
import { mockQuestions } from '@/data/mockQuestions';

const QuestionHistoryPage: React.FC = () => {
  const [selectedPetType, setSelectedPetType] = useState<string>('all');
  const [historyList, setHistoryList] = useState(mockQuestions);
  const { questionHistory } = useAppContext();

  useEffect(() => {
    filterHistory();
  }, [selectedPetType]);

  const filterHistory = () => {
    let filtered;
    if (selectedPetType === 'all') {
      filtered = [...mockQuestions, ...questionHistory];
    } else {
      filtered = [...mockQuestions, ...questionHistory].filter(
        q => q.petType === selectedPetType
      );
    }
    setHistoryList(filtered);
  };

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
      all: '全部'
    };
    return names[type] || '宠物';
  };

  const handleViewAnswer = (questionId: string) => {
    Taro.navigateTo({
      url: `/pages/answer/index?id=${questionId}`
    });
  };

  const filterOptions = [
    { type: 'all', name: '全部', icon: '🐾' },
    { type: 'cat', name: '猫咪', icon: '🐱' },
    { type: 'dog', name: '狗狗', icon: '🐶' },
    { type: 'rabbit', name: '兔子', icon: '🐰' },
    { type: 'bird', name: '鸟类', icon: '🐦' }
  ];

  return (
    <View className={styles.container}>
      <View className={styles.filterNav}>
        {filterOptions.map(option => (
          <View
            key={option.type}
            className={`${styles.filterItem} ${selectedPetType === option.type ? styles.active : ''}`}
            onClick={() => setSelectedPetType(option.type)}
          >
            <Text className={styles.filterIcon}>{option.icon}</Text>
            <Text className={styles.filterText}>{option.name}</Text>
          </View>
        ))}
      </View>

      {historyList.length === 0 ? (
        <View className={styles.emptyState}>
          <Text className={styles.emptyIcon}>📋</Text>
          <Text className={styles.emptyTitle}>暂无问答记录</Text>
          <Text className={styles.emptyDesc}>
            您还没有提问记录，{'\n'}快去提问吧！
          </Text>
        </View>
      ) : (
        <View className={styles.historyList}>
          {historyList.map(question => (
            <View
              key={question.id}
              className={styles.historyCard}
              onClick={() => handleViewAnswer(question.id)}
            >
              <View className={styles.cardHeader}>
                <View className={styles.petBadge}>
                  <Text className={styles.petIcon}>{getPetEmoji(question.petType)}</Text>
                  <Text className={styles.petType}>{getPetName(question.petType)}</Text>
                </View>
                <Text className={styles.statusBadge}>
                  {question.status === 'answered' ? '已解答' : '待解答'}
                </Text>
              </View>
              <Text className={styles.cardTitle}>{question.title}</Text>
              <Text className={styles.cardContent}>{question.content}</Text>
              <View className={styles.cardFooter}>
                <Text className={styles.cardMeta}>
                  {question.createdAt} · {question.category === 'feeding' ? '💊 喂养' :
                   question.category === 'care' ? '🧹 护理' :
                   question.category === 'behavior' ? '🧠 行为' : '🏥 疾病'}
                </Text>
                <Text className={styles.viewBtn}>查看回答 ›</Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default QuestionHistoryPage;
