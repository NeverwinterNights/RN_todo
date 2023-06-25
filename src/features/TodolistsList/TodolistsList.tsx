import React, {useCallback, useEffect} from 'react'
import {useAppDispatch, useAppSelector} from '../../app/store'
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistTC,
    TodolistDomainType
} from './todolists-reducer'
import {addTaskTC, removeTaskTC, TasksStateType, updateTaskTC} from './tasks-reducer'
import {TaskStatuses} from '../../api/todolists-api'
import {AddItemForm} from '../../components/AddItemForm/AddItemForm'
import {Todolist} from './Todolist/Todolist'
import {ScrollView, View} from "react-native";
import {globalStyles} from "../../../GlobalStyles";
import {useTodolists} from "../../hooks/useTodolists";


export const TodolistsList: React.FC = () => {
    // const todolists = useAppSelector<Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useAppSelector<TasksStateType>(state => state.tasks)
    const dispatch = useAppDispatch()

    const {todolists, changeFilter, removeTodolist, addTodolist, changeTodolistTitle} = useTodolists()

    useEffect(() => {
        const thunk = fetchTodolistsTC()
        dispatch(thunk)
    }, [])

    const removeTask = useCallback(function (id: string, todolistId: string) {
        const thunk = removeTaskTC(id, todolistId)
        dispatch(thunk)
    }, [])

    const addTask = useCallback(function (title: string, todolistId: string) {
        const thunk = addTaskTC(title, todolistId)
        dispatch(thunk)
    }, [])

    const changeStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
        const thunk = updateTaskTC(id, {status}, todolistId)
        dispatch(thunk)
    }, [])

    const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
        const thunk = updateTaskTC(id, {title: newTitle}, todolistId)
        dispatch(thunk)
    }, [])

    // const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
    //     const action = changeTodolistFilterAC(todolistId, value)
    //     dispatch(action)
    // }, [])
    //
    // const removeTodolist = useCallback(function (id: string) {
    //     const thunk = removeTodolistTC(id)
    //     dispatch(thunk)
    // }, [])
    //
    // const changeTodolistTitle = useCallback(function (id: string, title: string) {
    //     const thunk = changeTodolistTitleTC(id, title)
    //     dispatch(thunk)
    // }, [])
    //
    // const addTodolist = useCallback((title: string) => {
    //     const thunk = addTodolistTC(title)
    //     dispatch(thunk)
    // }, [dispatch])


    return <View style={{flex: 1}}>

        <ScrollView style={{flex: 1}}>
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id]

                    return <View key={tl.id}>
                        <View style={{padding: 10, alignItems: "center"}}>
                            <Todolist
                                todolist={tl}
                                tasks={allTodolistTasks}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeTaskStatus={changeStatus}
                                removeTodolist={removeTodolist}
                                changeTaskTitle={changeTaskTitle}
                                changeTodolistTitle={changeTodolistTitle}
                            />
                        </View>
                    </View>
                })
            }
        </ScrollView>
        <View style={[globalStyles.border, {paddingHorizontal: 15}]}>
            <AddItemForm addItem={addTodolist}/>
        </View>
    </View>
}
