import React, { useState, useEffect } from 'react';
import { View, Text, Input, Textarea } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import { useAppContext } from '@/store/AppContext';
import { PetProfile } from '@/types/pet';

const PetProfilePage: React.FC = () => {
  const { addPetProfile, updatePetProfile, petProfiles, deletePetProfile } = useAppContext();
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState<string>('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<string>('');
  const [weight, setWeight] = useState('');
  const [allergies, setAllergies] = useState('');
  const [medications, setMedications] = useState('');
  const [notes, setNotes] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const { id } = Taro.getCurrentInstance().router?.params || {};
    
    if (id) {
      const profile = petProfiles.find(p => p.id === id);
      if (profile) {
        Taro.setNavigationBarTitle({ title: '编辑宠物' });
        setIsEditMode(true);
        setEditingId(id);
        setPetName(profile.pet.name);
        setPetType(profile.pet.type);
        setBreed(profile.pet.breed);
        setAge(profile.pet.age.toString());
        setGender(profile.pet.gender);
        setWeight(profile.weight?.toString() || '');
        setAllergies(profile.allergies?.join('、') || '');
        setMedications(profile.medications?.join('、') || '');
        setNotes(profile.notes || '');
      }
    } else {
      Taro.setNavigationBarTitle({ title: '添加宠物' });
    }
  }, []);

  const petTypes = [
    { type: 'cat', name: '🐱 猫', icon: '🐱' },
    { type: 'dog', name: '🐶 狗', icon: '🐶' },
    { type: 'rabbit', name: '🐰 兔', icon: '🐰' },
    { type: 'bird', name: '🐦 鸟', icon: '🐦' }
  ];

  const generateId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  const handleSave = () => {
    if (!petName.trim()) {
      Taro.showToast({ title: '请输入宠物名字', icon: 'none' });
      return;
    }
    if (!petType) {
      Taro.showToast({ title: '请选择宠物类型', icon: 'none' });
      return;
    }
    if (!gender) {
      Taro.showToast({ title: '请选择性别', icon: 'none' });
      return;
    }

    const profileData: PetProfile = {
      id: isEditMode && editingId ? editingId : generateId(),
      pet: {
        id: isEditMode && editingId ? editingId : generateId(),
        name: petName.trim(),
        type: petType as 'cat' | 'dog' | 'rabbit' | 'bird',
        breed: breed.trim(),
        age: parseFloat(age) || 0,
        gender: gender as 'male' | 'female'
      },
      weight: weight ? parseFloat(weight) : undefined,
      allergies: allergies ? allergies.split('、').filter(Boolean) : [],
      medications: medications ? medications.split('、').filter(Boolean) : [],
      notes: notes.trim()
    };

    if (isEditMode && editingId) {
      updatePetProfile(editingId, profileData);
    } else {
      addPetProfile(profileData);
    }

    setTimeout(() => {
      Taro.navigateBack();
    }, 1500);
  };

  const handleDelete = () => {
    if (!editingId) return;

    Taro.showModal({
      title: '确认删除',
      content: `确定要删除宠物"${petName}"吗？`,
      success: (res) => {
        if (res.confirm) {
          deletePetProfile(editingId);
          setTimeout(() => {
            Taro.navigateBack();
          }, 1500);
        }
      }
    });
  };

  const handleCancel = () => {
    Taro.navigateBack();
  };

  return (
    <View className={styles.container}>
      <View className={styles.formCard}>
        <Text className={styles.sectionTitle}>
          基本信息<Text className={styles.required}>*</Text>
        </Text>

        <View className={styles.inputGroup}>
          <Text className={styles.inputLabel}>宠物名字</Text>
          <Input
            className={styles.inputField}
            placeholder="请输入宠物名字"
            value={petName}
            onInput={(e) => setPetName(e.detail.value)}
          />
        </View>

        <View className={styles.inputGroup}>
          <Text className={styles.inputLabel}>宠物类型<Text className={styles.required}>*</Text></Text>
          <View className={styles.petTypeGrid}>
            {petTypes.map(pet => (
              <View
                key={pet.type}
                className={`${styles.petTypeItem} ${petType === pet.type ? styles.active : ''}`}
                onClick={() => setPetType(pet.type)}
              >
                <Text className={styles.petIcon}>{pet.icon}</Text>
                <Text className={styles.petName}>{pet.name}</Text>
              </View>
            ))}
          </View>
        </View>

        <View className={styles.inputGroup}>
          <Text className={styles.inputLabel}>品种</Text>
          <Input
            className={styles.inputField}
            placeholder="如：英短、泰迪、中华田园猫"
            value={breed}
            onInput={(e) => setBreed(e.detail.value)}
          />
        </View>

        <View className={styles.inputGroup}>
          <Text className={styles.inputLabel}>年龄（岁）</Text>
          <Input
            className={styles.inputField}
            placeholder="请输入年龄"
            type="digit"
            value={age}
            onInput={(e) => setAge(e.detail.value)}
          />
        </View>

        <View className={styles.inputGroup}>
          <Text className={styles.inputLabel}>性别<Text className={styles.required}>*</Text></Text>
          <View className={styles.genderOption}>
            <View
              className={`${styles.genderItem} ${gender === 'male' ? styles.active : ''}`}
              onClick={() => setGender('male')}
            >
              <Text className={styles.genderIcon}>♂️</Text>
              <Text className={styles.genderText}>公</Text>
            </View>
            <View
              className={`${styles.genderItem} ${gender === 'female' ? styles.active : ''}`}
              onClick={() => setGender('female')}
            >
              <Text className={styles.genderIcon}>♀️</Text>
              <Text className={styles.genderText}>母</Text>
            </View>
          </View>
        </View>
      </View>

      <View className={styles.formCard}>
        <Text className={styles.sectionTitle}>健康信息（选填）</Text>

        <View className={styles.inputGroup}>
          <Text className={styles.inputLabel}>体重（kg）</Text>
          <Input
            className={styles.inputField}
            placeholder="请输入体重"
            type="digit"
            value={weight}
            onInput={(e) => setWeight(e.detail.value)}
          />
        </View>

        <View className={styles.inputGroup}>
          <Text className={styles.inputLabel}>过敏史</Text>
          <Textarea
            className={styles.textareaField}
            placeholder="请描述宠物的过敏情况，如：对某些食物或药物过敏，多个过敏源用顿号分隔"
            value={allergies}
            onInput={(e) => setAllergies(e.detail.value)}
            maxlength={200}
          />
        </View>

        <View className={styles.inputGroup}>
          <Text className={styles.inputLabel}>用药情况</Text>
          <Textarea
            className={styles.textareaField}
            placeholder="请描述宠物的用药情况，如：正在服用什么药物，多个药物用顿号分隔"
            value={medications}
            onInput={(e) => setMedications(e.detail.value)}
            maxlength={200}
          />
        </View>

        <View className={styles.inputGroup}>
          <Text className={styles.inputLabel}>备注</Text>
          <Textarea
            className={styles.textareaField}
            placeholder="其他需要记录的信息，如：性格特点、习惯等"
            value={notes}
            onInput={(e) => setNotes(e.detail.value)}
            maxlength={300}
          />
        </View>
      </View>

      {isEditMode && (
        <View className={styles.deleteButton} onClick={handleDelete}>
          删除宠物
        </View>
      )}

      <View className={styles.buttonGroup}>
        <View className={`${styles.button} ${styles.cancelButton}`} onClick={handleCancel}>
          取消
        </View>
        <View className={`${styles.button} ${styles.saveButton}`} onClick={handleSave}>
          保存
        </View>
      </View>
    </View>
  );
};

export default PetProfilePage;
