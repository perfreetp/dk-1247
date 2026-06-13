import React from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';

interface FavoriteButtonProps {
  isCollected: boolean;
  onToggle: () => void;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ isCollected, onToggle }) => {
  const handleClick = (e: any) => {
    e.stopPropagation();
    onToggle();
  };

  return (
    <View className={styles.favoriteBtn} onClick={handleClick}>
      <Text className={styles.icon}>{isCollected ? '❤️' : '🤍'}</Text>
    </View>
  );
};

export default FavoriteButton;
