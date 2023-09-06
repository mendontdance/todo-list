import { toDoStore } from "./stores/toDoStore";

export class RootStore {
    toDoStore = new toDoStore()
}