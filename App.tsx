import React, {useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {CompletedStoriesProvider} from './src/context/CompletedStoriesContext';
import {JokesProvider} from './src/context/JokesContext';
import {MainApp} from './src/navigation/MainApp';
import {Intro} from './src/screens/Intro';
import {Loader} from './src/screens/Loader';

function App(): React.JSX.Element {
  const [loaderDone, setLoaderDone] = useState(false);
  const [introDone, setIntroDone] = useState(false);

  return (
    <SafeAreaProvider>
      {!loaderDone ? (
        <Loader onFinish={() => setLoaderDone(true)} />
      ) : introDone ? (
        <JokesProvider>
          <CompletedStoriesProvider>
            <MainApp />
          </CompletedStoriesProvider>
        </JokesProvider>
      ) : (
        <Intro onFinish={() => setIntroDone(true)} />
      )}
    </SafeAreaProvider>
  );
}

export default App;
