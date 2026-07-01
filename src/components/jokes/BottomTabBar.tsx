import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {tabIcons} from '../../assets';
import {colors} from '../../theme/colors';

export type MainTabId = 'jokes' | 'memes' | 'friends' | 'sequence' | 'game';

type TabItem = {
  id: MainTabId;
  label: string;
  icon: ImageSourcePropType;
};

const TABS: TabItem[] = [
  {id: 'jokes', label: 'Jokes', icon: tabIcons.jokes},
  {id: 'memes', label: 'Memes', icon: tabIcons.memes},
  {id: 'friends', label: 'Friends', icon: tabIcons.friends},
  {id: 'sequence', label: 'Sequence', icon: tabIcons.sequence},
  {id: 'game', label: 'Game', icon: tabIcons.game},
];

type BottomTabBarProps = {
  active: MainTabId;
  onChange: (tab: MainTabId) => void;
};

export function BottomTabBar({
  active,
  onChange,
}: BottomTabBarProps): React.JSX.Element {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[styles.root, {paddingBottom: Math.max(insets.bottom - 10, 6)}]}>
      {TABS.map(tab => {
        const isActive = tab.id === active;
        return (
          <Pressable
            key={tab.id}
            onPress={() => onChange(tab.id)}
            style={styles.item}>
            <View style={[styles.iconWrap, isActive && styles.iconWrapActive]}>
              <Image
                source={tab.icon}
                style={[
                  styles.icon,
                  {
                    tintColor: isActive
                      ? colors.tabJokesActive
                      : colors.tabInactive,
                  },
                ]}
                resizeMode="contain"
              />
            </View>
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.tabBarBg,
    borderTopWidth: 1,
    borderTopColor: colors.tabBarBorder,
    paddingTop: 8,
    paddingHorizontal: 7,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
    paddingVertical: 8,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapActive: {
    backgroundColor: 'rgba(212,160,23,0.13)',
    borderRadius: 14,
  },
  icon: {
    width: 24,
    height: 24,
  },
  label: {
    fontSize: 10,
    fontWeight: '500',
    color: colors.tabInactive,
    letterSpacing: 0.3,
  },
  labelActive: {
    color: colors.tabJokesActive,
    fontWeight: '700',
  },
});
