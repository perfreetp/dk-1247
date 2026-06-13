import React, { useState } from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import { mockArticles, mockPitfalls } from '@/data/mockKnowledge';
import { useAppContext } from '@/store/AppContext';

const CollectionsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'articles' | 'pitfalls'>('articles');
  const { 
    collectionsArticles, collectionsPitfalls,
    removeArticleCollection, removePitfallCollection 
  } = useAppContext();

  const collectedArticles = mockArticles.filter(article => collectionsArticles.includes(article.id));
  const collectedPitfalls = mockPitfalls.filter(pitfall => collectionsPitfalls.includes(pitfall.id));

  const handleArticleClick = (articleId: string) => {
    Taro.navigateTo({
      url: `/pages/article-detail/index?id=${articleId}`
    });
  };

  const handlePitfallClick = () => {
    Taro.navigateTo({
      url: '/pages/pitfalls/index'
    });
  };

  const handleUncollectArticle = (id: string, e: any) => {
    e.stopPropagation();
    removeArticleCollection(id);
  };

  const handleUncollectPitfall = (id: string, e: any) => {
    e.stopPropagation();
    removePitfallCollection(id);
  };

  const categoryIcon = {
    feeding: '🍖',
    care: '🧹',
    behavior: '🧠',
    health: '💊'
  };

  const getSeverityClass = (severity: string) => {
    return severity === 'high' ? styles.severityHigh : 
           severity === 'medium' ? styles.severityMedium : styles.severityLow;
  };

  return (
    <View className={styles.container}>
      <View className={styles.tabBar}>
        <View 
          className={`${styles.tabItem} ${activeTab === 'articles' ? styles.active : ''}`}
          onClick={() => setActiveTab('articles')}
        >
          <Text className={styles.tabIcon}>📚</Text>
          <Text className={styles.tabText}>文章</Text>
          <Text className={styles.tabCount}>{collectedArticles.length}</Text>
        </View>
        <View 
          className={`${styles.tabItem} ${activeTab === 'pitfalls' ? styles.active : ''}`}
          onClick={() => setActiveTab('pitfalls')}
        >
          <Text className={styles.tabIcon}>⚠️</Text>
          <Text className={styles.tabText}>避坑</Text>
          <Text className={styles.tabCount}>{collectedPitfalls.length}</Text>
        </View>
      </View>

      {activeTab === 'articles' ? (
        collectedArticles.length === 0 ? (
          <View className={styles.emptyState}>
            <Text className={styles.emptyIcon}>📚</Text>
            <Text className={styles.emptyTitle}>暂无收藏文章</Text>
            <Text className={styles.emptyDesc}>去知识库收藏喜欢的文章吧</Text>
          </View>
        ) : (
          <ScrollView className={styles.content} scrollY>
            <Text className={styles.sectionTitle}>📚 已收藏 {collectedArticles.length} 篇文章</Text>
            {collectedArticles.map(article => (
              <View
                key={article.id}
                className={styles.articleCard}
                onClick={() => handleArticleClick(article.id)}
              >
                <Image
                  src={article.coverImage}
                  className={styles.articleImage}
                  mode="aspectFill"
                />
                <View className={styles.articleContent}>
                  <Text className={styles.articleTitle}>{article.title}</Text>
                  <Text className={styles.articleSummary}>{article.summary}</Text>
                  <View className={styles.articleFooter}>
                    <View className={styles.articleMeta}>
                      <Text className={styles.tag}>
                        {categoryIcon[article.category as keyof typeof categoryIcon]}
                        {article.tags[0]}
                      </Text>
                      <Text className={styles.readTime}>{article.readTime}分钟阅读</Text>
                    </View>
                    <View 
                      className={styles.uncollectBtn}
                      onClick={(e) => handleUncollectArticle(article.id, e)}
                    >
                      <Text className={styles.uncollectIcon}>❤️</Text>
                      <Text className={styles.uncollectText}>已收藏</Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        )
      ) : (
        collectedPitfalls.length === 0 ? (
          <View className={styles.emptyState}>
            <Text className={styles.emptyIcon}>⚠️</Text>
            <Text className={styles.emptyTitle}>暂无收藏避坑</Text>
            <Text className={styles.emptyDesc}>去知识库收藏避坑建议吧</Text>
          </View>
        ) : (
          <ScrollView className={styles.content} scrollY>
            <Text className={styles.sectionTitle}>⚠️ 已收藏 {collectedPitfalls.length} 条避坑建议</Text>
            {collectedPitfalls.map(pitfall => (
              <View
                key={pitfall.id}
                className={styles.pitfallCard}
                onClick={handlePitfallClick}
              >
                <View className={styles.pitfallHeader}>
                  <View className={`${styles.severityBadge} ${getSeverityClass(pitfall.severity)}`}>
                    {pitfall.severity === 'high' ? '高危' : 
                     pitfall.severity === 'medium' ? '中危' : '低危'}
                  </View>
                  <View 
                    className={styles.uncollectBtn}
                    onClick={(e) => handleUncollectPitfall(pitfall.id, e)}
                  >
                    <Text className={styles.uncollectIcon}>❤️</Text>
                    <Text className={styles.uncollectText}>已收藏</Text>
                  </View>
                </View>
                <Text className={styles.pitfallTitle}>{pitfall.title}</Text>
                <Text className={styles.pitfallDesc}>{pitfall.description}</Text>
                <View className={styles.pitfallPets}>
                  {pitfall.petTypes.map(type => (
                    <Text key={type} className={styles.petBadge}>
                      {type === 'cat' ? '🐱' : type === 'dog' ? '🐶' : type === 'rabbit' ? '🐰' : '🐦'}
                    </Text>
                  ))}
                </View>
              </View>
            ))}
          </ScrollView>
        )
      )}
    </View>
  );
};

export default CollectionsPage;
