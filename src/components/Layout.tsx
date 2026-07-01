import {ImageBackground, ScrollView} from 'react-native';

const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <ImageBackground
      source={require('../assets/background.png')}
      style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
    </ImageBackground>
  );
};

export default Layout;
