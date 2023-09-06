import { makeAutoObservable } from 'mobx'
import { TInfo } from '../types/types';
export const baseUrl = 'https://norma.nomoreparties.space/api';

export class ToDoStore {
    constructor() {
        makeAutoObservable(this)
    }

    data:TInfo[] = []

    addTask = (action:TInfo) => {
        return this.data = [...this.data, action]
    }

    deleteTask = (action:number) => {
        return this.data = this.data.filter(elem => elem.id !== action)
    }

    updateTask = (action:TInfo) => {
        let findIndex = this.data.findIndex(elem => elem.id === action.id)
        return [...this.data, this.data[findIndex].value = action.value]
    }
}

