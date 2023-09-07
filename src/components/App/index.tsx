import React, { ChangeEvent, ComponentClass } from 'react';
import './styles.css';
import ListItem from '../ListItem';
import { RootStoreContext, useStore } from '../../services/rootStoreContext';
import { observer } from 'mobx-react';
import { TInfo } from '../../services/types/types';
import block from 'bem-cn';

const selector = block('tasks');

class App extends React.Component {
  static contextType = RootStoreContext;
  context!: React.ContextType<typeof RootStoreContext>;

  state: TInfo = {
    value: '',
    id: 0,
  }

  handleClick = () => {
    if (!this.state.value) {
      return;
    }
    const store = (this.context as any).toDoStore;
    store.addTask(this.state)
    this.setState((prev: TInfo) => {
      return {
        value: '',
        id: prev.id + 1
      }
    })
  }

  render() {
    if (!this.context) {
      return null;
    }
    const { data } = this.context.toDoStore;

    return (
      <div className={selector()}>
        <h2 className={selector('title')}>Список задач</h2>
        <div className={selector('list')}>
          {Array.from(data.values()).map(({ id, value }: { id: number, value: string }) => {
            const props = {
              value: value,
              key: id,
              id: id
            }
            return <ListItem {...props} />
          })}
        </div>
        <div className={selector('add')}>
          <input
            type="text"
            value={this.state.value}
            onInput={(e: ChangeEvent<HTMLInputElement>) => {
              this.setState({ ...this.state, value: e.target.value })
            }}
          />
          <button type='button' className={selector('button')} onClick={this.handleClick}>Добавить задачу</button>
        </div>
      </div>
    )
  }
}

export default observer<ComponentClass>(App);

// const App = observer(() => {

//   const [state, setState] = React.useState<TInfo>({
//     value: '',
//     id: 0
//   })

//   const { toDoStore } = useStore()
//   const { data, addTask } = toDoStore

//   const handleClick = () => {
//     if (state.value === '') return
//     addTask(state)
//     setState((prev: TInfo) => {
//       return {
//         value: '',
//         id: prev.id + 1
//       }
//     })
//   }

//   return (
//     <div className={selector()}>
//       <h2 className={selector('title')}>Список задач</h2>
//       <div className={selector('list')}>
//         {data.map((elem: TInfo) => {
//           return <ListItem value={elem.value} key={elem.id} id={elem.id} />
//         })}
//       </div>
//       <div className={selector('add')}>
//         <input type="text" onInput={(e: ChangeEvent<HTMLInputElement>) => {
//           setState({ ...state, value: e.target.value })
//         }} value={state.value} />
//         <button type='button' className={selector('button')} onClick={handleClick}>Добавить задачу</button>
//       </div>
//     </div>
//   )
// })
