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
import {
  cardColors,
  colors,
  gradient,
  radius,
  spacing,
} from '../../theme/colors';
import {PartyMember, GameScores} from '../../types/game';

const MEDALS = ['🥇', '🥈', '🥉'];

type GameResultsProps = {
  rankedMembers: PartyMember[];
  scores: GameScores;
  onHome: () => void;
  onNewGame: () => void;
};

export function GameResults({
  rankedMembers,
  scores,
  onHome,
  onNewGame,
}: GameResultsProps): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const topMember = rankedMembers[0];
  const topMemberScore = scores[topMember?.id ?? ''] ?? 0;
  const maxScore = Math.max(...rankedMembers.map(m => scores[m.id] ?? 0), 1);
  const colorKeys = Object.keys(cardColors) as (keyof typeof cardColors)[];

  return (
    <ImageBackground
      source={require('../../assets/homebackground.png')}
      style={styles.root}
      resizeMode="cover">
      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          {
            paddingTop: insets.top + spacing.l,
            paddingBottom: insets.bottom + spacing.xl,
          },
        ]}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Final Results</Text>

        {topMember ? (
          <LinearGradient
            colors={['#FF4757', '#A855F7', '#4DA6FF']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.topMemberCard}>
            <View style={styles.topMemberInner}>
              <Text style={styles.crown}>👑</Text>
              <Text style={styles.topMemberName}>{topMember.name}</Text>
              <Text style={styles.topMemberScore}>{topMemberScore} points</Text>
            </View>
          </LinearGradient>
        ) : null}

        <Text style={styles.sectionLabel}>Leaderboard</Text>

        {rankedMembers.map((member, index) => {
          const palette =
            cardColors[colorKeys[member.colorIndex % colorKeys.length]];
          const score = scores[member.id] ?? 0;
          const barWidth = `${Math.round((score / maxScore) * 100)}%`;
          const rankLabel = index < 3 ? MEDALS[index] : `#${index + 1}`;

          return (
            <View key={member.id} style={styles.row}>
              <Text style={styles.rank}>{rankLabel}</Text>
              <View
                style={[
                  styles.avatar,
                  {
                    backgroundColor: palette.bg,
                    borderColor: palette.border,
                  },
                ]}>
                <Text style={[styles.initial, {color: palette.main}]}>
                  {member.name.charAt(0).toUpperCase()}
                </Text>
              </View>
              <View style={styles.rowCopy}>
                <View style={styles.rowTop}>
                  <Text style={styles.rowName}>{member.name}</Text>
                  <Text style={[styles.rowScore, {color: palette.main}]}>
                    {score}
                  </Text>
                </View>
                <View style={styles.barTrack}>
                  <View
                    style={[
                      styles.barFill,
                      {width: barWidth, backgroundColor: palette.main},
                    ]}
                  />
                </View>
              </View>
            </View>
          );
        })}

        <View style={styles.actions}>
          <Pressable onPress={onHome} style={styles.actionWrap}>
            <LinearGradient colors={gradient.accent} style={styles.actionBtn}>
              <Text style={styles.actionLabel}>Home</Text>
            </LinearGradient>
          </Pressable>
          <Pressable onPress={onNewGame} style={styles.actionWrap}>
            <LinearGradient
              colors={['#A855F7', '#EC4899']}
              style={styles.actionBtn}>
              <Text style={styles.actionLabel}>New Game</Text>
            </LinearGradient>
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
  scroll: {
    paddingHorizontal: 16,
  },
  title: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 16,
  },
  topMemberCard: {
    borderRadius: 22,
    overflow: 'hidden',
    marginBottom: 20,
  },
  topMemberInner: {
    padding: 28,
    alignItems: 'center',
    gap: 6,
  },
  crown: {
    fontSize: 40,
    marginBottom: 4,
  },
  topMemberName: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '900',
  },
  topMemberScore: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 15,
    fontWeight: '600',
  },
  sectionLabel: {
    color: colors.labelMuted,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.cardBgStart,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: radius.pill,
    padding: 12,
    marginBottom: 8,
  },
  rank: {
    width: 28,
    fontSize: 16,
    textAlign: 'center',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 9,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initial: {
    fontSize: 13,
    fontWeight: '800',
  },
  rowCopy: {
    flex: 1,
    gap: 6,
  },
  rowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowName: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  rowScore: {
    fontSize: 14,
    fontWeight: '800',
  },
  barTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.08)',
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 2,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  actionWrap: {
    flex: 1,
    borderRadius: radius.button,
    overflow: 'hidden',
  },
  actionBtn: {
    alignItems: 'center',
    borderRadius: radius.button,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionLabel: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
});
