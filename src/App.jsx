import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, toggleTodo, deleteTodo } from './redux/todosSlice';
import check from './assets/images/check.svg'
import del from './assets/images/delete.svg'
import back from './assets/images/back.svg'

function App() {
  const [newTodoText, setNewTodoText] = useState('');
  const todos = useSelector((state) => state.todo);
  const dispatch = useDispatch();
  const taskBack = useState(false)
  const incompleteTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  const handleAddTodo = () => {
    if (newTodoText.trim() !== '') {
      dispatch(addTodo(newTodoText));
      setNewTodoText('');
    }
  };

  return (
    <>
      <div className="todoContainer">
        <div className="todoAddWrap">
          <input
            type="text"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            placeholder="Add a new Task"
          />
          <button className='taskAdd' onClick={handleAddTodo}>+</button>
        </div>
        <h1 className='tasks'>Tasks</h1>
        <ul>
          {incompleteTodos.map((todo) => (
            <li key={todo.id} className="todoItem">
              <p className='todoText'>{todo.text}</p>
              <div className="deeds">
                <button className='todoDone' onClick={() => dispatch(toggleTodo(todo.id))}>
                  <img src={check} alt="Complete" />
                </button>
                <button className='todoDel' onClick={() => dispatch(deleteTodo(todo.id))}>
                  <img src={del} alt="Delete" />
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="doneBar">
          <h1 className='done'>Done</h1>
          <ul className="todoDones">
            {completedTodos.map((todo) => (
              <li key={todo.id} className="todoItem">
                <p className='todoDoneText'>{todo.text}</p>
                <div className="deeds">
                  <button onClick={() => dispatch(toggleTodo(todo.id))}>
                    <img src={back} alt="Back" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
