import { createStore } from "./core.js";

const initState = [{
    id: 1,
    text: 'hi',
    completed: false
  },{
    id: 2,
    text: 'hello',
    completed: false
  }]

const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ]
    case 'TOGGLE_TODO':
      return state.map(todo =>
        (todo.id === action.id)
          ? {...todo, completed: !todo.completed}
          : todo
      )
    default:
      return state
  }
}

const {getState, subscribe, dispatch} = createStore(reducer)


const $todo = document.querySelector('#todo')
const render = () => {
  $todo.innerHTML = getState().map(task => (
  `<div class='task' data-todo-id=${task.id}>
    <span>${task.text}</span>
    <span>${task.completed ? '⭕' : '❌'}</span>
  </div>`
  )).join('')

  document.querySelectorAll('.task').forEach(task => {
    task.addEventListener('click', ()=> {
      dispatch({type: 'TOGGLE_TODO', id: +task.dataset.todoId})
    })
  })
}

render()
const pub = subscribe(()=>render())

document.querySelector('#unSubscribe').addEventListener('click', ()=> pub.unSubscribe())

