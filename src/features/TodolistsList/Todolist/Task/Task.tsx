import React, {useCallback} from 'react'
import {EditableSpan} from '../../../../components/EditableSpan/EditableSpan'
import {TaskStatuses, TaskType} from '../../../../api/todolists-api'
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {Checkbox} from "expo-checkbox";

type TaskPropsType = {
    task: TaskType
    todolistId: string
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
}
export const Task = React.memo((props: TaskPropsType) => {
    const onClickHandler = useCallback(() => props.removeTask(props.task.id, props.todolistId), [props.task.id, props.todolistId]);

    const onChangeHandler = useCallback((e: boolean) => {
        props.changeTaskStatus(props.task.id, e ? TaskStatuses.Completed : TaskStatuses.New, props.todolistId)
    }, [props.task.id, props.todolistId]);

    const onTitleChangeHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId)
    }, [props.task.id, props.todolistId]);




    return <View key={props.task.id}
                 style={props.task.status === TaskStatuses.Completed ? {
                     ...styles.task,
                     opacity: 0.4
                 } : {...styles.task}}
    >
        <View style={{flexDirection: "row"}}>
            <Checkbox
                value={props.task.status === TaskStatuses.Completed}
                onValueChange={onChangeHandler}
                style={{marginRight: 15}}
            />

            <EditableSpan value={props.task.title} onChange={onTitleChangeHandler}/>
        </View>
        <TouchableOpacity style={{marginLeft: 10}} onPress={onClickHandler}>
            <Ionicons name="trash-outline" size={30} color={"black"}/>
        </TouchableOpacity>
    </View>
})


const styles = StyleSheet.create({
    task: {
        flexDirection: "row",
        alignItems: "center",
        padding: 4,
        justifyContent: "space-between"
    }
});
