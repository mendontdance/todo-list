import React from 'react';
import './App.css';
import { ListItem } from './components/list-item/ListItem';
import { useStore } from './services/root-store-context';
import { observer } from 'mobx-react-lite';

export const App = observer(() => {

  const [state, setState] = React.useState({
    value: '',
    id: 0
  })

  const { toDoStore } = useStore()
  const { data, addTask } = toDoStore

  const handleClick = () => {
    if (state.value === '') return
    addTask(state)
    setState((prev) => {
      return {
        value: '',
        id: prev.id + 1
      }
    })
  }

  return (
    <div className='container'>
      <h2 className='title'>Список задач</h2>
      <div className='task_list'>
        {data.map((elem) => {
          return <ListItem value={elem.value} key={elem.id} id={elem.id} />
        })}
      </div>
      <div className='task-add'>
        <input type="text" onInput={(e) => {
          setState({ ...state, value: e.target.value })
        }} value={state.value} />
        <button type='button' className='button' onClick={handleClick}>Добавить задачу</button>
      </div>
    </div>
  )
})