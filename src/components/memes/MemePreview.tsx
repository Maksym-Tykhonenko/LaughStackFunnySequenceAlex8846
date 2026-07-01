import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {MemeLayout} from '../../types/meme';
import {colors, memePhotoGradients, radius} from '../../theme/colors';

type MemePreviewProps = {
  layout: MemeLayout;
  photos: (string | null)[];
  captions: string[];
};

function PreviewCell({
  uri,
  caption,
  gradient,
  showDivider,
}: {
  uri: string | null;
  caption: string;
  gradient: string[];
  showDivider?: boolean;
}) {
  return (
    <View
      style={[
        styles.cell,
        showDivider && styles.cellDivider,
      ]}>
      <LinearGradient colors={gradient} style={StyleSheet.absoluteFill} />
      {uri ? (
        <>
          <Image source={{uri}} style={styles.cellImage} resizeMode="cover" />
          <View style={styles.cellOverlay} />
        </>
      ) : (
        <View style={styles.cellPlaceholder}>
          <Text style={styles.placeholderEmoji}>
            {gradient === memePhotoGradients[0] ? '🌅' : '🌃'}
          </Text>
        </View>
      )}
      {caption.trim().length > 0 ? (
        <View style={styles.captionWrap}>
          <Text style={styles.captionText} numberOfLines={2}>
            {caption}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

export function MemePreview({
  layout,
  photos,
  captions,
}: MemePreviewProps): React.JSX.Element {
  if (layout === 1) {
    return (
      <View style={styles.frame}>
        <PreviewCell
          uri={photos[0] ?? null}
          caption={captions[0] ?? ''}
          gradient={memePhotoGradients[0]}
        />
      </View>
    );
  }

  if (layout === 2) {
    return (
      <View style={styles.frame}>
        <View style={styles.row}>
          <PreviewCell
            uri={photos[0] ?? null}
            caption={captions[0] ?? ''}
            gradient={memePhotoGradients[0]}
            showDivider
          />
          <PreviewCell
            uri={photos[1] ?? null}
            caption={captions[1] ?? ''}
            gradient={memePhotoGradients[1]}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.frame}>
      <View style={styles.row}>
        <PreviewCell
          uri={photos[0] ?? null}
          caption={captions[0] ?? ''}
          gradient={memePhotoGradients[0]}
          showDivider
        />
        <PreviewCell
          uri={photos[1] ?? null}
          caption={captions[1] ?? ''}
          gradient={memePhotoGradients[1]}
        />
      </View>
      <View style={[styles.row, styles.rowBottom]}>
        <PreviewCell
          uri={photos[2] ?? null}
          caption={captions[2] ?? ''}
          gradient={memePhotoGradients[2]}
          showDivider
        />
        <PreviewCell
          uri={photos[3] ?? null}
          caption={captions[3] ?? ''}
          gradient={memePhotoGradients[3]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    borderRadius: radius.button,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    backgroundColor: colors.cardBgStart,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    height: 110,
  },
  rowBottom: {
    borderTopWidth: 1,
    borderTopColor: '#060D18',
  },
  cell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  cellDivider: {
    borderRightWidth: 2,
    borderRightColor: '#060D18',
  },
  cellImage: {
    ...StyleSheet.absoluteFillObject,
  },
  cellOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  cellPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderEmoji: {
    fontSize: 28,
  },
  captionWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 6,
    paddingHorizontal: 6,
  },
  captionText: {
    color: colors.text,
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 4,
  },
});
