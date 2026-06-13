import React from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import { mockArticles } from '@/data/mockKnowledge';
import { useAppContext } from '@/store/AppContext';

const CollectionsPage: React.FC = () => {
  const { collections, removeCollection } = useAppContext();

  const collectedArticles = mockArticles.filter(article => collections.includes(article.id));

  const handleArticleClick = (articleId: string) => {
    Taro.navigateTo({
      url: `/pages/knowledge/index?type=article&id=${articleId}`
    });
  };

  const handleUncollect = (id: string, e: any) => {
    e.stopPropagation();
    removeCollection(id);
  };

  const categoryIcon = {
    feeding: '🍖',
    care: '🧹',
    behavior: '🧠',
    health: '💊'
  };

  return (
    <ScrollView className={styles.container} scrollY>
      {collectedArticles.length === 0 ? (
        <View className={styles.emptyState}>
          <Text className={styles.emptyIcon}>⭐</Text>
          <Text className={styles.emptyTitle}>暂无收藏</Text>
          <Text className={styles.emptyDesc}>
            快去收藏喜欢的文章吧！
          </Text>
        </View>
      ) : (
        <View className={styles.collectionList}>
          <Text style={{ fontSize: '32rpx', fontWeight: '600', marginBottom: '16rpx', display: 'block' }}>
            📚 已收藏 {collectedArticles.length} 篇文章
          </Text>
          {collectedArticles.map(article => (
            <View
              key={article.id}
              className={styles.collectionCard}
              onClick={() => handleArticleClick(article.id)}
            >
              <Image
                src={article.coverImage}
                className={styles.collectionImage}
                mode="aspectFill"
              />
              <View className={styles.collectionContent}>
                <Text className={styles.collectionTitle}>{article.title}</Text>
                <Text className={styles.collectionSummary}>{article.summary}</Text>
                <View className={styles.collectionFooter}>
                  <View className={styles.collectionMeta}>
                    <Text className={styles.tag}>
                      {categoryIcon[article.category as keyof typeof categoryIcon]}
                      {article.tags[0]}
                    </Text>
                    <Text className={styles.readTime}>{article.readTime}分钟阅读</Text>
                  </View>
                  <View
                    className={styles.uncollectBtn}
                    onClick={(e) => handleUncollect(article.id, e)}
                  >
                    取消收藏
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default CollectionsPage;
