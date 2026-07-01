import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {colors, radius} from '../../theme/colors';

export type SequenceTab = 'cards' | 'completed';

type SequenceTabSwitcherProps = {
  active: SequenceTab;
  onChange: (tab: SequenceTab) => void;
};

export function SequenceTabSwitcher({
  active,
  onChange,
}: SequenceTabSwitcherProps): React.JSX.Element {
  return (
    <View style={styles.root}>
      <Pressable
        onPress={() => onChange('cards')}
        style={[styles.tab, active === 'cards' && styles.tabActive]}>
        <Text
          style={[styles.label, active === 'cards' && styles.labelActive]}>
          Story Cards
        </Text>
      </Pressable>
      <Pressable
        onPress={() => onChange('completed')}
        style={[styles.tab, active === 'completed' && styles.tabActive]}>
        <Text
          style={[
            styles.label,
            active === 'completed' && styles.labelActive,
          ]}>
          Completed Stories
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    backgroundColor: colors.tabBg,
    borderRadius: radius.button,
    padding: 4,
    height: 49,
  },
  tab: {
    flex: 1,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabActive: {
    backgroundColor: colors.tabActive,
  },
  label: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '400',
    textAlign: 'center',
  },
  labelActive: {
    color: colors.text,
    fontWeight: '600',
  },
});
