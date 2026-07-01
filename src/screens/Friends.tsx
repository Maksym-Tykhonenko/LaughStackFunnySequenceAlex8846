import React from 'react';
import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors, radius, spacing} from '../theme/colors';

const HOW_IT_WORKS = [
  {
    icon: '🎴',
    title: 'Get a Phrase',
    body: 'Each member draws a random funny phrase card',
  },
  {
    icon: '⏱️',
    title: 'Joke Time',
    body: 'Create jokes using the phrase before the timer ends',
  },
  {
    icon: '🗳️',
    title: 'Vote & Rate',
    body: 'Other members vote on how hilarious the performance was',
  },
];

type FriendsScreenProps = {
  onStartGame: () => void;
};

export function FriendsScreen({
  onStartGame,
}: FriendsScreenProps): React.JSX.Element {
  const insets = useSafeAreaInsets();

  return (
    <ImageBackground
      source={require('../assets/homebackground.png')}
      style={styles.root}
      resizeMode="cover">
      <ScrollView
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: insets.top + spacing.l,
            paddingBottom: insets.bottom + 100,
          },
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Party 🎊</Text>
          <Text style={styles.subtitle}>The ultimate joke challenge</Text>
        </View>

        <LinearGradient
          colors={['#FF4757', '#A855F7', '#4DA6FF']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.hero}>
          <View style={styles.heroInner}>
            <Text style={styles.heroEmoji}>🎤</Text>
            <Text style={styles.heroTitle}>Friend Joke Challenge</Text>
            <Text style={styles.heroBody}>
              Each member gets a funny phrase and must improvise jokes with it.
              Others vote on how well they nailed it!
            </Text>
            <Pressable onPress={onStartGame} style={styles.heroBtn}>
              <View style={styles.heroBtnInner}>
                <Text style={styles.heroBtnLabel}>Start Game 🚀</Text>
              </View>
            </Pressable>
          </View>
        </LinearGradient>

        <Text style={styles.sectionLabel}>How It Works</Text>
        {HOW_IT_WORKS.map(item => (
          <View key={item.title} style={styles.howRow}>
            <View style={styles.howIcon}>
              <Text style={styles.howIconText}>{item.icon}</Text>
            </View>
            <View style={styles.howCopy}>
              <Text style={styles.howTitle}>{item.title}</Text>
              <Text style={styles.howBody}>{item.body}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    paddingHorizontal: 16,
  },
  header: {
    gap: 4,
    marginBottom: 16,
  },
  title: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.35)',
    fontSize: 12,
  },
  hero: {
    borderRadius: 22,
    marginBottom: 16,
    overflow: 'hidden',
  },
  heroInner: {
    padding: 24,
  },
  heroEmoji: {
    fontSize: 44,
    marginBottom: 8,
  },
  heroTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -0.3,
    marginBottom: 8,
  },
  heroBody: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 16,
  },
  heroBtn: {
    borderRadius: radius.button,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    backgroundColor: 'rgba(255,255,255,0.2)',
    overflow: 'hidden',
  },
  heroBtnInner: {
    paddingVertical: 17,
    alignItems: 'center',
  },
  heroBtnLabel: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  sectionLabel: {
    color: colors.labelMuted,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  howRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  howIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.cardBgStart,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  howIconText: {
    fontSize: 18,
  },
  howCopy: {
    flex: 1,
    gap: 2,
  },
  howTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
  },
  howBody: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    lineHeight: 18,
  },
});
