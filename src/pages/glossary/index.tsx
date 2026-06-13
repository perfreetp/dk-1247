import React from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import styles from './index.module.scss';
import { mockGlossary } from '@/data/mockKnowledge';

const GlossaryPage: React.FC = () => {
  const glossaryByCategory = mockGlossary.reduce((acc, term) => {
    if (!acc[term.category]) {
      acc[term.category] = [];
    }
    acc[term.category].push(term);
    return acc;
  }, {} as Record<string, typeof mockGlossary>);

  return (
    <ScrollView className={styles.container} scrollY>
      <View className={styles.tip}>
        <Text className={styles.tipIcon}>💡</Text>
        <Text className={styles.tipText}>
          这些术语在宠物养护中经常出现，了解它们能帮助你更好地理解和照顾你的宠物。
        </Text>
      </View>

      {Object.entries(glossaryByCategory).map(([category, terms]) => (
        <View key={category} className={styles.glossaryList}>
          <Text style={{ fontSize: '32rpx', fontWeight: '600', marginBottom: '16rpx', display: 'block' }}>
            📚 {category}
          </Text>
          {terms.map(term => (
            <View key={term.id} className={styles.glossaryItem}>
              <View className={styles.termHeader}>
                <Text className={styles.termName}>{term.term}</Text>
                <Text className={styles.categoryBadge}>{term.category}</Text>
              </View>
              <Text className={styles.termDefinition}>{term.definition}</Text>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

export default GlossaryPage;
