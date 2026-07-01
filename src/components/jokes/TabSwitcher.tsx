import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {colors, radius} from '../../theme/colors';

export type JokeTab = 'all' | 'saved';

type TabSwitcherProps = {
  active: JokeTab;
  onChange: (tab: JokeTab) => void;
};

export function TabSwitcher({
  active,
  onChange,
}: TabSwitcherProps): React.JSX.Element {
  return (
    <View style={styles.root}>
      <Pressable
        onPress={() => onChange('all')}
        style={[styles.tab, active === 'all' && styles.tabActive]}>
        <Text style={[styles.label, active === 'all' && styles.labelActive]}>
          All Jokes
        </Text>
      </Pressable>
      <Pressable
        onPress={() => onChange('saved')}
        style={[styles.tab, active === 'saved' && styles.tabActive]}>
        <Text
          style={[styles.label, active === 'saved' && styles.labelActive]}>
          Saved
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
    fontSize: 14,
    fontWeight: '400',
  },
  labelActive: {
    color: colors.text,
    fontWeight: '600',
  },
});
