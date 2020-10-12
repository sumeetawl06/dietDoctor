import * as React from 'react';
import {FlatList, View} from 'react-native';
import {useEffect, useState} from 'react';
import {RecipeCell} from './RecipeCell';
import {APIClient} from '../../API/APIClient';
import {SearchBar} from 'react-native-elements';
import {Constants} from "../../Common/Constants";

export function RecipeListScreen(props) {

    let apiClient = new APIClient()
    const [searchString, setSearchString] = useState('')
    const [recipesList, setRecipesList] = useState(
        [
            {
                name: 'Sumeet'
            },
        ]
    )

    useEffect(() => {
        apiClient.getRecipes().then(response => {
            console.log(JSON.stringify(response.data.listRecipes.recipes))
            setRecipesList(response.data.listRecipes.recipes)
        })
    })

    const getList = () => {
        return (
            <FlatList
                style={{flex: 1, paddingHorizontal: 2,}}
                data={recipesList}
                renderItem={ ({item}) =>
                    <RecipeCell
                        recipeItem={ item }
                />
                }
            />
        )
    }

    const getSearchBar = () => <SearchBar

        containerStyle={{
            borderTopColor: 'transparent',
            borderBottomColor: 'transparent',
            backgroundColor: Constants.colors.themeGreenColor,
            paddingHorizontal: 8,

        }}
        inputContainerStyle={{
            backgroundColor: 'white',
            borderRadius: 6,
            height: 40
        }}
        lightTheme
        onChangeText={query => {setSearchString(query)}}
        onClear={query => {

        }
        }
        icon={{color: 'white'}}
        placeholder={'search'}
        value={searchString}
    />

    return(
        <View style={{flex: 1, width: '100%'}}>
            {getSearchBar()}
            {getList()}
        </View>
    )
}
