import { ToDoStore } from "./stores/toDoStore";

export class RootStore {
    toDoStore = new ToDoStore()
}