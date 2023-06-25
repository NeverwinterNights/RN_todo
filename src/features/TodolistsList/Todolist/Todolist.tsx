import React, {useCallback, useEffect} from 'react'
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm'
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan'
import {Task} from './Task/Task'
import {TaskStatuses, TaskType} from '../../../api/todolists-api'
import {FilterValuesType, TodolistDomainType} from '../todolists-reducer'
import {fetchTasksTC} from '../tasks-reducer'
import {useAppDispatch} from "../../../app/store";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

type PropsType = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
}

export const Todolist = React.memo(function ({...props}: PropsType) {


    const dispatch = useAppDispatch()
    useEffect(() => {
        const thunk = fetchTasksTC(props.todolist.id)
        dispatch(thunk)
    }, [])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todolist.id)
    }, [props.addTask, props.todolist.id])

    const removeTodolist = () => {
        props.removeTodolist(props.todolist.id)
    }
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.todolist.id, title)
    }, [props.todolist.id, props.changeTodolistTitle])


    const onAllClickHandler = useCallback(() => props.changeFilter('all', props.todolist.id), [props.todolist.id, props.changeFilter])
    const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.todolist.id), [props.todolist.id, props.changeFilter])
    const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.todolist.id), [props.todolist.id, props.changeFilter])


    let tasksForTodolist = props.tasks

    if (props.todolist.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.todolist.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return <View style={styles.container}>
        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
            <EditableSpan value={props.todolist.title} onChange={changeTodolistTitle}/>
            {props.todolist.entityStatus !== 'loading' &&
                <TouchableOpacity style={{marginLeft: 10}} onPress={removeTodolist}>
                    <Ionicons name="trash-outline" size={30} color={"black"}/>
                </TouchableOpacity>
            }
        </View>
        <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === 'loading'}/>
        <View style={{padding: 8}}>
            {
                tasksForTodolist.map(t => <Task key={t.id} task={t} todolistId={props.todolist.id}
                                                removeTask={props.removeTask}
                                                changeTaskTitle={props.changeTaskTitle}
                                                changeTaskStatus={props.changeTaskStatus}
                />)
            }
        </View>
        <View style={{flexDirection: "row", justifyContent: "center", gap: 8}}>
            <TouchableOpacity onPress={onAllClickHandler} style={props.todolist.filter === 'all' ? {
                ...styles.button, backgroundColor: "green"
            } : {...styles.button}}>
                <Text style={{color: "white"}}>All</Text></TouchableOpacity>
            <TouchableOpacity onPress={onActiveClickHandler} style={props.todolist.filter === 'active' ? {
                ...styles.button, backgroundColor: "green"
            } : {...styles.button}}><Text
                style={{color: "white"}}>Active</Text></TouchableOpacity>
            <TouchableOpacity onPress={onCompletedClickHandler} style={props.todolist.filter === 'completed' ? {
                ...styles.button, backgroundColor: "green"
            } : {...styles.button}}><Text
                style={{color: "white"}}>Completed</Text></TouchableOpacity>
        </View>
    </View>;
})
// }, (prevProps, nextProps) => prevProps !== nextProps)

const styles = StyleSheet.create({
    container: {
        width: "80%",
        backgroundColor: "white",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "black",
        paddingHorizontal: 5,
        paddingVertical: 15
    },
    button: {
        width: 90,
        backgroundColor: "grey",
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
        borderRadius: 5
    }
});
