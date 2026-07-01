import React, {useMemo, useState} from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CARD_COLOR_OPTIONS} from '../content/jokes';
import {useJokesContext} from '../context/JokesContext';
import {CardColorId} from '../types/joke';
import {cardColors, colors, gradient, radius, spacing} from '../theme/colors';

type AddJokeScreenProps = {
  onBack: () => void;
};

export function AddJokeScreen({onBack}: AddJokeScreenProps): React.JSX.Element {
  const {addJoke} = useJokesContext();
  const insets = useSafeAreaInsets();
  const [character, setCharacter] = useState('');
  const [tag, setTag] = useState('');
  const [text, setText] = useState('');
  const [color, setColor] = useState<CardColorId>('teal');

  const canSave = useMemo(
    () =>
      character.trim().length > 0 &&
      tag.trim().length > 0 &&
      text.trim().length > 0,
    [character, tag, text],
  );

  return (
    <ImageBackground
      source={require('../assets/homebackground.png')}
      style={styles.root}
      resizeMode="cover">
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View
          style={[
            styles.topBar,
            {
              paddingTop: insets.top + 10,
            },
          ]}>
          <Pressable onPress={onBack} style={styles.backBtn}>
            <Text style={styles.backIcon}>‹</Text>
          </Pressable>
          <Text style={styles.topTitle}>Add Your Joke</Text>
          <View style={styles.backSpacer} />
        </View>

        <ScrollView
          contentContainerStyle={[
            styles.form,
            {paddingBottom: insets.bottom + spacing.xxl},
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <Field label="Character Name">
            <TextInput
              value={character}
              onChangeText={setCharacter}
              placeholder="e.g. Punny Paul"
              placeholderTextColor={colors.placeholder}
              style={styles.input}
            />
          </Field>

          <Field label="Style / Category">
            <TextInput
              value={tag}
              onChangeText={setTag}
              placeholder="e.g. Dad Jokes, Wordplay..."
              placeholderTextColor={colors.placeholder}
              style={styles.input}
            />
          </Field>

          <Field label="Joke Text">
            <TextInput
              value={text}
              onChangeText={setText}
              placeholder="Write your joke here..."
              placeholderTextColor={colors.placeholder}
              style={[styles.input, styles.textarea]}
              multiline
              textAlignVertical="top"
            />
          </Field>

          <Field label="Card Color">
            <View style={styles.swatches}>
              {CARD_COLOR_OPTIONS.map(option => {
                const selected = color === option.id;
                const palette = cardColors[option.id];
                return (
                  <Pressable
                    key={option.id}
                    onPress={() => setColor(option.id)}
                    style={[
                      styles.swatch,
                      selected && [
                        styles.swatchSelected,
                        {borderColor: palette.main},
                      ],
                    ]}>
                    <View
                      style={[
                        styles.swatchFill,
                        {backgroundColor: option.hex},
                        selected && styles.swatchFillSelected,
                      ]}
                    />
                  </Pressable>
                );
              })}
            </View>
          </Field>

          <Pressable
            disabled={!canSave}
            onPress={async () => {
              await addJoke({character, tag, text, color});
              onBack();
            }}
            style={({pressed}) => [
              styles.saveWrap,
              !canSave && styles.saveDisabled,
              pressed && canSave && styles.savePressed,
            ]}>
            <LinearGradient
              colors={gradient.accent}
              start={{x: 0, y: 0.5}}
              end={{x: 1, y: 0.5}}
              style={styles.saveBtn}>
              <Text style={styles.saveLabel}>Save Joke ✓</Text>
            </LinearGradient>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  flex: {
    flex: 1,
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
    gap: 14,
  },
  field: {
    gap: 6,
  },
  fieldLabel: {
    color: colors.labelMuted,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: colors.inputBg,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: radius.pill,
    paddingHorizontal: 15,
    paddingVertical: 13,
    color: colors.text,
    fontSize: 15,
    fontWeight: '500',
  },
  textarea: {
    minHeight: 120,
    paddingTop: 13,
  },
  swatches: {
    flexDirection: 'row',
    gap: 10,
    paddingBottom: 6,
  },
  swatch: {
    width: 34,
    height: 34,
    borderRadius: 10,
    overflow: 'hidden',
  },
  swatchSelected: {
    borderWidth: 2,
    backgroundColor: '#060D18',
    padding: 3,
    overflow: 'visible',
  },
  swatchFill: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  swatchFillSelected: {
    borderRadius: 7,
  },
  saveWrap: {
    borderRadius: radius.button,
    overflow: 'hidden',
    marginTop: 4,
  },
  saveDisabled: {
    opacity: 0.5,
  },
  savePressed: {
    opacity: 0.88,
  },
  saveBtn: {
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.button,
  },
  saveLabel: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
});
