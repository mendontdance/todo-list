import React, { ChangeEvent } from 'react';
import './styles.css';
import ListItem from '../ListItem';
import { useStore } from '../../services/rootStoreContext';
import { observer } from 'mobx-react-lite';
import { TInfo } from '../../services/types/types';
import block from 'bem-cn';

const selector = block('tasks');

const App = observer(() => {

  const [state, setState] = React.useState<TInfo>({
    value: '',
    id: 0
  })

  const { toDoStore } = useStore()
  const { data, addTask } = toDoStore

  const handleClick = () => {
    if (state.value === '') return
    addTask(state)
    setState((prev: TInfo) => {
      return {
        value: '',
        id: prev.id + 1
      }
    })
  }

  return (
    <div className={selector()}>
      <h2 className={selector('title')}>Список задач</h2>
      <div className={selector('list')}>
        {data.map((elem: TInfo) => {
          return <ListItem value={elem.value} key={elem.id} id={elem.id} />
        })}
      </div>
      <div className={selector('add')}>
        <input type="text" onInput={(e: ChangeEvent<HTMLInputElement>) => {
          setState({ ...state, value: e.target.value })
        }} value={state.value} />
        <button type='button' className={selector('button')} onClick={handleClick}>Добавить задачу</button>
      </div>
    </div>
  )
})

export default App