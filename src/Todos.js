import React, { Component } from 'react';
import TodoItem from './TodoItem'

class Todos extends Component {
  state = {
    todos: [
      { id: 0, text: 'Start learning React', completed: true },
      { id: 1, text: 'Add more to-dos', completed: false }
    ],
    currentTodo: '',
    currentTodoId: 2
  }

  addTodo = (e) => {
    e.preventDefault();
    this.setState(previousState => ({
      todos: [ 
        ...previousState.todos, 
        { 
          text: previousState.currentTodo,
          id: previousState.currentTodoId
        }
      ],
      currentTodo: '',
      currentTodoId: previousState.currentTodoId + 1
    }))
    document.getElementById('todoInput').focus();
  }

  updateTodo = (e) => {
    this.setState({
      currentTodo: e.target.value
    })
  }

  deleteTodo = (id) => {
    const todos = this.state.todos.filter(todo => todo.id !== id);
    this.setState({ todos })
  }

  componentDidMount () {
    document.getElementById('todoInput').focus()
  }

  render () {
    const todoList = this.state.todos.length > 0 ? 
      (
        <ul className="todo-list">
          { this.state.todos.map(todo => {
            return (
              <TodoItem 
                text={ todo.text } 
                id={ todo.id } 
                key={ todo.id } 
                deleteTodo={ this.deleteTodo } />
            )
          }) }
        </ul>
      ) :
      (<p>Nothing left to-do!</p>)

    return (
      <div className="todos">
        <form className="flex mb-5" onSubmit={ this.addTodo }>
          <input 
            id="todoInput"
            className="rounded-l-lg bg-gray-200 flex-1 px-3"
            placeholder="Add a task..."
            type="text" 
            value={ this.state.currentTodo } 
            onChange={ this.updateTodo } />
          <button className="rounded-r-lg bg-teal-500 text-white font-semibold py-3 px-10">Add</button>
        </form>
        { todoList }
      </div>
    );
  }
}

export default Todos;