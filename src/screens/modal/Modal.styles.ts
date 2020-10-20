/* eslint-disable no-magic-numbers */
import { StyleSheet } from 'react-native';
import { getScaledValue } from 'renative';

export const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: getScaledValue(80),
        alignItems: 'flex-end',
        paddingTop: getScaledValue(20),
    },
});
