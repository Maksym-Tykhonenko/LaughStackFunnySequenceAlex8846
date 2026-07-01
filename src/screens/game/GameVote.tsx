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
import {GamePauseButton} from '../../components/friends/GamePauseButton';
import {StarRating} from '../../components/friends/StarRating';
import {StepDots} from '../../components/StepDots';
import {PartyMember} from '../../types/game';
import {colors, radius, spacing} from '../../theme/colors';

type GameVoteProps = {
  round: number;
  totalRounds: number;
  performer: PartyMember;
  phrase: string;
  voters: PartyMember[];
  ratings: Record<string, number>;
  allRated: boolean;
  onPause: () => void;
  onRate: (voterId: string, stars: number) => void;
  onConfirm: () => void;
};

export function GameVote({
  round,
  totalRounds,
  performer,
  phrase,
  voters,
  ratings,
  allRated,
  onPause,
  onRate,
  onConfirm,
}: GameVoteProps): React.JSX.Element {
  const insets = useSafeAreaInsets();

  return (
    <ImageBackground
      source={require('../../assets/homebackground.png')}
      style={styles.root}
      resizeMode="cover">
      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          {paddingBottom: insets.bottom + 100},
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={[styles.header, {paddingTop: insets.top + spacing.l}]}>
          <Text style={styles.title}>Cast Your Votes</Text>
          <GamePauseButton onPress={onPause} />
        </View>
        <View style={styles.judgingCard}>
          <Text style={styles.judgingLabel}>Judging: {performer.name}</Text>
          <Text style={styles.judgingPhrase}>{phrase}</Text>
        </View>

        {voters.map(voter => (
          <View key={voter.id} style={styles.voterCard}>
            <Text style={styles.voterName}>{voter.name}</Text>
            <StarRating
              value={ratings[voter.id] ?? 0}
              onChange={stars => onRate(voter.id, stars)}
            />
          </View>
        ))}
      </ScrollView>

      <View style={[styles.footer, {paddingBottom: insets.bottom + spacing.l}]}>
        <StepDots total={totalRounds} active={round - 1} />
        <Pressable
          onPress={onConfirm}
          disabled={!allRated}
          style={[styles.confirmBtn, !allRated && styles.confirmDisabled]}>
          <Text style={styles.confirmLabel}>Confirm Rating</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingBottom: 12,
  },
  title: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  scroll: {
    paddingHorizontal: 16,
    gap: 12,
  },
  judgingCard: {
    backgroundColor: 'rgba(168,85,247,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(168,85,247,0.45)',
    borderRadius: radius.card,
    padding: 20,
    gap: 8,
    marginBottom: 4,
  },
  judgingLabel: {
    color: '#A855F7',
    fontSize: 13,
    fontWeight: '700',
  },
  judgingPhrase: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900',
    lineHeight: 28,
  },
  voterCard: {
    backgroundColor: colors.cardBgStart,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: radius.card,
    padding: 16,
    gap: 12,
  },
  voterName: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    gap: 12,
  },
  confirmBtn: {
    backgroundColor: colors.saveGreen,
    borderRadius: radius.button,
    paddingVertical: 17,
    alignItems: 'center',
  },
  confirmDisabled: {
    opacity: 0.45,
  },
  confirmLabel: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
});
