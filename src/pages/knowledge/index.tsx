import React, { useState, useEffect } from 'react';
import { View, Text, Image, Input, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import { mockArticles, mockPitfalls, mockGlossary } from '@/data/mockKnowledge';
import { useAppContext } from '@/store/AppContext';

const KnowledgePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filteredArticles, setFilteredArticles] = useState(mockArticles);
  const [filteredPitfalls, setFilteredPitfalls] = useState(mockPitfalls);
  const [filteredGlossary, setFilteredGlossary] = useState(mockGlossary);
  const [searchResult, setSearchResult] = useState<'articles' | 'pitfalls' | 'glossary' | null>(null);
  const { isCollected, addCollection, removeCollection } = useAppContext();

  useEffect(() => {
    filterContent();
  }, [selectedCategory, searchKeyword]);

  const filterContent = () => {
    const keyword = searchKeyword.toLowerCase().trim();

    if (!keyword) {
      if (selectedCategory === 'all') {
        setFilteredArticles(mockArticles);
        setFilteredPitfalls(mockPitfalls);
        setFilteredGlossary(mockGlossary);
        setSearchResult(null);
      } else {
        const filtered = mockArticles.filter(article => article.category === selectedCategory);
        setFilteredArticles(filtered);
        setFilteredPitfalls([]);
        setFilteredGlossary([]);
        setSearchResult(null);
      }
      return;
    }

    const articles = mockArticles.filter(article =>
      article.title.toLowerCase().includes(keyword) ||
      article.summary.toLowerCase().includes(keyword) ||
      article.tags.some(tag => tag.toLowerCase().includes(keyword))
    );

    const pitfalls = mockPitfalls.filter(pitfall =>
      pitfall.title.toLowerCase().includes(keyword) ||
      pitfall.description.toLowerCase().includes(keyword)
    );

    const glossary = mockGlossary.filter(term =>
      term.term.toLowerCase().includes(keyword) ||
      term.definition.toLowerCase().includes(keyword)
    );

    setFilteredArticles(articles);
    setFilteredPitfalls(pitfalls);
    setFilteredGlossary(glossary);

    if (articles.length > 0) {
      setSearchResult('articles');
    } else if (pitfalls.length > 0) {
      setSearchResult('pitfalls');
    } else if (glossary.length > 0) {
      setSearchResult('glossary');
    } else {
      setSearchResult(null);
    }
  };

  const handleCategoryClick = (type: string) => {
    setSelectedCategory(type);
    setSearchKeyword('');
  };

  const handleArticleClick = (articleId: string) => {
    Taro.navigateTo({
      url: `/pages/knowledge/index?type=article&id=${articleId}`
    });
  };

  const handlePitfallClick = () => {
    Taro.navigateTo({
      url: '/pages/pitfalls/index'
    });
  };

  const handleGlossaryClick = () => {
    Taro.navigateTo({
      url: '/pages/glossary/index'
    });
  };

  const handleToggleCollect = (articleId: string, e: any) => {
    e.stopPropagation();
    if (isCollected(articleId)) {
      removeCollection(articleId);
    } else {
      addCollection(articleId);
    }
  };

  const categories = [
    { type: 'all', name: '全部', icon: '📚' },
    { type: 'feeding', name: '喂养', icon: '🍖' },
    { type: 'care', name: '护理', icon: '🧹' },
    { type: 'behavior', name: '行为', icon: '🧠' },
    { type: 'health', name: '健康', icon: '💊' }
  ];

  const categoryIcon = {
    feeding: '🍖',
    care: '🧹',
    behavior: '🧠',
    health: '💊'
  };

  const showEmptyState = searchKeyword && !searchResult;
  const showNoResults = searchKeyword && filteredArticles.length === 0 && filteredPitfalls.length === 0 && filteredGlossary.length === 0;

  return (
    <View className={styles.container}>
      <View className={styles.searchBar}>
        <Text className={styles.searchIcon}>🔍</Text>
        <Input
          className={styles.searchInput}
          placeholder="搜索文章、术语、避坑..."
          value={searchKeyword}
          onInput={(e) => setSearchKeyword(e.detail.value)}
        />
        {searchKeyword && (
          <View className={styles.clearBtn} onClick={() => setSearchKeyword('')}>
            <Text className={styles.clearIcon}>✕</Text>
          </View>
        )}
      </View>

      {showEmptyState ? (
        <View className={styles.emptyState}>
          <Text className={styles.emptyIcon}>🔍</Text>
          <Text className={styles.emptyTitle}>未找到相关结果</Text>
          <Text className={styles.emptyDesc}>
            没有找到与"'{searchKeyword}'"相关的内容
          </Text>
          <Text className={styles.emptySuggestion}>
            建议：
            {'\n'}• 检查拼写是否正确
            {'\n'}• 尝试使用更简短的关键词
            {'\n'}• 尝试相关的同义词
          </Text>
        </View>
      ) : (
        <>
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

          {searchKeyword && searchResult === 'pitfalls' && filteredPitfalls.length > 0 && (
            <View className={styles.searchResults}>
              <Text className={styles.searchResultsTitle}>
                找到 {filteredPitfalls.length} 条避坑建议
              </Text>
            </View>
          )}

          {searchKeyword && searchResult === 'glossary' && filteredGlossary.length > 0 && (
            <View className={styles.searchResults}>
              <Text className={styles.searchResultsTitle}>
                找到 {filteredGlossary.length} 个相关术语
              </Text>
            </View>
          )}

          {filteredPitfalls.length > 0 && !searchKeyword && (
            <View className={styles.quickActions}>
              <View className={styles.quickActionCard} onClick={handlePitfallClick}>
                <View className={styles.actionIcon} style={{ background: 'rgba(255, 149, 0, 0.1)' }}>
                  ⚠️
                </View>
                <View className={styles.actionContent}>
                  <Text className={styles.actionTitle}>避坑清单</Text>
                  <Text className={styles.actionDesc}>新手必看的 {mockPitfalls.length} 个误区</Text>
                </View>
              </View>
              <View className={styles.quickActionCard} onClick={handleGlossaryClick}>
                <View className={styles.actionIcon} style={{ background: 'rgba(74, 144, 217, 0.1)' }}>
                  📖
                </View>
                <View className={styles.actionContent}>
                  <Text className={styles.actionTitle}>术语解释</Text>
                  <Text className={styles.actionDesc}>{mockGlossary.length} 个专业术语</Text>
                </View>
              </View>
            </View>
          )}

          {filteredGlossary.length > 0 && !searchKeyword && (
            <View className={styles.glossaryPreview}>
              <Text className={styles.sectionTitle}>热门术语</Text>
              {filteredGlossary.slice(0, 3).map(term => (
                <View key={term.id} className={styles.glossaryItem} onClick={handleGlossaryClick}>
                  <Text className={styles.glossaryTerm}>{term.term}</Text>
                  <Text className={styles.glossaryDef}>{term.definition}</Text>
                </View>
              ))}
            </View>
          )}

          {filteredArticles.length > 0 && (
            <View className={styles.articleList}>
              <Text className={styles.sectionTitle}>
                {searchKeyword ? `找到 ${filteredArticles.length} 篇相关文章` : '热门文章'}
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
                      {isCollected(article.id) && <Text className={styles.collectedBadge}>⭐</Text>}
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
                  <View 
                    className={styles.collectBtn}
                    onClick={(e) => handleToggleCollect(article.id, e)}
                  >
                    <Text className={styles.collectIcon}>
                      {isCollected(article.id) ? '❤️' : '🤍'}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default KnowledgePage;
