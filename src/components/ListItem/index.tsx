import React, { ChangeEvent, ComponentClass } from 'react';
import './styles.css';
import { observer } from 'mobx-react';
import { RootStoreContext } from "../../services/rootStoreContext";
import block from 'bem-cn';

const selector = block('task-item');

interface IListItemProps {
    id: number;
    value: string;
}

interface IListItemState {
    id: number,
    value: string,
    isEdit: boolean
}

class ListItem extends React.Component<IListItemProps, IListItemState> {
    static contextType = RootStoreContext;
    context!: React.ContextType<typeof RootStoreContext>;

    constructor({ id, value }: { id: number, value: string }) {
        super({ id, value });
        this.state = {
            isEdit: false,
            value: value,
            id: id
        }
    }

    handleClickDelete = (): void => {
        const store = this.context.toDoStore;
        store.deleteTask(this.state.id)
    }

    handleClickEdit = () => {
        this.setState({
            ...this.state,
            isEdit: true
        })
    }

    handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const store = this.context?.toDoStore;
        if (e.target.value !== '') {
            this.setState({
                ...this.state,
                isEdit: false,
                value: e.target.value
            })
            store?.updateTask({
                id: this.state.id,
                value: this.state.value
            })
        } else {
            this.setState({
                ...this.state,
                isEdit: false,
            })
        }
    }

    render() {
        const store = this.context?.toDoStore;
        console.log(Array.from(store.data.values()));
        return (
            <div className={selector()}>
                {this.state.isEdit ?
                    <input
                        type='text'
                        className={selector('input')}
                        autoFocus onBlur={this.handleBlur}
                        onInput={(e: ChangeEvent<HTMLInputElement>) => { this.setState({ ...this.state, value: e.target.value }) }}
                    /> :
                    <h2 className={selector('text')}>{this.state.value}</h2>}
                <div className={selector('checkbox-container')}>
                    <label htmlFor="" className={selector('label')}>Статус</label>
                    <input type="checkbox" className={selector('checkbox')} />
                </div>
                <button type='button' className={selector('button')} onClick={this.handleClickEdit}>Редактировать</button>
                <button type='button' className={selector('button')} onClick={this.handleClickDelete}>Удалить</button>
            </div>
        )
    }
}
export default observer(ListItem);

// export const ListItem = observer(({ value, id } : {value:string, id: number}) => {

//     const { toDoStore } = useStore()
//     const { deleteTask, updateTask } = toDoStore

//     const [state, setState] = React.useState({
//         isEdit: false,
//         value: value
//     });

//     const handleClickDelete = ():void => {
//         deleteTask(id)
//     }

//     const handleClickEdit = () => {
//         setState({
//             ...state,
//             isEdit: true
//         })
//     }

//     const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
//         e.preventDefault()
//         if (e.target.value !== '') {
//             setState({
//                 ...state,
//                 isEdit: false,
//                 value: e.target.value
//             })
//             updateTask({
//                 id: id,
//                 value: state.value
//             })
//         } else {
//             setState({
//                 ...state,
//                 isEdit: false,
//             })
//         }
//     }

//     return (
//         <div className={selector()}>
//             {state.isEdit ?
//                 <input type='text' className={selector('input')} autoFocus onBlur={handleBlur} onInput={(e: ChangeEvent<HTMLInputElement>) => {
//                     setState({ ...state, value: e.target.value })
//                 }} /> :
//                 <h2 className={selector('text')}>{value}</h2>}
//             <div className={selector('checkbox-container')}>
//                 <label htmlFor="" className={selector('label')}>Статус</label>
//                 <input type="checkbox" className={selector('checkbox')} />
//             </div>
//             <button type='button' className={selector('button')} onClick={handleClickEdit}>Редактировать</button>
//             <button type='button' className={selector('button')} onClick={handleClickDelete}>Удалить</button>
//         </div>
//     )
// })

// type Props = {
//     id: number,
//     value: string,
// }

// type Propsaaaa = {
//     id: number,
//     value: string,
//     isEdit: boolean
// }

// type CounterProps = {
//     header: string;
//   };

//   type CounterState = {
//     value: number;
//   };

//   class Counter extends React.Component<CounterProps, CounterState>
