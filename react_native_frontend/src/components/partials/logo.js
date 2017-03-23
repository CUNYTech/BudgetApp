import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { getStyleFromProps } from '../../utils';

export default class Logo extends Component {
    render() {
        const style = [
            logoStyle.imageContainer,
            getStyleFromProps(['marginTop'], this.props)
        ];
        return (
            <View style={style}>
              <Text style={{fontWeight: '600',fontSize:90, fontFamily: 'OpenSans', color:'pink'}}>Scale</Text>
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
