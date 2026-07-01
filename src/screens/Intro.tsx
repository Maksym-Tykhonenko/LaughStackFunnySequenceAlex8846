import React, {useCallback, useMemo, useState} from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Button} from '../components/Button';
import {StepDots} from '../components/StepDots';
import {introSlides} from '../content/introSlides';
import {colors, fontSize, gradient, radius, spacing} from '../theme/colors';
import Layout from '../components/Layout';

type IntroProps = {
  onFinish: () => void;
};

export function Intro({onFinish}: IntroProps): React.JSX.Element {
  const [step, setStep] = useState(0);
  const insets = useSafeAreaInsets();
  const {width} = useWindowDimensions();

  const slide = introSlides[step];
  const last = step === introSlides.length - 1;
  const artSize = Math.min(337, width - spacing.xxl * 2);

  const advance = useCallback(() => {
    if (last) {
      onFinish();
      return;
    }
    setStep(current => current + 1);
  }, [last, onFinish]);

  const footer = useMemo(() => {
    if (last) {
      return (
        <Button
          title="Let's Begin!"
          onPress={advance}
          showArrow
          style={styles.fullButton}
        />
      );
    }

    return (
      <View style={styles.actions}>
        <Button title="Skip" onPress={onFinish} variant="outline" />
        <Button title="Next" onPress={advance} showArrow />
      </View>
    );
  }, [advance, last, onFinish]);

  return (
    <Layout>
      <View
        style={[
          styles.content,
          {
            paddingTop: insets.top + spacing.l,
            paddingBottom: insets.bottom + spacing.xxl,
          },
        ]}>
        <View style={[styles.artWrap, {width: artSize, height: artSize}]}>
          <Image
            key={step}
            source={slide.art}
            style={styles.art}
            resizeMode="cover"
          />
        </View>

        <View style={styles.copy}>
          <Text style={styles.title}>{slide.title}</Text>
          <Text style={styles.body}>{slide.body}</Text>
        </View>

        <View style={styles.footer}>
          <StepDots total={introSlides.length} active={step} />
          {footer}
        </View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.xxl,
    justifyContent: 'space-between',
  },
  artWrap: {
    alignSelf: 'center',
    borderRadius: radius.art,
    overflow: 'hidden',
    marginTop: spacing.xl,
  },
  art: {
    width: '100%',
    height: '100%',
  },
  copy: {
    alignItems: 'center',
    gap: spacing.m,
    paddingHorizontal: spacing.s,
  },
  title: {
    color: colors.text,
    fontSize: fontSize.title,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 33.6,
  },
  body: {
    color: colors.muted,
    fontSize: fontSize.body,
    textAlign: 'center',
    lineHeight: 25.5,
    maxWidth: 300,
  },
  footer: {
    gap: spacing.xl,
    alignItems: 'center',
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.m,
    width: '100%',
    maxWidth: 329,
    alignSelf: 'center',
  },
  fullButton: {
    width: '100%',
    maxWidth: 329,
    alignSelf: 'center',
    flex: 0,
  },
});
