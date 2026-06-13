import React from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import { mockPitfalls } from '@/data/mockKnowledge';

const PitfallsPage: React.FC = () => {
  const getSeverityLabel = (severity: string) => {
    const labels: Record<string, string> = {
      high: '高危',
      medium: '中危',
      low: '低危'
    };
    return labels[severity] || severity;
  };

  const getPetEmoji = (type: string) => {
    const emojis: Record<string, string> = {
      cat: '🐱',
      dog: '🐶',
      rabbit: '🐰',
      bird: '🐦'
    };
    return emojis[type] || '🐾';
  };

  const highPitfalls = mockPitfalls.filter(p => p.severity === 'high');
  const mediumPitfalls = mockPitfalls.filter(p => p.severity === 'medium');
  const lowPitfalls = mockPitfalls.filter(p => p.severity === 'low');

  return (
    <ScrollView className={styles.container} scrollY>
      <View className={styles.warningBanner}>
        <View className={styles.bannerIcon}>
          ⚠️
        </View>
        <View className={styles.bannerContent}>
          <Text className={styles.bannerTitle}>新手必看避坑指南</Text>
          <Text className={styles.bannerDesc}>
            这些养宠误区可能导致宠物健康问题，务必避免！
          </Text>
        </View>
      </View>

      {highPitfalls.length > 0 && (
        <>
          <Text style={{ fontSize: '32rpx', fontWeight: '600', marginBottom: '16rpx', display: 'block' }}>
            🔴 高危误区（务必避免）
          </Text>
          {highPitfalls.map(pitfall => (
            <View key={pitfall.id} className={`${styles.pitfallCard} ${styles.high}`}>
              <View className={styles.cardHeader}>
                <Text className={styles.severityTag}>{getSeverityLabel(pitfall.severity)}</Text>
                <View className={styles.petTypes}>
                  {pitfall.petTypes.map(type => (
                    <Text key={type} className={styles.petBadge}>
                      {getPetEmoji(type)}
                    </Text>
                  ))}
                </View>
              </View>
              <Text className={styles.cardTitle}>{pitfall.title}</Text>
              <Text className={styles.cardDesc}>{pitfall.description}</Text>
            </View>
          ))}
        </>
      )}

      {mediumPitfalls.length > 0 && (
        <>
          <Text style={{ fontSize: '32rpx', fontWeight: '600', marginTop: '32rpx', marginBottom: '16rpx', display: 'block' }}>
            🟠 中危误区（需要注意）
          </Text>
          {mediumPitfalls.map(pitfall => (
            <View key={pitfall.id} className={`${styles.pitfallCard} ${styles.medium}`}>
              <View className={styles.cardHeader}>
                <Text className={styles.severityTag}>{getSeverityLabel(pitfall.severity)}</Text>
                <View className={styles.petTypes}>
                  {pitfall.petTypes.map(type => (
                    <Text key={type} className={styles.petBadge}>
                      {getPetEmoji(type)}
                    </Text>
                  ))}
                </View>
              </View>
              <Text className={styles.cardTitle}>{pitfall.title}</Text>
              <Text className={styles.cardDesc}>{pitfall.description}</Text>
            </View>
          ))}
        </>
      )}

      {lowPitfalls.length > 0 && (
        <>
          <Text style={{ fontSize: '32rpx', fontWeight: '600', marginTop: '32rpx', marginBottom: '16rpx', display: 'block' }}>
            🔵 低危误区（建议了解）
          </Text>
          {lowPitfalls.map(pitfall => (
            <View key={pitfall.id} className={`${styles.pitfallCard} ${styles.low}`}>
              <View className={styles.cardHeader}>
                <Text className={styles.severityTag}>{getSeverityLabel(pitfall.severity)}</Text>
                <View className={styles.petTypes}>
                  {pitfall.petTypes.map(type => (
                    <Text key={type} className={styles.petBadge}>
                      {getPetEmoji(type)}
                    </Text>
                  ))}
                </View>
              </View>
              <Text className={styles.cardTitle}>{pitfall.title}</Text>
              <Text className={styles.cardDesc}>{pitfall.description}</Text>
            </View>
          ))}
        </>
      )}
    </ScrollView>
  );
};

export default PitfallsPage;
