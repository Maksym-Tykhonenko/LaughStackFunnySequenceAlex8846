import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors, radius} from '../../theme/colors';

type PhotoSlotCardProps = {
  index: number;
  uri: string | null;
  gradient: string[];
  onPress?: () => void;
  compact?: boolean;
  readOnly?: boolean;
};

export function PhotoSlotCard({
  index,
  uri,
  gradient,
  onPress,
  compact = false,
  readOnly = false,
}: PhotoSlotCardProps): React.JSX.Element {
  const shell = (
    <View style={[styles.clip, compact && styles.clipCompact]}>
        <LinearGradient colors={gradient} style={StyleSheet.absoluteFill} />
        {uri ? (
          <>
            <Image source={{uri}} style={styles.image} resizeMode="cover" />
            <View style={styles.imageOverlay} />
          </>
        ) : (
          <View style={styles.emptyInner}>
            <Text style={styles.camera}>📷</Text>
            {!compact ? (
              <Text style={styles.tapLabel}>Tap to add</Text>
            ) : null}
          </View>
        )}
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Photo {index + 1}</Text>
        </View>
    </View>
  );

  if (readOnly) {
    return (
      <View style={[styles.wrap, compact && styles.wrapCompact]}>{shell}</View>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      style={[styles.wrap, compact && styles.wrapCompact]}>
      {shell}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    minHeight: 100,
  },
  wrapCompact: {
    minHeight: 0,
    aspectRatio: 1,
  },
  clip: {
    flex: 1,
    minHeight: 120,
    borderRadius: radius.pill,
    overflow: 'hidden',
    position: 'relative',
  },
  clipCompact: {
    minHeight: 0,
    width: '100%',
    aspectRatio: 1,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.22)',
  },
  emptyInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  camera: {
    fontSize: 24,
    opacity: 0.5,
  },
  tapLabel: {
    color: 'rgba(255,255,255,0.35)',
    fontSize: 11,
    fontWeight: '700',
  },
  badge: {
    position: 'absolute',
    right: 7,
    bottom: 5,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: {
    color: colors.text,
    fontSize: 10,
    fontWeight: '700',
  },
});
