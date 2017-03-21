import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { getStyleFromProps } from '../../utils';

export default class Logo extends Component {
    render() {
        const style = [
            logoStyle.imageContainer,
            getStyleFromProps(['marginTop'], this.props)
        ];
        return (
            <View style={style}>
                <Image
                    source={require('../../images/Hoola_Small.png')}
                    resizeMode="cover"
                />
            </View>
        );
    }
}

Logo.propTypes = {
    marginTop: PropTypes.number
};

const logoStyle = StyleSheet.create({
    imageContainer: {
        alignItems: 'center',
        marginTop: 30
    },
    image: {
        flexGrow:1,
        width: 110,
        height:110
    }
});
