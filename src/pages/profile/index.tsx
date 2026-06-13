import React, { useEffect } from 'react';
import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import { useAppContext } from '@/store/AppContext';
import { mockQuestions } from '@/data/mockQuestions';

const ProfilePage: React.FC = () => {
  const { 
    petProfiles, 
    collectionsArticles, 
    collectionsPitfalls, 
    questionHistory,
    refreshData 
  } = useAppContext();

  useEffect(() => {
    refreshData();
  }, []);

  const questionCount = mockQuestions.length + questionHistory.length;
  const answerCount = mockQuestions.filter(q => q.status === 'answered').length + 
                      questionHistory.filter(q => q.status === 'answered').length;
  const collectionCount = collectionsArticles.length + collectionsPitfalls.length;

  const handleAddPet = () => {
    Taro.navigateTo({
      url: '/pages/pet-profile/index'
    });
  };

  const handleEditPet = (petId: string) => {
    Taro.navigateTo({
      url: `/pages/pet-profile/index?id=${petId}`
    });
  };

  const handleHistoryClick = () => {
    Taro.navigateTo({
      url: '/pages/question-history/index'
    });
  };

  const handleCollectionsClick = () => {
    Taro.navigateTo({
      url: '/pages/collections/index'
    });
  };

  const handleSettingsClick = () => {
    Taro.showToast({
      title: '设置页开发中',
      icon: 'none'
    });
  };

  const handleHelpClick = () => {
    Taro.showToast({
      title: '帮助中心开发中',
      icon: 'none'
    });
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

  return (
    <View className={styles.container}>
      <View className={styles.profileHeader}>
        <View className={styles.userInfo}>
          <View className={styles.avatar}>👤</View>
          <View className={styles.userDetail}>
            <Text className={styles.userName}>宠物主人</Text>
            <Text className={styles.userDesc}>新手养宠，关爱每一天</Text>
          </View>
        </View>
        <View className={styles.stats}>
          <View className={styles.statItem}>
            <Text className={styles.statValue}>{petProfiles.length}</Text>
            <Text className={styles.statLabel}>宠物</Text>
          </View>
          <View className={styles.statDivider} />
          <View className={styles.statItem}>
            <Text className={styles.statValue}>{questionCount}</Text>
            <Text className={styles.statLabel}>提问</Text>
          </View>
          <View className={styles.statDivider} />
          <View className={styles.statItem}>
            <Text className={styles.statValue}>{answerCount}</Text>
            <Text className={styles.statLabel}>已解答</Text>
          </View>
          <View className={styles.statDivider} />
          <View className={styles.statItem}>
            <Text className={styles.statValue}>{collectionCount}</Text>
            <Text className={styles.statLabel}>收藏</Text>
          </View>
        </View>
      </View>

      <View className={styles.section}>
        <Text className={styles.sectionTitle}>
          我的宠物
          <Text className={styles.moreLink} onClick={handleAddPet}>+ 添加</Text>
        </Text>
        <View className={styles.petList}>
          {petProfiles.length === 0 ? (
            <View className={styles.emptyPets}>
              <Text className={styles.emptyText}>还没有添加宠物</Text>
              <Text className={styles.addFirstBtn} onClick={handleAddPet}>
                + 添加第一个宠物
              </Text>
            </View>
          ) : (
            <>
              {petProfiles.map(profile => (
                <View
                  key={profile.id}
                  className={styles.petItem}
                  onClick={() => handleEditPet(profile.id)}
                >
                  {profile.pet.avatar ? (
                    <Image
                      src={profile.pet.avatar}
                      className={styles.petAvatar}
                      mode="aspectFill"
                    />
                  ) : (
                    <View className={styles.petAvatar}>
                      <Text style={{ fontSize: '48rpx' }}>{getPetEmoji(profile.pet.type)}</Text>
                    </View>
                  )}
                  <View className={styles.petInfo}>
                    <Text className={styles.petName}>{profile.pet.name}</Text>
                    <Text className={styles.petBreed}>{profile.pet.breed || '未知品种'}</Text>
                    <Text className={styles.petMeta}>
                      {profile.pet.age}岁 · {profile.pet.gender === 'male' ? '公' : '母'}
                    </Text>
                  </View>
                  <View className={styles.editBtn}>编辑</View>
                </View>
              ))}
              <View className={styles.addPetBtn} onClick={handleAddPet}>
                <Text className={styles.addIcon}>+</Text>
                <Text>添加新宠物</Text>
              </View>
            </>
          )}
        </View>
      </View>

      <View className={styles.section}>
        <Text className={styles.sectionTitle}>我的记录</Text>
        <View className={styles.menuList}>
          <View className={styles.menuItem} onClick={handleHistoryClick}>
            <View className={styles.menuIcon} style={{ background: 'rgba(74, 144, 217, 0.1)' }}>📋</View>
            <View className={styles.menuContent}>
              <Text className={styles.menuTitle}>问答历史</Text>
              <Text className={styles.menuDesc}>查看我的提问和回答 · 可按宠物筛选</Text>
            </View>
            <Text className={styles.arrowIcon}>›</Text>
          </View>
          <View className={styles.menuItem} onClick={handleCollectionsClick}>
            <View className={styles.menuIcon} style={{ background: 'rgba(255, 193, 7, 0.1)' }}>⭐</View>
            <View className={styles.menuContent}>
              <Text className={styles.menuTitle}>我的收藏</Text>
              <Text className={styles.menuDesc}>
                收藏的文章和知识 · {collectionsArticles.length}篇文章 · {collectionsPitfalls.length}条避坑
              </Text>
            </View>
            <Text className={styles.arrowIcon}>›</Text>
          </View>
        </View>
      </View>

      <View className={styles.section}>
        <View className={styles.menuList}>
          <View className={styles.menuItem} onClick={handleSettingsClick}>
            <View className={styles.menuIcon}>⚙️</View>
            <View className={styles.menuContent}>
              <Text className={styles.menuTitle}>设置</Text>
              <Text className={styles.menuDesc}>账号和偏好设置</Text>
            </View>
            <Text className={styles.arrowIcon}>›</Text>
          </View>
          <View className={styles.menuItem} onClick={handleHelpClick}>
            <View className={styles.menuIcon}>❓</View>
            <View className={styles.menuContent}>
              <Text className={styles.menuTitle}>帮助与反馈</Text>
              <Text className={styles.menuDesc}>常见问题和建议</Text>
            </View>
            <Text className={styles.arrowIcon}>›</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfilePage;
