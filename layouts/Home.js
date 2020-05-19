import React from 'react';
import {StyleSheet, ImageBackground, View, Text, TouchableOpacity, Image} from 'react-native';

export default class Home extends React.Component {

    render() {

        return (

            <ImageBackground
                style={styles.container}
                source={ require('../assets/_backgrounds/bg.png') }>

                <View
                    style={styles.overlay}>

                    <View style={styles.header}>
                        <Text style={styles.name}>
                            Cocktail Sourd
                        </Text>
                    </View>

                    <View style={styles.sectionLogin}>

                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('List')}
                            style={[styles.btncontainer, {backgroundColor: '#ffffff'}]}>

                            <Image
                                style={styles.icon}
                                source={ require('../assets/icon.png') }/>

                            <View style={styles.btnContent}>
                                <Text style={[styles.text, {color: '#929292'}]}>
                                    Visiter l'application
                                </Text>
                            </View>
                        </TouchableOpacity>

                    </View>

                    <View style={styles.sectionConditions}>
                        <Text style={styles.conditionsTxt}>
                            En visitant l'application, vous acceptez nos Conditions générales et notre Politique de
                            confidentialité.
                        </Text>
                    </View>

                </View>

            </ImageBackground>

        );

    }

}

const styles = StyleSheet.create({

    container: {
        flex: 1
    },

    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.44)',
    },

    icon: {
        left: 25,
        width: 30,
        height: 30,
        resizeMode:'contain',
        position: 'absolute'
    },

    btncontainer: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 30,
        elevation: 3,
    },

    btnContent: {
        width: '100%',
    },

    text: {
        fontSize: 15,
        fontWeight: 'bold',
        alignSelf: 'center'
    },

    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },

    logo: {
        width: 50,
        height: 50,
    },

    name: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 35,
        marginTop: 10
    },

    sectionLogin: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingLeft: 20,
        paddingRight: 20
    },

    sectionConditions: {
        flex: 0.60,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 35,
        paddingRight: 35
    },

    conditionsTxt: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'center',
        fontWeight: 'bold',
    },

    footer: {
        flex:0.5,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },

    footerTxt: {
        color: 'rgba(255,255,255,0.75)',
        fontSize: 13,
    },

});
