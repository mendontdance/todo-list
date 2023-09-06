import { makeAutoObservable } from 'mobx'
export const baseUrl = 'https://norma.nomoreparties.space/api';

export class toDoStore {
    constructor() {
        makeAutoObservable(this)
    }

    data = []

    addTask = (action) => {
        return this.data = [...this.data, action]
    }

    deleteTask = (action) => {
        return this.data = this.data.filter(elem => elem.id !== action)
    }

    updateTask = (action) => {
        let findIndex = this.data.findIndex(elem => elem.id === action.id)
        return [...this.data, this.data[findIndex].value = action.value]
    }
}

