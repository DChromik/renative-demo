/* eslint-disable no-magic-numbers */
import { StyleSheet } from 'react-native';
import { getScaledValue } from 'renative';

export const styles = StyleSheet.create({
    appContainerScroll: {
        paddingTop: getScaledValue(50),
        flex: 1,
    },
    image: {
        width: getScaledValue(83),
        height: getScaledValue(97),
    },
    buttonContainer: {
        marginTop: 20,
        flexDirection: 'row',
    },
});
