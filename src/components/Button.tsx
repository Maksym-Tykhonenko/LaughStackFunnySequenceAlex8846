import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors, fontSize, gradient, radius} from '../theme/colors';

type Variant = 'filled' | 'outline';

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: Variant;
  showArrow?: boolean;
  busy?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function Button({
  title,
  onPress,
  variant = 'filled',
  showArrow = false,
  busy = false,
  style,
}: ButtonProps): React.JSX.Element {
  const label = (
    <View style={styles.labelRow}>
      {busy ? (
        <ActivityIndicator color={colors.text} />
      ) : (
        <>
          <Text
            style={[
              styles.label,
              variant === 'outline' && styles.labelOutline,
            ]}>
            {title}
          </Text>
          {showArrow ? <Text style={styles.arrow}>›</Text> : null}
        </>
      )}
    </View>
  );

  if (variant === 'filled') {
    return (
      <Pressable
        onPress={onPress}
        disabled={busy}
        style={({pressed}) => [
          styles.pressable,
          pressed && styles.pressed,
          style,
        ]}>
        <LinearGradient
          colors={gradient.accent}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}
          style={styles.filled}>
          {label}
        </LinearGradient>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      disabled={busy}
      style={({pressed}) => [
        styles.pressable,
        styles.outline,
        pressed && styles.pressed,
        style,
      ]}>
      {label}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    flex: 1,
    minHeight: 56,
    borderRadius: radius.button,
    overflow: 'hidden',
  },
  filled: {
    minHeight: 56,
    borderRadius: radius.button,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outline: {
    backgroundColor: colors.ghost,
    borderWidth: 1,
    borderColor: colors.outline,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },
  label: {
    color: colors.text,
    fontSize: fontSize.button,
    fontWeight: '600',
  },
  labelOutline: {
    fontWeight: '500',
  },
  arrow: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '600',
    marginTop: -2,
  },
  pressed: {
    opacity: 0.88,
  },
});
