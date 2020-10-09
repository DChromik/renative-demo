import React from 'react';
import { View } from 'react-native';
import { Router, navigate } from '@reach/router';
import { Api } from 'renative';

import { Home, Modal, MyPage } from '../screens';
import Menu from '../components/menu';
import { themeStyles } from '../theme';

if (Api.engine !== 'next') {
    // bootstrap fonts for web
    require('../../platformAssets/runtime/fontManager');
}

const styles = {
    container: {
        width: '100%',
        height: '100%',
        position: 'relative' as const
    }
};

const App = () => (
    <View style={[themeStyles.app]}>
        <Menu focusKey="menu" navigate={navigate} />
        <View style={styles.container}>
            <Router>
                <Home path="/" />
                <MyPage path="my-page" />
                <Modal path="modal" />
            </Router>
        </View>
    </View>
);

export default App;
