import React, {useState} from 'react';
import {FlatList, Image, ImageBackground, NativeModules, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Icon, SearchBar} from 'react-native-elements';
import StarRating from '../StarRating/star-rating';
import {assertLeafType} from 'graphql';
import ImageLoad from 'react-native-image-placeholder';


export function RecipeCell(props) {

    const [data, setData] = useState(props.recipeItem)
    const [category, setCategory] = useState(['Food','pizza', 'BreakFast','Food','pizza', 'BreakFast'])
    const ratingObj = {
        ratings: 3,
        views: 34000
    }
    const { ReactBridgeManager } = NativeModules

    function getStars(rating) {
        let stars = [];
        for (var i = 1; i <= 5; i++) {
            // set the path to filled stars
            let path = require('../StarRating/star-filled.png');
            // If ratings is lower, set the path to unfilled stars
            if (i > rating) {
                path = require('../StarRating/star-unfilled.png');
            }
            stars.push((<Image style={styles.image} source={path} />));
        }
        return stars
    }

    const addRatingsView = (rating) => <View style={ styles.rating }>
        { getStars(rating) }
    </View>

    return (
        <View style = { styles.container } >
            <ImageLoad
                source={ data.images ? {uri: 'https://i.dietdoctor.com'+data.images.hz} : require('./dish1.png')}
                style={{
                    zIndex: 0,
                    width: '100%',
                    height: '100%',
                    alignSelf: 'center',
                }}
            >
                <TouchableOpacity
                    onPress={() => {
                        ReactBridgeManager.getSystemLanguage( (lang) => {
                            alert(lang)
                        })
                    }}>
                    <View
                        style={{
                            top: 10,
                            right: 10,
                            position: 'absolute',
                            zIndex: 1000,
                            width: 50,
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Icon
                            name={'favorite-border'}
                            color={'white'}
                            size={30}
                        />
                    </View>
                </TouchableOpacity>
            </ImageLoad>
            <View
                style={{
                    position: 'absolute',
                    bottom: 0,
                    alignSelf: 'flex-end',
                    height: 'auto',
                    width: '100%',
                    marginBottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.4)'
                }}
            >
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    top: 5,
                }}>
                    <Text style={{ textAlign: 'left',left: 10, fontSize: 19, color: 'white', fontWeight: "bold"}}> {data.title}</Text>
                </View>
                <View style={{
                    marginTop: 5,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 15
                }}>
                    {addRatingsView(data.rating)}
                    <TouchableOpacity
                        onPress={ () => {
                            ReactBridgeManager.navigateToNativeModule(data.nutrition.values)
                        }}
                    >
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginHorizontal: 10,
                            justifyContent: 'flex-end'
                        }}>
                            <Text style={{
                                color: 'white',
                                fontSize: 15,
                                fontWeight: 'bold',
                            }}> Nutrition Details </Text>
                            <Icon
                                name={'keyboard-arrow-right'}
                                color={'white'}
                                size={30}
                            />
                        </View>
                    </TouchableOpacity>
                    {/*<View style={{*/}
                    {/*    borderRadius: 17.5,*/}
                    {/*    backgroundColor: 'green',*/}
                    {/*    marginRight: 20,*/}
                    {/*    height: 30,*/}
                    {/*    minWidth:30,*/}
                    {/*    alignItems: 'center',*/}
                    {/*    justifyContent: 'center'*/}
                    {/*}}>*/}
                    {/*    <Text style={{*/}
                    {/*        color: 'white',*/}
                    {/*        fontSize: 15,*/}
                    {/*    }}> 4g </Text>*/}
                    {/*</View>*/}
                </View>
                <FlatList
                    style={{
                        marginHorizontal: 10,
                        bottom: 10
                    }}
                    horizontal={true}
                    data={category}
                    showsHorizontalScrollIndicator={false}
                    renderItem={ ({item}) => <View>
                        <Text style={{
                            borderColor: 'white',
                            borderWidth: 1,
                            padding: 5,
                            marginHorizontal: 5,
                            borderRadius: 15,
                            fontWeight: 'bold',
                            color: 'white'
                        }}>
                            {item}
                        </Text>
                    </View>}
                    direction
                />

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        width: '100%',
        height: 20,
        flexDirection: 'column',
        resizeMode: 'contain'
    },
    text: {
        color: "grey",
        fontSize: 30,
        fontWeight: "bold"
    },
    rating: {
        marginLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        height: 35,
        width: 140

    },
    container: {
        flex: 1,
        flexDirection: 'column',
        marginVertical: 5,
        height: 450,
        borderRadius:4
    },
    backgroundImage: {
        width: '100%',
        height: '100%'
    }
});
