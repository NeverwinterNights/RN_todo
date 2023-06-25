import {useAppDispatch, useAppSelector} from "../app/store";
import {
    addTodolistTC,
    changeTodolistFilterAC, changeTodolistTitleTC,
    FilterValuesType, removeTodolistTC,
    TodolistDomainType
} from "../features/TodolistsList/todolists-reducer";
import {useCallback} from "react";

export const useTodolists = () => {
    const todolists = useAppSelector<Array<TodolistDomainType>>(state => state.todolists)
    const dispatch = useAppDispatch()


    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todolistId, value)
        dispatch(action)
    }, [])

    const removeTodolist = useCallback(function (id: string) {
        const thunk = removeTodolistTC(id)
        dispatch(thunk)
    }, [])

    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        const thunk = changeTodolistTitleTC(id, title)
        dispatch(thunk)
    }, [])

    const addTodolist = useCallback((title: string) => {
        const thunk = addTodolistTC(title)
        dispatch(thunk)
    }, [dispatch])

    return {todolists, changeFilter, removeTodolist, addTodolist, changeTodolistTitle}


}
