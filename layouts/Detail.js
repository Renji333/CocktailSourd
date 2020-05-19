import React from 'react';
import {StyleSheet, Image, ScrollView, Text, TouchableOpacity, View, ActivityIndicator} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import {Ionicons} from "@expo/vector-icons";

class Detail extends React.Component {

    constructor(props) {
        super(props);
        this._pickImage = this._pickImage.bind(this);
        this.state = {
            data: null,
            isLoading: false,
        };
        this.getPermissionAsync();
    }

    componentDidMount() {

        this.getDataFromApi();

    }

    toggleFav() {

        let fav = '';

        switch (this.state.data) {
            case false:
                fav = true;
                break;
            default:
                fav = false;
                break;
        }

        this.props.dispatch({
            type: "SET_FAV",
            value: this.state.data
        });

    }

    getDataFromApi() {
        let _this = this;
        let id  = this.props.route.params.id;
        fetch('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='+ id )
            .then((response) => response.json())
            .then((json) => {
                _this.setState({
                    data: json.drinks[0]
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

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

    getContent() {
        if (this.state.data != null) {
            return (
                <View style={styles.containerImage}>

                    <TouchableOpacity
                        onPress={() => this.toggleFav()}
                        style={styles.btn}>

                        <Ionicons name="md-star" size={25} color={ (this.props.fav.findIndex(film => film.idDrink === this.props.route.params.id) !== -1) ? 'blue' : 'grey' } />

                    </TouchableOpacity>

                    <ScrollView style={styles.scrollView}
                    contentContainerStyle={{
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>

                        <Image
                            style={styles.thumb}
                            source={{uri: this.state.data.strDrinkThumb}} />

                        <Text  style={styles.title}>{ this.state.data.strDrink }</Text>
                        <Text  style={styles.subtitle}>{ this.state.data.strCategory }</Text>
                        <Text></Text>
                        <Text  style={styles.subtitle}>Instructions :</Text>
                        <Text  style={styles.subtitle}>{ this.state.data.strInstructions }</Text>
                        <Text></Text>
                        <Text  style={styles.subtitle}> Ingredients : </Text>
                        <Text  style={styles.lasttitle}>{ this.state.data.strIngredient1 }</Text>
                        <Text  style={styles.lasttitle}>{ this.state.data.strIngredient2 }</Text>
                        <Text  style={styles.lasttitle}>{ this.state.data.strIngredient3 }</Text>
                        <Text  style={styles.lasttitle}>{ this.state.data.strIngredient4 }</Text>

                    </ScrollView>

                </View>
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

                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Favs')}
                        style={styles.btnFav}>

                        <Ionicons name="md-star" size={20} color="white" />

                    </TouchableOpacity>

                </View>

                { this.getContent() }

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

    thumb: {

        width: 200,
        height: 200,

    },

    btn: {
        alignSelf: 'flex-end',
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

    title: {
        color: 'grey',
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    subtitle: {
        color: 'grey',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    lasttitle: {
        color: 'grey',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold'
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
    },

    containerImage: {

        margin: 10,
        padding: 10,
        elevation: 2,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'

    },

    scrollView: {
        marginHorizontal: 20,
    },

    btnFav: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        backgroundColor: 'transparent',
        borderColor: 'white',
        width: 30,
        height: 30,
        borderRadius: 15,
        elevation: 2,
    },

});

const mapStateToProps = state => {
    return {
        user: state.manageUser.user,
        fav: state.manageFav.fav,
    }
};

export default connect(mapStateToProps)(Detail)
