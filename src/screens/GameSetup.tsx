import React, {useCallback, useState} from 'react';
import {
  Alert,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {OptionPicker} from '../components/friends/OptionPicker';
import {cardColors, colors, gradient, radius, spacing} from '../theme/colors';
import {GameConfig, PartyMember} from '../types/game';

const MAX_MEMBERS = 6;

type GameSetupProps = {
  onBack: () => void;
  onStartGame: (config: GameConfig) => void;
};

function createMember(name: string, colorIndex: number): PartyMember {
  return {
    id: `${name}-${colorIndex}-${Date.now()}`,
    name,
    colorIndex,
  };
}

export function GameSetup({
  onBack,
  onStartGame,
}: GameSetupProps): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const [members, setMembers] = useState<PartyMember[]>([]);
  const [draftName, setDraftName] = useState('');
  const [rounds, setRounds] = useState(3);
  const [turnSeconds, setTurnSeconds] = useState(60);

  const colorKeys = Object.keys(cardColors) as (keyof typeof cardColors)[];

  const addMember = useCallback(() => {
    const name = draftName.trim();
    if (!name) {
      return;
    }
    if (members.length >= MAX_MEMBERS) {
      Alert.alert('Room full', `Maximum ${MAX_MEMBERS} members.`);
      return;
    }
    if (members.some(m => m.name.toLowerCase() === name.toLowerCase())) {
      Alert.alert('Already added', 'This member is already in the game.');
      return;
    }
    setMembers(current => [
      ...current,
      createMember(name, current.length % colorKeys.length),
    ]);
    setDraftName('');
  }, [colorKeys.length, draftName, members]);

  const removeMember = useCallback((id: string) => {
    setMembers(current => current.filter(m => m.id !== id));
  }, []);

  const startGame = useCallback(() => {
    if (members.length < 2) {
      Alert.alert('Need more members', 'Add at least 2 members to start.');
      return;
    }
    onStartGame({
      members,
      rounds,
      turnSeconds,
    });
  }, [onStartGame, members, rounds, turnSeconds]);

  return (
    <ImageBackground
      source={require('../assets/homebackground.png')}
      style={styles.root}
      resizeMode="cover">
      <View
        style={[
          styles.topBar,
          {paddingTop: insets.top + 10},
        ]}>
        <Pressable onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backIcon}>‹</Text>
        </Pressable>
        <Text style={styles.topTitle}>Game Setup</Text>
        <View style={styles.backSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.form,
          {paddingBottom: insets.bottom + spacing.xxl},
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionLabel}>
          Members ({members.length}/{MAX_MEMBERS})
        </Text>

        {members.map(member => {
          const palette =
            cardColors[colorKeys[member.colorIndex % colorKeys.length]];
          const initial = member.name.charAt(0).toUpperCase();
          return (
            <View key={member.id} style={styles.memberRow}>
              <View
                style={[
                  styles.memberAvatar,
                  {
                    backgroundColor: palette.bg,
                    borderColor: palette.border,
                  },
                ]}>
                <Text style={[styles.memberInitial, {color: palette.main}]}>
                  {initial}
                </Text>
              </View>
              <Text style={styles.memberName}>{member.name}</Text>
              <Pressable
                onPress={() => removeMember(member.id)}
                hitSlop={8}
                style={styles.removeBtn}>
                <Text style={styles.removeIcon}>×</Text>
              </Pressable>
            </View>
          );
        })}

        <View style={styles.addRow}>
          <TextInput
            value={draftName}
            onChangeText={setDraftName}
            placeholder="Add member name..."
            placeholderTextColor={colors.placeholder}
            style={styles.addInput}
            onSubmitEditing={addMember}
            returnKeyType="done"
          />
          <Pressable onPress={addMember} style={styles.addBtnWrap}>
            <LinearGradient
              colors={gradient.accent}
              style={styles.addBtn}>
              <Text style={styles.addBtnIcon}>+</Text>
            </LinearGradient>
          </Pressable>
        </View>

        <Text style={styles.sectionLabel}>Rounds</Text>
        <OptionPicker
          options={[2, 3, 4, 5].map(n => ({
            value: n,
            label: String(n),
            activeGradient: ['#A855F7', '#7C3AED'],
          }))}
          value={rounds}
          onChange={setRounds}
        />

        <Text style={styles.sectionLabel}>Time per Turn</Text>
        <OptionPicker
          compact
          options={[30, 60, 90, 120].map(n => ({
            value: n,
            label: `${n}s`,
            activeGradient: ['#FBBF24', '#FB923C'],
          }))}
          value={turnSeconds}
          onChange={setTurnSeconds}
        />

        <Pressable onPress={startGame} style={styles.playWrap}>
          <LinearGradient
            colors={gradient.accent}
            style={styles.playBtn}>
            <View style={styles.playBtnInner}>
              <Text style={styles.playLabel}>Let's Play! 🎤</Text>
            </View>
          </LinearGradient>
        </Pressable>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 11,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.07)',
    backgroundColor: 'rgba(6,13,24,0.95)',
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
  topTitle: {
    flex: 1,
    color: colors.text,
    fontSize: 17,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  form: {
    padding: 16,
    gap: 10,
  },
  sectionLabel: {
    color: colors.labelMuted,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginTop: 4,
  },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.cardBgStart,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: radius.pill,
    paddingHorizontal: 15,
    paddingVertical: 11,
  },
  memberAvatar: {
    width: 30,
    height: 30,
    borderRadius: 9,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  memberInitial: {
    fontSize: 13,
    fontWeight: '800',
  },
  memberName: {
    flex: 1,
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  removeBtn: {
    paddingHorizontal: 4,
  },
  removeIcon: {
    color: 'rgba(255,255,255,0.35)',
    fontSize: 18,
    lineHeight: 18,
  },
  addRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  addInput: {
    flex: 1,
    backgroundColor: colors.inputBg,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    color: colors.text,
    fontSize: 14,
  },
  addBtnWrap: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  addBtn: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtnIcon: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '400',
  },
  playWrap: {
    borderRadius: radius.button,
    overflow: 'hidden',
    marginTop: 8,
  },
  playBtn: {
    borderRadius: radius.button,
  },
  playBtnInner: {
    paddingVertical: 17,
    alignItems: 'center',
  },
  playLabel: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
});
