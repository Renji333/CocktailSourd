import React from 'react';
import {StyleSheet, Image, FlatList, Text, TouchableOpacity, View, ActivityIndicator} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import Item from '../components/Item';

class List extends React.Component {

    constructor(props) {
        super(props);
        this._pickImage = this._pickImage.bind(this);
        this.state = {
            isLoading: false,
        };
        this.getPermissionAsync();
    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    };

    _pickImage = async () => {
        this.setState({
            isLoading: true,
        });
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.cancelled) {
                this.props.dispatch({
                    type: "SET_AVATAR",
                    value: result.uri
                });
                this.setState({ isLoading: false});
            }

            console.log(result);
        } catch (E) {
            console.log(E);
        }
        this.setState({ isLoading: false});
    };

    _renderLoading() {
        if (this.state.isLoading) {
            return (
                <ActivityIndicator
                    style={styles.loading}
                    size="large"
                    color={'purple'} />
            )
        }
    }

    _renderImageProfil() {
        if(this.props.user.avatar) {
            return (
                <Image
                    style={styles.avatar}
                    source={{uri: this.props.user.avatar}} />
            )
        } else {
            return (
                <Image
                    style={styles.avatar}
                    source={require('./../assets/user_default.png')} />
            )
        }
    }

    render() {

        return (

            <SafeAreaView>

                <View style={styles.containerHeader}>

                    <TouchableOpacity
                        style={styles.touchable}
                        onPress={() => this._pickImage()}>

                        {this._renderImageProfil()}
                        {this._renderLoading()}

                    </TouchableOpacity>



                </View>

                <FlatList
                    style={styles.list}
                    numColumns={2}
                    data={this.props.fav}
                    renderItem={({ item }) => (

                        <Item
                            data={item}
                            click={() => this.props.navigation.navigate('Details', {
                                id: item.idDrink
                            })}/>

                    )}
                    keyExtractor={item => item.idDrink} />

            </SafeAreaView>

        );

    }

}

const styles = StyleSheet.create({

    touchable: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    avatar: {
        borderColor: 'white',
        borderWidth: 2,
        width: 50,
        height: 50,
        borderRadius: 25,
    },

    containerHeader: {
        backgroundColor: 'purple',
        height: 70,
        alignItems: 'center',
        paddingLeft: 25,
        paddingRight: 20,
        flexDirection: 'row',
    },

    titleHeader: {
        flex:1,
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 2
    }

});

const mapStateToProps = state => {
    return {
        user: state.manageUser.user,
        fav: state.manageFav.fav,
    }
};

export default connect(mapStateToProps)(List)
