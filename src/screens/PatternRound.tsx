import React from 'react';
import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {DotGrid} from '../components/recall/DotGrid';
import {LivesDisplay} from '../components/recall/LivesDisplay';
import {RecallProgressBar} from '../components/recall/RecallProgressBar';
import {StatCard} from '../components/recall/StatCard';
import {usePatternRecall} from '../hooks/usePatternRecall';
import {colors, spacing} from '../theme/colors';

type PatternRoundProps = {
  recall: ReturnType<typeof usePatternRecall>;
  onBack: () => void;
};

export function PatternRound({
  recall,
  onBack,
}: PatternRoundProps): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const isPreview = recall.phase === 'preview';
  const progressLabel = isPreview ? 'Sequence preview' : 'Progress';
  const progressCurrent = recall.previewProgress;
  const instruction = isPreview
    ? 'Watch the sequence…'
    : 'Your turn — tap the dots!';

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
              paddingTop: insets.top + 10,
              paddingBottom: insets.bottom + spacing.xl,
            },
          ]}>
          <View style={styles.topBar}>
            <Pressable onPress={onBack} style={styles.backBtn}>
              <Text style={styles.backIcon}>‹</Text>
            </Pressable>
            <Text style={styles.title}>Pattern Round {recall.level}</Text>
            <View style={styles.backSpacer} />
          </View>

          <View style={styles.stats}>
            <StatCard value={recall.level} label="LEVEL" />
            <StatCard
              value={recall.dotCount}
              label="DOTS"
              valueColor="#FBBF24"
            />
            <StatCard label="LIVES">
              <LivesDisplay lives={recall.lives} />
            </StatCard>
          </View>

          <Text style={styles.instruction}>{instruction}</Text>

          <DotGrid
            litDot={recall.litDot}
            selectedDot={recall.selectedDot}
            interactive={!isPreview && !recall.isGameOver}
            onPressDot={recall.handleDotPress}
          />

          <RecallProgressBar
            label={progressLabel}
            current={progressCurrent}
            total={recall.dotCount}
          />
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
    gap: 20,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#0D1C30',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    color: colors.text,
    fontSize: 24,
    lineHeight: 26,
    marginTop: -2,
  },
  backSpacer: {
    width: 36,
  },
  title: {
    flex: 1,
    color: colors.text,
    fontSize: 17,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  stats: {
    flexDirection: 'row',
    gap: 8,
  },
  instruction: {
    color: '#FBBF24',
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },
});
