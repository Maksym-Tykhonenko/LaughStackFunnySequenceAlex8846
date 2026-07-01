import React, {useCallback, useEffect, useRef, useState} from 'react';
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
import {GamePauseButton} from '../../components/friends/GamePauseButton';
import {StepDots} from '../../components/StepDots';
import {PartyMember} from '../../types/game';
import {colors, radius, spacing} from '../../theme/colors';
import Orientation from 'react-native-orientation-locker';
import {useFocusEffect} from '@react-navigation/native';

type GamePerformProps = {
  round: number;
  totalRounds: number;
  performer: PartyMember;
  phrase: string;
  turnSeconds: number;
  onPause: () => void;
  onDone: () => void;
};

export function GamePerform({
  round,
  totalRounds,
  performer,
  phrase,
  turnSeconds,
  onPause,
  onDone,
}: GamePerformProps): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const [timerRunning, setTimerRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(turnSeconds);
  const finishedRef = useRef(false);

  const finish = useCallback(() => {
    if (finishedRef.current) {
      return;
    }
    finishedRef.current = true;
    setTimerRunning(false);
    onDone();
  }, [onDone]);

  useEffect(() => {
    finishedRef.current = false;
    setTimerRunning(false);
    setSecondsLeft(turnSeconds);
  }, [phrase, performer.id, turnSeconds]);

  useEffect(() => {
    if (!timerRunning) {
      return;
    }
    if (secondsLeft <= 0) {
      finish();
      return;
    }
    const id = setTimeout(() => setSecondsLeft(s => s - 1), 1000);
    return () => clearTimeout(id);
  }, [timerRunning, secondsLeft, finish]);

  const progress = timerRunning ? (turnSeconds - secondsLeft) / turnSeconds : 0;

  return (
    <ImageBackground
      source={require('../../assets/homebackground.png')}
      style={styles.root}
      resizeMode="cover">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <View
          style={[
            styles.body,
            {
              paddingTop: insets.top + spacing.l,
              paddingBottom: insets.bottom + spacing.xl,
            },
          ]}>
          <View style={styles.header}>
            <Text style={styles.roundLabel}>
              Round {round} / {totalRounds}
            </Text>
            <GamePauseButton onPress={onPause} />
          </View>

          <View style={styles.performerCard}>
            <Text style={styles.performerLabel}>Now performing</Text>
            <Text style={styles.performerName}>{performer.name} 🎤</Text>
          </View>

          <LinearGradient
            colors={['#FF4757', '#A855F7', '#4DA6FF']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.phraseCard}>
            <View style={styles.phraseInner}>
              <Text style={styles.phraseLabel}>Your phrase</Text>
              <Text style={styles.phraseText}>“{phrase}”</Text>
            </View>
          </LinearGradient>

          <View style={styles.timerWrap}>
            <View
              style={[
                styles.timerRing,
                {
                  borderColor: `rgba(0,212,170,${0.25 + progress * 0.75})`,
                },
              ]}>
              <Text style={styles.timerValue}>
                {timerRunning ? secondsLeft : turnSeconds}
              </Text>
              <Text style={styles.timerUnit}>seconds</Text>
            </View>
          </View>

          <Pressable
            onPress={timerRunning ? finish : () => setTimerRunning(true)}
            style={styles.actionWrap}>
            <View
              style={[
                styles.actionBtn,
                timerRunning ? styles.doneBtn : styles.startBtn,
              ]}>
              <Text style={styles.actionLabel}>
                {timerRunning ? 'Done' : 'Start Timer ⏯'}
              </Text>
            </View>
          </Pressable>

          <StepDots total={totalRounds} active={round - 1} />
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
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  roundLabel: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  performerCard: {
    alignSelf: 'center',
    backgroundColor: colors.cardBgStart,
    borderWidth: 1,
    borderColor: 'rgba(77,166,255,0.35)',
    borderRadius: 14,
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignItems: 'center',
    gap: 4,
  },
  performerLabel: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  performerName: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  phraseCard: {
    borderRadius: 22,
    overflow: 'hidden',
    marginTop: 8,
  },
  phraseInner: {
    padding: 28,
    alignItems: 'center',
    gap: 12,
  },
  phraseLabel: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  phraseText: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900',
    textAlign: 'center',
    lineHeight: 30,
  },
  timerWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 160,
  },
  timerRing: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(13,28,48,0.6)',
  },
  timerValue: {
    color: colors.accentStart,
    fontSize: 48,
    fontWeight: '900',
    lineHeight: 52,
  },
  timerUnit: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  actionWrap: {
    borderRadius: radius.button,
    overflow: 'hidden',
  },
  actionBtn: {
    paddingVertical: 17,
    alignItems: 'center',
    borderRadius: radius.button,
  },
  startBtn: {
    backgroundColor: colors.accentStart,
  },
  doneBtn: {
    backgroundColor: colors.saveGreen,
  },
  actionLabel: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
});
