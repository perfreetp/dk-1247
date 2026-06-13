import React, { useState } from 'react';
import { View, Text, Image, Input } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import { mockArticles } from '@/data/mockKnowledge';

const KnowledgePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchKeyword, setSearchKeyword] = useState('');

  const categories = [
    { type: 'all', name: '全部', icon: '📚' },
    { type: 'feeding', name: '喂养', icon: '🍖' },
    { type: 'care', name: '护理', icon: '🧹' },
    { type: 'behavior', name: '行为', icon: '🧠' },
    { type: 'health', name: '健康', icon: '💊' }
  ];

  const handleCategoryClick = (type: string) => {
    setSelectedCategory(type);
  };

  const handleArticleClick = (articleId: string) => {
    Taro.showToast({
      title: '文章详情页开发中',
      icon: 'none'
    });
  };

  const handleQuickAction = (action: string) => {
    if (action === 'pitfall') {
      Taro.showToast({
        title: '避坑清单开发中',
        icon: 'none'
      });
    } else if (action === 'glossary') {
      Taro.showToast({
        title: '术语解释开发中',
        icon: 'none'
      });
    }
  };

  const filteredArticles = selectedCategory === 'all'
    ? mockArticles
    : mockArticles.filter(article => article.category === selectedCategory);

  const categoryIcon = {
    feeding: '🍖',
    care: '🧹',
    behavior: '🧠',
    health: '💊'
  };

  return (
    <View className={styles.container}>
      <View className={styles.searchBar}>
        <Text className={styles.searchIcon}>🔍</Text>
        <Input
          className={styles.searchInput}
          placeholder="搜索文章、术语..."
          value={searchKeyword}
          onInput={(e) => setSearchKeyword(e.detail.value)}
        />
      </View>

      <View className={styles.categoryNav}>
        {categories.map(cat => (
          <View
            key={cat.type}
            className={`${styles.categoryItem} ${selectedCategory === cat.type ? styles.active : ''}`}
            onClick={() => handleCategoryClick(cat.type)}
          >
            <Text className={styles.categoryIcon}>{cat.icon}</Text>
            <Text className={styles.categoryText}>{cat.name}</Text>
          </View>
        ))}
      </View>

      <View className={styles.quickActions}>
        <View
          className={styles.quickActionCard}
          onClick={() => handleQuickAction('pitfall')}
        >
          <View className={styles.actionIcon} style={{ background: 'rgba(255, 149, 0, 0.1)' }}>
            ⚠️
          </View>
          <View className={styles.actionContent}>
            <Text className={styles.actionTitle}>避坑清单</Text>
            <Text className={styles.actionDesc}>新手必看的误区</Text>
          </View>
        </View>
        <View
          className={styles.quickActionCard}
          onClick={() => handleQuickAction('glossary')}
        >
          <View className={styles.actionIcon} style={{ background: 'rgba(74, 144, 217, 0.1)' }}>
            📖
          </View>
          <View className={styles.actionContent}>
            <Text className={styles.actionTitle}>术语解释</Text>
            <Text className={styles.actionDesc}>养宠专业术语</Text>
          </View>
        </View>
      </View>

      <View className={styles.articleList}>
        <Text className={styles.sectionTitle}>
          {selectedCategory === 'all' ? '热门文章' : categories.find(c => c.type === selectedCategory)?.name + '文章'}
        </Text>
        {filteredArticles.map(article => (
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
              <Text className={styles.articleTitle}>
                {article.title}
                {article.isHot && <Text className={styles.hotBadge}>热</Text>}
              </Text>
              <Text className={styles.articleSummary}>{article.summary}</Text>
              <View className={styles.articleMeta}>
                <Text className={styles.tag}>
                  {categoryIcon[article.category as keyof typeof categoryIcon]}
                  {article.tags[0]}
                </Text>
                <Text className={styles.readTime}>{article.readTime}分钟阅读</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default KnowledgePage;
