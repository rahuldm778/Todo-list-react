import { useState } from 'react';
import './App.css';

function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [editId, setEditid] = useState('0');

  const handleSubmit = (event) =>{
    event.preventDefault();
    console.log("hii", todo)
    if(editId !== '0'){
      setTodos((prev) =>{
        let todoEdit = todos.find(x => x.id === editId)
        todoEdit.todoText = todo;
        return [...prev.filter(x => x.id !== editId), todoEdit];
      });
    }else{
      setTodos((prev) =>{
        let todoObj = {id: Date.now().toLocaleString(), todoText:todo}
        return [...prev, todoObj];
      });
    }
    
    setTodo('');
    setEditid('0')
  }

  const handleDelete = (iddelete) => {
    setTodos([...todos.filter(x => x.id !== iddelete)]);
  }
  const handleEdit = (idToEdit) => {
    let todoEdit = todos.find(x => x.id === idToEdit);
    setTodo(todoEdit.todoText);
    setEditid(idToEdit);
  }
  return (
    <div className="App">
      <div className='container'>
        <h1>Todo List App</h1>
        <form className='todoForm' onSubmit={handleSubmit}>
          <input value={todo} type="text" onChange={(e) => setTodo(e.target.value)}/>
          <button type='submit'>{editId !== '0' ? "Edit":"Go"}</button>
        </form>
        <ul className='allTodos'>
          {todos.map(x => {
            return <li key={x.id} className='singleTodo'>
                    <span className='todotext'>{x.todoText}</span>
                    <button onClick={() => handleEdit(x.id)}>Edit</button>
                    <button onClick={() => handleDelete(x.id)}>Delete</button>
                  </li>
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
