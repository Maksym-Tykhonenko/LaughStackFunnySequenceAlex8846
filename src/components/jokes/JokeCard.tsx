import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Joke} from '../../types/joke';
import {cardColors, colors, radius} from '../../theme/colors';

type JokeCardProps = {
  joke: Joke;
  saved: boolean;
  onToggleSave: () => void;
  onShare: () => void;
  onDelete: () => void;
};

export function JokeCard({
  joke,
  saved,
  onToggleSave,
  onShare,
  onDelete,
}: JokeCardProps): React.JSX.Element {
  const palette = cardColors[joke.color];
  const initial = joke.character.trim().charAt(0).toUpperCase() || '?';

  return (
    <View style={styles.wrap}>
      <View style={styles.card}>
        <LinearGradient
          colors={[colors.cardBgStart, colors.cardBgEnd]}
          style={StyleSheet.absoluteFill}
        />
        <LinearGradient
          colors={[palette.main, `${palette.main}44`]}
          style={styles.accent}
        />
        <View style={styles.cardInner}>
          <View style={styles.header}>
            <View
              style={[
                styles.avatar,
                {backgroundColor: palette.bg, borderColor: palette.border},
              ]}>
              <Text style={[styles.avatarText, {color: palette.main}]}>
                {initial}
              </Text>
            </View>
            <View style={styles.meta}>
              <Text style={styles.character}>{joke.character}</Text>
              <View
                style={[
                  styles.tag,
                  {backgroundColor: palette.bg, borderColor: palette.border},
                ]}>
                <Text style={[styles.tagText, {color: palette.main}]}>
                  {joke.tag}
                </Text>
              </View>
            </View>
            {saved ? (
              <Pressable
                onPress={onDelete}
                style={styles.deleteBtn}
                hitSlop={8}
                accessibilityLabel="Delete joke">
                <Text style={styles.deleteIcon}>🗑</Text>
              </Pressable>
            ) : null}
          </View>

          <Text style={styles.jokeText}>"{joke.text}"</Text>

          <View style={styles.actions}>
            <Pressable
              onPress={onToggleSave}
              style={[styles.actionBtn, saved && styles.actionBtnSaved]}>
              <Text
                style={[styles.actionIcon, saved && styles.actionIconSaved]}>
                {saved ? '✓' : '♡'}
              </Text>
              <Text
                style={[
                  styles.actionLabel,
                  saved && styles.actionLabelSaved,
                ]}>
                {saved ? 'Saved' : 'Save'}
              </Text>
            </Pressable>
            <Pressable onPress={onShare} style={styles.actionBtnShare}>
              <Text style={styles.actionIconMuted}>↗</Text>
              <Text style={styles.actionLabelMuted}>Share</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: 12,
  },
  card: {
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    overflow: 'hidden',
    position: 'relative',
  },
  accent: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
  },
  cardInner: {
    padding: 17,
    paddingLeft: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 10,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '800',
  },
  meta: {
    flex: 1,
    gap: 4,
  },
  character: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '800',
  },
  tag: {
    alignSelf: 'flex-start',
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 11,
    paddingVertical: 4,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '700',
  },
  deleteBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: 'rgba(232,85,80,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(232,85,80,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteIcon: {
    fontSize: 14,
  },
  jokeText: {
    color: 'rgba(255,255,255,0.87)',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 10,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    flex: 1,
    height: 34,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    backgroundColor: colors.inputBg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  actionBtnSaved: {
    backgroundColor: colors.saveGreen,
    borderColor: colors.saveGreen,
  },
  actionBtnShare: {
    flex: 1,
    height: 34,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    backgroundColor: colors.inputBg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  actionIcon: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '700',
  },
  actionLabel: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '700',
  },
  actionIconSaved: {
    color: colors.text,
  },
  actionLabelSaved: {
    color: colors.text,
  },
  actionIconMuted: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
  },
  actionLabelMuted: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    fontWeight: '700',
  },
});
