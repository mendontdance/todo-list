import React from "react";
import styles from './list-item.module.css'
import { observer } from 'mobx-react-lite';
import { useStore } from "../../services/root-store-context";

export const ListItem = observer(({ value, id }) => {

    const { toDoStore } = useStore()
    const { deleteTask, updateTask } = toDoStore

    const [state, setState] = React.useState({
        isEdit: false,
        value: value
    });

    const handleClickDelete = (e) => {
        e.preventDefault()
        deleteTask(id)
    }

    const handleClickEdit = (e) => {
        e.preventDefault()
        setState({
            ...state,
            isEdit: true
        })
    }

    const handleBlur = (e) => {
        e.preventDefault()
        if (e.target.value !== '') {
            setState({
                ...state,
                isEdit: false,
                state: e.target.value
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
        <div className={styles.list_item}>
            {state.isEdit ?
                <input type='text' className={styles.input_text} autoFocus onBlur={handleBlur} onInput={(e) => {
                    setState({ ...state, value: e.target.value })
                }} /> :
                <h2 className={styles.text}>{value}</h2>}
            <div className={styles.checkbox_container}>
                <label htmlFor="" className={styles.label}>Статус</label>
                <input type="checkbox" className={styles.checkbox} />
            </div>
            <button type='button' className={styles.button} onClick={handleClickEdit}>Редактировать</button>
            <button type='button' className={styles.button} onClick={handleClickDelete}>Удалить</button>
        </div>
    )

})