import React, { useState } from 'react';
import { View, Text, Textarea, Input, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import { useAppContext } from '@/store/AppContext';
import { Question } from '@/types/question';

const AskPage: React.FC = () => {
  const [selectedPetType, setSelectedPetType] = useState<string>('');
  const [symptoms, setSymptoms] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [diet, setDiet] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const { addQuestion } = useAppContext();

  const petTypes = [
    { type: 'cat', name: '🐱 猫', icon: '🐱' },
    { type: 'dog', name: '🐶 狗', icon: '🐶' },
    { type: 'rabbit', name: '🐰 兔', icon: '🐰' },
    { type: 'bird', name: '🐦 鸟', icon: '🐦' }
  ];

  const handleUploadImage = () => {
    Taro.chooseImage({
      count: 3 - images.length,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        setImages([...images, ...res.tempFilePaths]);
      },
      fail: () => {
        Taro.showToast({
          title: '上传失败',
          icon: 'none'
        });
      }
    });
  };

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  const handleSubmit = () => {
    if (!selectedPetType) {
      Taro.showToast({ title: '请选择宠物类型', icon: 'none' });
      return;
    }
    if (!symptoms.trim()) {
      Taro.showToast({ title: '请描述症状', icon: 'none' });
      return;
    }

    const newQuestion: Question = {
      id: Date.now().toString(),
      title: `宠物健康问题咨询（${petTypes.find(p => p.type === selectedPetType)?.name}）`,
      content: symptoms,
      petType: selectedPetType as 'cat' | 'dog' | 'rabbit' | 'bird',
      category: 'health',
      petInfo: {
        breed: breed,
        age: parseFloat(age) || 0,
        diet: diet
      },
      images: images,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'answered'
    };

    addQuestion(newQuestion);

    Taro.navigateTo({
      url: `/pages/answer/index?id=${newQuestion.id}&petType=${selectedPetType}&symptoms=${encodeURIComponent(symptoms)}&breed=${encodeURIComponent(breed)}&age=${encodeURIComponent(age)}&diet=${encodeURIComponent(diet)}`
    });
  };

  return (
    <View className={styles.container}>
      <View className={styles.formCard}>
        <Text className={styles.sectionTitle}>
          宠物类型<Text className={styles.required}>*</Text>
        </Text>
        <View className={styles.petTypeGrid}>
          {petTypes.map(pet => (
            <View
              key={pet.type}
              className={`${styles.petTypeItem} ${selectedPetType === pet.type ? styles.active : ''}`}
              onClick={() => setSelectedPetType(pet.type)}
            >
              <Text className={styles.petIcon}>{pet.icon}</Text>
              <Text className={styles.petName}>{pet.name}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className={styles.formCard}>
        <Text className={styles.sectionTitle}>
          症状描述<Text className={styles.required}>*</Text>
        </Text>
        <Textarea
          className={styles.input}
          placeholder="请详细描述宠物的症状，如：精神状态、食欲情况、排泄情况等"
          value={symptoms}
          onInput={(e) => setSymptoms(e.detail.value)}
          maxlength={500}
        />
      </View>

      <View className={styles.formCard}>
        <Text className={styles.sectionTitle}>宠物信息</Text>
        <View className={styles.inputRow}>
          <View className={styles.inputHalf}>
            <Text className={styles.inputLabel}>品种</Text>
            <Input
              className={styles.inputField}
              placeholder="如：英短、泰迪"
              value={breed}
              onInput={(e) => setBreed(e.detail.value)}
            />
          </View>
          <View className={styles.inputHalf}>
            <Text className={styles.inputLabel}>年龄</Text>
            <Input
              className={styles.inputField}
              placeholder="如：2岁"
              value={age}
              onInput={(e) => setAge(e.detail.value)}
            />
          </View>
        </View>
      </View>

      <View className={styles.formCard}>
        <Text className={styles.sectionTitle}>饮食情况</Text>
        <Textarea
          className={styles.input}
          style={{ minHeight: '120rpx' }}
          placeholder="描述宠物的日常饮食习惯，如：喂食频率、食物种类等"
          value={diet}
          onInput={(e) => setDiet(e.detail.value)}
          maxlength={300}
        />
      </View>

      <View className={styles.formCard}>
        <Text className={styles.sectionTitle}>补充图片</Text>
        <View className={styles.uploadSection}>
          {images.map((img, index) => (
            <View key={index} className={styles.imagePreview}>
              <Image src={img} className={styles.previewImage} mode="aspectFill" />
              <View
                className={styles.removeBtn}
                onClick={() => handleRemoveImage(index)}
              >
                ✕
              </View>
            </View>
          ))}
          {images.length < 3 && (
            <View className={styles.uploadButton} onClick={handleUploadImage}>
              <Text className={styles.uploadIcon}>+</Text>
            </View>
          )}
        </View>
      </View>

      <View className={styles.tip}>
        <Text className={styles.tipIcon}>💡</Text>
        <Text className={styles.tipText}>
          温馨提示：描述越详细，得到的回答越准确。建议包括：症状持续时间、是否用过药物、近期饮食变化等信息。
        </Text>
      </View>

      <View className={styles.submitButton} onClick={handleSubmit}>
        提交问题
      </View>
    </View>
  );
};

export default AskPage;
