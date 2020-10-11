import * as React from 'react';
import {FlatList, View} from 'react-native';
import {useEffect, useState} from 'react';
import {RecipeCell} from './RecipeCell';
import {APIClient} from '../../API/APIClient';

export function RecipeListScreen(props) {

    let apiClient = new APIClient()
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
                style={{flex: 1}}
                data={recipesList}
                renderItem={ ({item}) =>
                    <RecipeCell
                        recipeItem={ item }
                />
                }
            />
        )
    }

    return(
        <View style={{flex: 1, width: '100%', paddingHorizontal: 2}}>
            {getList()}
        </View>
    )
}
