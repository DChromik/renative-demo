import React from 'react';
import { Button, useNavigate } from 'renative';

export const Detail = (props) => {
    const navigate = useNavigate(props);
    return <Button onPress={() => navigate('player')} />;
};
