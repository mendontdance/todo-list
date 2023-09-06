import React, { ChangeEvent } from 'react';
import './styles.css';
import { observer } from 'mobx-react-lite';
import { useStore } from "../../services/rootStoreContext";
import block from 'bem-cn';

const selector = block('task-item');

const ListItem = observer(({ value, id } : {value:string, id: number}) => {

    const { toDoStore } = useStore()
    const { deleteTask, updateTask } = toDoStore

    const [state, setState] = React.useState({
        isEdit: false,
        value: value
    });

    const handleClickDelete = ():void => {
        deleteTask(id)
    }

    const handleClickEdit = () => {
        setState({
            ...state,
            isEdit: true
        })
    }

    const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (e.target.value !== '') {
            setState({
                ...state,
                isEdit: false,
                value: e.target.value
            })
            updateTask({
                id: id,
                value: state.value
            })
        } else {
            setState({
                ...state,
                isEdit: false,
            })
        }
    }

    return (
        <div className={selector()}>
            {state.isEdit ?
                <input type='text' className={selector('input')} autoFocus onBlur={handleBlur} onInput={(e: ChangeEvent<HTMLInputElement>) => {
                    setState({ ...state, value: e.target.value })
                }} /> :
                <h2 className={selector('text')}>{value}</h2>}
            <div className={selector('checkbox-container')}>
                <label htmlFor="" className={selector('label')}>Статус</label>
                <input type="checkbox" className={selector('checkbox')} />
            </div>
            <button type='button' className={selector('button')} onClick={handleClickEdit}>Редактировать</button>
            <button type='button' className={selector('button')} onClick={handleClickDelete}>Удалить</button>
        </div>
    )
})

export default ListItem