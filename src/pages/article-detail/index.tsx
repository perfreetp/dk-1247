import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/taro';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import { mockArticles } from '@/data/mockKnowledge';
import { useAppContext } from '@/store/AppContext';

const ArticleDetailPage: React.FC = () => {
  const [article, setArticle] = useState<any>(null);
  const { isArticleCollected, addArticleCollection, removeArticleCollection } = useAppContext();

  useEffect(() => {
    const { id } = Taro.getCurrentInstance().router?.params || {};
    if (id) {
      const foundArticle = mockArticles.find(a => a.id === id);
      if (foundArticle) {
        setArticle(foundArticle);
        Taro.setNavigationBarTitle({ title: foundArticle.title });
      }
    }
  }, []);

  const handleBack = () => {
    Taro.navigateBack();
  };

  const handleToggleCollect = () => {
    if (!article) return;
    
    if (isArticleCollected(article.id)) {
      removeArticleCollection(article.id);
    } else {
      addArticleCollection(article.id);
    }
    setArticle({ ...article });
  };

  const handleShare = () => {
    Taro.showShareMenu();
    Taro.showToast({
      title: '分享功能开发中',
      icon: 'none'
    });
  };

  if (!article) {
    return (
      <View className={styles.container}>
        <View style={{ padding: '100rpx', textAlign: 'center' }}>
          <Text>加载中...</Text>
        </View>
      </View>
    );
  }

  const categoryIcon = {
    feeding: '🍖',
    care: '🧹',
    behavior: '🧠',
    health: '💊'
  };

  return (
    <View className={styles.container}>
      <ScrollView scrollY style={{ height: '100vh' }}>
        <View className={styles.header}>
          <Image
            src={article.coverImage}
            className={styles.coverImage}
            mode="aspectFill"
          />
          <View className={styles.backOverlay}>
            <View className={styles.backBtn} onClick={handleBack}>‹</View>
          </View>
        </View>

        <View className={styles.content}>
          <Text className={styles.title}>{article.title}</Text>
          <View className={styles.meta}>
            <Text className={styles.tag}>
              {categoryIcon[article.category as keyof typeof categoryIcon]}
              {article.tags[0]}
            </Text>
            <Text className={styles.readTime}>{article.readTime}分钟阅读</Text>
          </View>
          <View className={styles.articleContent}>
            <Text style={{ display: 'block', marginBottom: '24rpx', lineHeight: '1.8', textIndent: '2em' }}>
              {article.content || article.summary}
            </Text>
            <Text style={{ display: 'block', marginBottom: '24rpx', lineHeight: '1.8', textIndent: '2em' }}>
              这篇文章为您详细介绍了{article.title}的相关知识。通过阅读本文，您可以了解到：
            </Text>
            <Text style={{ display: 'block', marginBottom: '24rpx', lineHeight: '1.8' }}>
              1. 基础知识：了解核心概念和原理{'\n'}
              2. 实用技巧：掌握正确的操作方法{'\n'}
              3. 常见问题：避免容易犯的错误{'\n'}
              4. 专家建议：听听专业人士怎么说
            </Text>
            <Text style={{ display: 'block', marginBottom: '24rpx', lineHeight: '1.8', textIndent: '2em' }}>
              希望这篇文章对您有所帮助。如果您还有其他问题，欢迎继续向我们提问！
            </Text>
          </View>
        </View>

        <View className={styles.spacer} />
      </ScrollView>

      <View className={styles.footer}>
        <View className={styles.collectBtn} onClick={handleToggleCollect}>
          <Text className={styles.collectIcon}>
            {isArticleCollected(article.id) ? '❤️' : '🤍'}
          </Text>
          <Text className={styles.collectText}>
            {isArticleCollected(article.id) ? '已收藏' : '收藏'}
          </Text>
        </View>
        <View className={styles.shareBtn} onClick={handleShare}>
          <Text className={styles.shareIcon}>📤</Text>
          <Text className={styles.shareText}>分享</Text>
        </View>
      </View>
    </View>
  );
};

export default ArticleDetailPage;
