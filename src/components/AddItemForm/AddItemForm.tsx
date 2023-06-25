import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import {StyleSheet} from "react-native";


type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
}

export const AddItemForm = React.memo(function ({addItem, disabled = false}: AddItemFormPropsType) {

    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const addItemHandler = () => {
        if (title.trim() !== '') {
            addItem(title);
            setTitle('');
        } else {
            setError('Title is required');
        }
    }

    const onChangeHandler = (e: string) => {
        setTitle(e)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.charCode === 13) {
            addItemHandler();
        }
    }

    return <View style={{flexDirection: "row", marginVertical: 10}}>

        <TextInput value={title} onChangeText={onChangeHandler} style={styles.input}/>
        <View>
            <TouchableOpacity onPress={addItemHandler}>
                <Ionicons name="add" size={39} color="black"/>
            </TouchableOpacity>
        </View>
    </View>
})

const styles = StyleSheet.create({
    input: {
        width: "90%",
        backgroundColor: "#d3b9b9",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 4
    }
});
