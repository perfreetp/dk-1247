import React from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import { mockEmergencySignals } from '@/data/mockEmergency';

const EmergencyPage: React.FC = () => {
  const handleCall = () => {
    Taro.makePhoneCall({
      phoneNumber: '123456789'
    });
  };

  const handleOnlineConsult = () => {
    Taro.showToast({
      title: '正在连接在线兽医',
      icon: 'none'
    });
  };

  const getUrgencyLabel = (urgency: string) => {
    const labels: Record<string, string> = {
      critical: '危急',
      urgent: '紧急',
      serious: '严重'
    };
    return labels[urgency] || urgency;
  };

  const getPetTypeNames = (types: string[]) => {
    const names: Record<string, string> = {
      cat: '猫',
      dog: '狗',
      rabbit: '兔',
      bird: '鸟'
    };
    return types.map(t => names[t] || t).join('、');
  };

  const criticalSignals = mockEmergencySignals.filter(s => s.urgency === 'critical');
  const urgentSignals = mockEmergencySignals.filter(s => s.urgency === 'urgent');
  const seriousSignals = mockEmergencySignals.filter(s => s.urgency === 'serious');

  return (
    <View className={styles.container}>
      <View className={styles.warningBanner}>
        <View className={styles.warningIcon}>
          <Text className={styles.iconText}>🚨</Text>
        </View>
        <View className={styles.warningContent}>
          <Text className={styles.warningTitle}>紧急情况识别指南</Text>
          <Text className={styles.warningDesc}>
            当宠物出现以下情况时，请立即就医！时间就是生命，不要犹豫！
          </Text>
        </View>
      </View>

      {criticalSignals.length > 0 && (
        <View className={styles.emergencyList}>
          <Text className={styles.sectionTitle}>
            🔴 危急情况
            <Text className={styles.count}>(需立即就医)</Text>
          </Text>
          {criticalSignals.map(signal => (
            <View key={signal.id} className={`${styles.emergencyCard} ${styles.critical}`}>
              <View className={styles.cardHeader}>
                <Text className={styles.urgencyTag}>{getUrgencyLabel(signal.urgency)}</Text>
                <Text className={styles.petTypes}>{getPetTypeNames(signal.petTypes)}</Text>
              </View>
              <Text className={styles.cardTitle}>{signal.title}</Text>
              <Text className={styles.cardDesc}>{signal.description}</Text>
              <View className={styles.symptoms}>
                {signal.symptoms.map((symptom, index) => (
                  <Text key={index} className={styles.symptomTag}>{symptom}</Text>
                ))}
              </View>
            </View>
          ))}
        </View>
      )}

      {urgentSignals.length > 0 && (
        <View className={styles.emergencyList}>
          <Text className={styles.sectionTitle}>
            🟠 紧急情况
            <Text className={styles.count}>(需尽快就医)</Text>
          </Text>
          {urgentSignals.map(signal => (
            <View key={signal.id} className={`${styles.emergencyCard} ${styles.urgent}`}>
              <View className={styles.cardHeader}>
                <Text className={styles.urgencyTag}>{getUrgencyLabel(signal.urgency)}</Text>
                <Text className={styles.petTypes}>{getPetTypeNames(signal.petTypes)}</Text>
              </View>
              <Text className={styles.cardTitle}>{signal.title}</Text>
              <Text className={styles.cardDesc}>{signal.description}</Text>
              <View className={styles.symptoms}>
                {signal.symptoms.map((symptom, index) => (
                  <Text key={index} className={styles.symptomTag}>{symptom}</Text>
                ))}
              </View>
            </View>
          ))}
        </View>
      )}

      {seriousSignals.length > 0 && (
        <View className={styles.emergencyList}>
          <Text className={styles.sectionTitle}>
            🔵 严重情况
            <Text className={styles.count}>(建议当日就医)</Text>
          </Text>
          {seriousSignals.map(signal => (
            <View key={signal.id} className={`${styles.emergencyCard} ${styles.serious}`}>
              <View className={styles.cardHeader}>
                <Text className={styles.urgencyTag}>{getUrgencyLabel(signal.urgency)}</Text>
                <Text className={styles.petTypes}>{getPetTypeNames(signal.petTypes)}</Text>
              </View>
              <Text className={styles.cardTitle}>{signal.title}</Text>
              <Text className={styles.cardDesc}>{signal.description}</Text>
              <View className={styles.symptoms}>
                {signal.symptoms.map((symptom, index) => (
                  <Text key={index} className={styles.symptomTag}>{symptom}</Text>
                ))}
              </View>
            </View>
          ))}
        </View>
      )}

      <View className={styles.contactSection}>
        <Text className={styles.sectionTitle}>紧急联系方式</Text>
        <View className={styles.contactList}>
          <View className={styles.contactItem} onClick={handleCall}>
            <View className={styles.contactIcon}>📞</View>
            <View className={styles.contactContent}>
              <Text className={styles.contactName}>紧急热线</Text>
              <Text className={styles.contactDesc}>24小时在线</Text>
            </View>
          </View>
          <View className={styles.contactItem} onClick={handleOnlineConsult}>
            <View className={styles.contactIcon}>💬</View>
            <View className={styles.contactContent}>
              <Text className={styles.contactName}>在线问诊</Text>
              <Text className={styles.contactDesc}>快速响应</Text>
            </View>
          </View>
        </View>
      </View>

      <View className={styles.tip}>
        <Text className={styles.tipIcon}>💡</Text>
        <Text className={styles.tipText}>
          温馨提示：在等待就医的过程中，保持冷静，记录宠物的症状和变化，告知兽医宠物的详细情况。切勿自行给宠物喂药，除非有专业兽医指导。
        </Text>
      </View>
    </View>
  );
};

export default EmergencyPage;
