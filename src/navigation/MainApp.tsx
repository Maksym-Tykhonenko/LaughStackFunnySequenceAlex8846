import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  BottomTabBar,
  MainTabId,
} from '../components/jokes/BottomTabBar';
import {AddJokeScreen} from '../screens/AddJoke';
import {JokesScreen} from '../screens/Jokes';
import {FriendsScreen} from '../screens/Friends';
import {GameSetup} from '../screens/GameSetup';
import {GameSession} from '../screens/GameSession';
import {MemesScreen} from '../screens/Memes';
import {FocusScreen} from '../screens/Focus';
import {RecallSession} from '../screens/RecallSession';
import {SequenceScreen} from '../screens/Sequence';
import {StoryPuzzle} from '../screens/StoryPuzzle';
import {useCompletedStoriesContext} from '../context/CompletedStoriesContext';
import {GameConfig} from '../types/game';
// libs
import ReactNativeIdfaAaid, {
  AdvertisingInfoResponse,
} from '@sparkfabrik/react-native-idfa-aaid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LogLevel, OneSignal} from 'react-native-onesignal';
import AppleAdsAttribution from '@vladikstyle/react-native-apple-ads-attribution';
import DeviceInfo from 'react-native-device-info';
//import {buildExtInfo} from '../services/buildExtInfo';
import {
  getTrackingStatus,
  requestTrackingPermission,
} from 'react-native-tracking-transparency';
import { Alert, AppState } from 'react-native';
////

type JokesView = 'list' | 'add';
type FriendsView = 'party' | 'setup' | 'playing';
type SequenceView = 'list' | 'puzzle';
type RecallView = 'focus' | 'playing';

export function MainApp(): React.JSX.Element {
  const [mainTab, setMainTab] = useState<MainTabId>('jokes');
  const [jokesView, setJokesView] = useState<JokesView>('list');
  const [friendsView, setFriendsView] = useState<FriendsView>('party');
  const [gameConfig, setGameConfig] = useState<GameConfig | null>(null);
  const [sequenceView, setSequenceView] = useState<SequenceView>('list');
  const [activeStoryId, setActiveStoryId] = useState<string | null>(null);
  const [recallView, setRecallView] = useState<RecallView>('focus');
  const [recallSessionKey, setRecallSessionKey] = useState(0);
  const {markComplete} = useCompletedStoriesContext();

  useEffect(() => {
    if (mainTab !== 'jokes') {
      setJokesView('list');
    }
    if (mainTab !== 'friends') {
      setFriendsView('party');
      setGameConfig(null);
    }
    if (mainTab !== 'sequence') {
      setSequenceView('list');
      setActiveStoryId(null);
    }
    if (mainTab !== 'game') {
      setRecallView('focus');
    }
  }, [mainTab]);

  const exitGame = () => {
    setFriendsView('party');
    setGameConfig(null);
  };

  const content = (() => {
    if (mainTab === 'memes') {
      return <MemesScreen />;
    }

    if (mainTab === 'friends') {
      if (friendsView === 'playing' && gameConfig) {
        return (
          <GameSession
            key={`${gameConfig.members.map(m => m.id).join('-')}-${gameConfig.rounds}-${gameConfig.turnSeconds}`}
            config={gameConfig}
            onExit={exitGame}
            onNewGame={() => {
              setFriendsView('setup');
              setGameConfig(null);
            }}
          />
        );
      }
      if (friendsView === 'setup') {
        return (
          <GameSetup
            onBack={() => setFriendsView('party')}
            onStartGame={config => {
              setGameConfig(config);
              setFriendsView('playing');
            }}
          />
        );
      }
      return (
        <FriendsScreen onStartGame={() => setFriendsView('setup')} />
      );
    }

    if (mainTab === 'sequence') {
      if (sequenceView === 'puzzle' && activeStoryId) {
        return (
          <StoryPuzzle
            storyId={activeStoryId}
            onBack={() => {
              setSequenceView('list');
              setActiveStoryId(null);
            }}
            onComplete={storyId => markComplete(storyId)}
          />
        );
      }
      return (
        <SequenceScreen
          onOpenStory={storyId => {
            setActiveStoryId(storyId);
            setSequenceView('puzzle');
          }}
        />
      );
    }

    if (mainTab === 'game') {
      if (recallView === 'playing') {
        return (
          <RecallSession
            key={recallSessionKey}
            onExit={() => setRecallView('focus')}
          />
        );
      }
      return (
        <FocusScreen
          onStart={() => {
            setRecallSessionKey(k => k + 1);
            setRecallView('playing');
          }}
        />
      );
    }

    if (mainTab !== 'jokes') {
      return null;
    }

    if (jokesView === 'add') {
      return <AddJokeScreen onBack={() => setJokesView('list')} />;
    }

    return <JokesScreen onAddJoke={() => setJokesView('add')} />;
  })();

  const showTabBar =
    (mainTab !== 'jokes' || jokesView === 'list') &&
    friendsView === 'party' &&
    sequenceView === 'list' &&
    recallView === 'focus';

  return (
    <View style={styles.root}>
      <View style={styles.body}>{content}</View>
      {showTabBar ? (
        <BottomTabBar
          active={mainTab}
          onChange={tab => {
            setMainTab(tab);
            setJokesView('list');
            setFriendsView('party');
            setGameConfig(null);
            setSequenceView('list');
            setActiveStoryId(null);
            setRecallView('focus');
          }}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  body: {
    flex: 1,
  },
});
