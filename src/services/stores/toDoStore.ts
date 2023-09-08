import { action, makeObservable, observable } from 'mobx'
import { TInfo } from '../types/types';

export class ToDoStore {
    constructor() {
        makeObservable(this)
    }

    @observable data: Map<number, TInfo> = new Map()

    @action addTask = (data: TInfo) => {
        this.data.set(data.id, data)
    }

    @action deleteTask = (id: number) => {
        this.data.delete(id)
    }

    @action updateTask = (data: TInfo) => {
        this.data.set(data.id, data)
    }
}

