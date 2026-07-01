import React, {useEffect} from 'react';
import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {colors} from '../theme/colors';

const LOADER_DURATION_MS = 5000;

type LoaderProps = {
  onFinish: () => void;
};

export function Loader({onFinish}: LoaderProps): React.JSX.Element {
  useEffect(() => {
    const timer = setTimeout(onFinish, LOADER_DURATION_MS);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <ImageBackground
      source={require('../assets/loaderback.png')}
      style={styles.root}
      resizeMode="cover">
      <StatusBar barStyle="light-content" backgroundColor={colors.bg} />
      <View style={styles.center}>
        <View style={styles.iconTile}>
          <Image source={require('../assets/icon.png')} resizeMode="contain" />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconTile: {
    width: 120,
    height: 120,
    borderRadius: 28,
    backgroundColor: 'rgba(13,28,48,0.85)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  icon: {
    width: 88,
    height: 88,
  },
});
