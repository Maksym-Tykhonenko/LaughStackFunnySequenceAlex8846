import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FriendPhrase} from '../../content/friendPhrases';
import {cardColors, colors, radius} from '../../theme/colors';

type PhraseRowProps = {
  phrase: FriendPhrase;
};

export function PhraseRow({phrase}: PhraseRowProps): React.JSX.Element {
  const palette = cardColors[phrase.color];
  const initial = phrase.text.trim().charAt(0).toUpperCase() || '?';

  return (
    <View style={styles.row}>
      <View
        style={[
          styles.avatar,
          {backgroundColor: palette.bg, borderColor: palette.border},
        ]}>
        <Text style={[styles.avatarText, {color: palette.main}]}>{initial}</Text>
      </View>
      <Text style={styles.name} numberOfLines={2}>
        {phrase.text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.cardBgStart,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: radius.pill,
    paddingHorizontal: 15,
    paddingVertical: 11,
    marginBottom: 8,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 9,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 13,
    fontWeight: '800',
  },
  name: {
    flex: 1,
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
});
