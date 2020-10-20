/* eslint-disable no-magic-numbers */
import { StyleSheet } from 'react-native';
import { getScaledValue } from 'renative';
import Theme from '../theme';

export const styles = StyleSheet.create({
    headerTitle: {
        color: Theme.color3,
        fontFamily: Theme.primaryFontFamily,
        fontSize: getScaledValue(18),
    },
    header: {
        backgroundColor: Theme.color1,
        borderBottomWidth: 1,
        height: getScaledValue(70),
    },
});
