import React from 'react';
import { View, Text } from '@tarojs/components';
import styles from './index.module.scss';

interface DailyTipCardProps {
  content: string;
  date: string;
}

const DailyTipCard: React.FC<DailyTipCardProps> = ({ content, date }) => {
  return (
    <View className={styles.tipCard}>
      <View className={styles.header}>
        <View className={styles.icon}>
          <Text className={styles.iconText}>💡</Text>
        </View>
        <Text className={styles.label}>每日养护小知识</Text>
        <Text className={styles.date}>{date}</Text>
      </View>
      <Text className={styles.content}>{content}</Text>
    </View>
  );
};

export default DailyTipCard;
