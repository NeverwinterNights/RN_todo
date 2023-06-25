import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
}

export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.value);

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.value);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }
    const changeTitle = (e: string) => {
        setTitle(e)
    }

    return editMode
        ? <View style={{flexDirection: "row"}}>
            <TextInput value={title} onChangeText={changeTitle} style={styles.input}/>
            <View>
                <Ionicons onPress={activateViewMode} name="checkmark" color={"black"} size={30}/>
            </View>
        </View>

        : <Text style={{fontSize: 20, fontWeight: "600"}} onLongPress={activateEditMode}>{props.value}</Text>
});
const styles = StyleSheet.create({
    input: {
        width: 150,
        backgroundColor: "#d3b9b9",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 4,
    }
});
