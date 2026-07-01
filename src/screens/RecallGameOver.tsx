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
import {colors, gradient, radius, spacing} from '../theme/colors';

type RecallGameOverProps = {
  score: number;
  bestLevel: number;
  onTryAgain: () => void;
  onMenu: () => void;
};

export function RecallGameOver({
  score,
  bestLevel,
  onTryAgain,
  onMenu,
}: RecallGameOverProps): React.JSX.Element {
  const insets = useSafeAreaInsets();

  return (
    <ImageBackground
      source={require('../assets/homebackground.png')}
      style={styles.root}
      resizeMode="cover">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <View
          style={[
            styles.body,
            {
              paddingTop: insets.top + spacing.xxl,
              paddingBottom: insets.bottom + spacing.xl,
            },
          ]}>
          <Text style={styles.title}>Outstanding! 🔥</Text>
          <Text style={styles.subtitle}>Game over — three strikes reached</Text>

          <View style={styles.scoreRow}>
            <View style={styles.scoreCard}>
              <Text style={styles.scoreValueTeal}>{score}</Text>
              <Text style={styles.scoreLabel}>SEQUENCE SCORE</Text>
            </View>
            <View style={[styles.scoreCard, styles.scoreCardBest]}>
              <Text style={styles.scoreValueGold}>{bestLevel}</Text>
              <Text style={styles.scoreLabel}>BEST SEQUENCE</Text>
            </View>
          </View>

          <Pressable onPress={onTryAgain} style={styles.tryWrap}>
            <LinearGradient colors={gradient.accent} style={styles.tryBtn}>
              <View style={styles.tryInner}>
                <Text style={styles.tryLabel}>Try Again 🎯</Text>
              </View>
            </LinearGradient>
          </Pressable>

          <Pressable onPress={onMenu} style={styles.menuBtn}>
            <Text style={styles.menuLabel}>Back to Menu</Text>
          </Pressable>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  body: {
    flex: 1,
    paddingHorizontal: 16,
    alignItems: 'center',
    gap: 16,
  },
  title: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '900',
    textAlign: 'center',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 8,
  },
  scoreRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    marginBottom: 8,
  },
  scoreCard: {
    flex: 1,
    backgroundColor: colors.cardBgStart,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: radius.card,
    paddingVertical: 20,
    alignItems: 'center',
    gap: 6,
  },
  scoreCardBest: {
    borderColor: 'rgba(251,191,36,0.45)',
  },
  scoreValueTeal: {
    color: colors.accentStart,
    fontSize: 32,
    fontWeight: '900',
  },
  scoreValueGold: {
    color: '#FBBF24',
    fontSize: 32,
    fontWeight: '900',
  },
  scoreLabel: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  tryWrap: {
    width: '100%',
    borderRadius: radius.button,
    overflow: 'hidden',
    marginTop: 8,
  },
  tryBtn: {
    borderRadius: radius.button,
  },
  tryInner: {
    paddingVertical: 17,
    alignItems: 'center',
  },
  tryLabel: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  menuBtn: {
    width: '100%',
    paddingVertical: 17,
    borderRadius: radius.button,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    alignItems: 'center',
  },
  menuLabel: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: 16,
    fontWeight: '600',
  },
});
