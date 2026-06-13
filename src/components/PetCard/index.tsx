import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';

interface PetCardProps {
  type: 'cat' | 'dog' | 'rabbit' | 'bird';
  name: string;
  count: number;
  onClick?: () => void;
}

const petConfig = {
  cat: {
    emoji: '🐱',
    color: '#FF8C42',
    description: '猫咪养护'
  },
  dog: {
    emoji: '🐶',
    color: '#4A90D9',
    description: '狗狗养护'
  },
  rabbit: {
    emoji: '🐰',
    color: '#FFB6C1',
    description: '兔子养护'
  },
  bird: {
    emoji: '🐦',
    color: '#98D8AA',
    description: '鸟类养护'
  }
};

const PetCard: React.FC<PetCardProps> = ({ type, name, count, onClick }) => {
  const config = petConfig[type];

  return (
    <View className={styles.petCard} onClick={onClick}>
      <View className={styles.iconWrapper} style={{ backgroundColor: config.color }}>
        <Text className={styles.emoji}>{config.emoji}</Text>
      </View>
      <View className={styles.info}>
        <Text className={styles.name}>{name}</Text>
        <Text className={styles.desc}>{config.description}</Text>
      </View>
      <View className={styles.badge}>
        <Text className={styles.badgeText}>{count}篇</Text>
      </View>
    </View>
  );
};

export default PetCard;
