import React from 'react'
import {StyleSheet, View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import {connect} from "react-redux";
import { Ionicons } from '@expo/vector-icons';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

class Item extends React.Component {

    toggleFav() {

        let fav = '';

        switch (this.props.fav) {
            case false:
                fav = true;
                break;
            default:
                fav = false;
                break;
        }

        this.props.dispatch({
            type: "SET_FAV",
            value: this.props.data
        });

    }

    render() {

        return (

            <View style={styles.main_container}>

                <ImageBackground
                    style={styles.image}
                    imageStyle={{
                        borderRadius: 10,
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0
                    }}
                    source={{uri: this.props.data.strDrinkThumb}}>

                    <View style={styles.content_container}>

                        <Text style={styles.nickname}>
                            {this.props.data.strDrink}
                        </Text>

                    </View>

                </ImageBackground>

                <View style={styles.btn_container}>

                    <TouchableOpacity
                        onPress={() => this.props.click()}
                        style={styles.btn}>

                        <Ionicons name="md-eye" size={25} color="grey" />

                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => this.toggleFav()}
                        style={styles.btn}>

                        <Ionicons name="md-star" size={25} color={ (this.props.fav.findIndex(film => film.idDrink === this.props.data.idDrink) !== -1) ? 'blue' : 'grey' } />

                    </TouchableOpacity>

                </View>

            </View>

        )

    }

}

const styles = StyleSheet.create({

    main_container: {
        flex: 1,
        margin: 5,
        justifyContent: 'center',
        borderColor: '#ddd',
        borderWidth: 1,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        maxWidth: '50%',
        elevation: 2
    },

    image: {
        flex: 5,
        width: '100%',
        maxHeight: 200,
        minHeight: 200,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },

    content_container: {
        flex: 0.4,
        alignItems: 'center',
        justifyContent: 'center',
    },

    nickname: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#f6f6f7',
    },

    btn_container: {
        flex: 3.5,
        padding: 8,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-evenly',
    },

    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        backgroundColor: 'white',
        borderColor: 'transparent',
        width: 40,
        height: 40,
        borderRadius: 20,
        elevation: 2,
    },

});

const mapStateToProps = state => {
    return {
        fav: state.manageFav.fav,
    }
};

export default connect(mapStateToProps)(Item)
