import { makeAutoObservable } from 'mobx'
import { TInfo } from '../types/types';
export const baseUrl = 'https://norma.nomoreparties.space/api';

export class ToDoStore {
    constructor() {
        makeAutoObservable(this)
    }

    data: Map<number, TInfo> = new Map()

    addTask = (data:TInfo) => {
        this.data.set(data.id, data)
    }

    deleteTask = (id:number) => {
        this.data.delete(id)
    }

    updateTask = (data:TInfo) => {
        this.data.set(data.id, data)
    }
}

