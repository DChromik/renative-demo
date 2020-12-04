import React, { useEffect, useRef, Suspense } from 'react';
import { Text, Image, View, ScrollView } from 'react-native';
import { Button, useOpenURL, useNavigate } from 'renative';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';
import Theme, { themeStyles, hasWebFocusableUI } from '../../theme';
import icon from '../../../platformAssets/runtime/logo.png';
import { List } from '../../components/List';
import { styles } from './Home.styles';

type Props = {
    setFocus(id: string): void;
};

const FocusableView = withFocusable()(View);

const ScreenHome = (props: Props) => {
    const navigate = useNavigate(props);
    const openURL = useOpenURL();
    let scrollRef;
    let handleFocus;

    if (hasWebFocusableUI) {
        scrollRef = useRef(null);
        const { setFocus } = props;
        handleFocus = ({ y }) => {
            scrollRef.current.scrollTo({ y });
        };
        useEffect(() => function cleanup() {
            setFocus('menu');
        }, []);
    }
    return (
        <View style={themeStyles.screen}>
            <ScrollView
                style={{ backgroundColor: Theme.color1 }}
                ref={scrollRef}
                contentContainerStyle={themeStyles.container}
            >
                <Suspense fallback={<Text>Fetching list</Text>}>
                    <List onPackshotPress={() => navigate('detail')} />
                </Suspense>
                <Image style={styles.image} source={icon} />
                <FocusableView
                    style={styles.buttonContainer}
                    onBecameFocused={handleFocus}
                >
                    <Button
                        iconFont="fontAwesome"
                        className="focusable"
                        focusKey="github"
                        iconName="github"
                        iconColor={Theme.color3}
                        iconSize={Theme.iconSize}
                        style={themeStyles.icon}
                        onPress={() => {
                            openURL('https://github.com/pavjacko/renative');
                        }}
                    />
                    <Button
                        iconFont="fontAwesome"
                        className="focusable"
                        iconName="twitter"
                        focusKey="twitter"
                        iconColor={Theme.color3}
                        iconSize={Theme.iconSize}
                        style={themeStyles.icon}
                        onPress={() => {
                            openURL('https://twitter.com/renative');
                        }}
                    />
                </FocusableView>
            </ScrollView>
        </View>
    );
};

export const Home = hasWebFocusableUI ? withFocusable()(ScreenHome) : ScreenHome;
