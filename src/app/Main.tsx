import React from 'react'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {useAppSelector} from './store'
import {RequestStatusType} from './app-reducer'
// import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {View} from "react-native";


export function Main() {
    const status = useAppSelector<RequestStatusType>((state: { app: { status: any } }) => state.app.status)
    return (
        <View style={{flex:1}}>
            {/*<ErrorSnackbar/>*/}
            <View style={{flex:1}}>
                <TodolistsList/>
            </View>
        </View>
    )
}


