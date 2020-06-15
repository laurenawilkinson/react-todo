import React, { Component } from 'react';
import TodoItem from './TodoItem'

class Todos extends Component {
  state = {
    todos: [
      { id: 0, text: 'Start learning React', completed: true },
      { id: 1, text: 'Add more to-dos', completed: false }
    ],
    currentTodo: '',
    currentTodoId: 2,
    maxChars: 140
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

  deleteTodo = (id, e = null) => {
    if (e) e.stopPropagation();

    const todos = this.state.todos.filter(todo => todo.id !== id);
    this.setState({ todos })
  }

  toggleCompleteTodo = (id) => {
    const todos = this.state.todos.map(todo => {
      if (todo.id === id)
        todo.completed = !todo.completed
        
      return todo;
    })

    this.setState({ todos })
  }

  addDisabled = () => {
    return !this.state.currentTodo.length;
  }

  remainingChars = () => {
    return this.state.maxChars - this.state.currentTodo.length;
  }

  componentDidMount () {
    document.getElementById('todoInput').focus()
  }

  render () {
    const { currentTodo, todos, maxChars } = this.state;
    const todoList = todos.length > 0 ? 
      (
        <ul className="todo-list">
          { todos.map(todo => {
            return (
              <TodoItem 
                text={ todo.text }
                completed={ todo.completed } 
                id={ todo.id } 
                key={ todo.id } 
                deleteTodo={ this.deleteTodo }
                toggleCompleteTodo={ this.toggleCompleteTodo } />
            )
          }) }
        </ul>
      ) :
      (<p>Nothing left to-do!</p>)

    const addButtonClass = `
      rounded-r-lg bg-teal-500 focus:outline-none text-white font-semibold py-3 px-10
      ${this.addDisabled() ? 'cursor-not-allowed' : 'hover:bg-teal-400 focus:bg-teal-400'}`

    const charLabelClass = `mb-5 ml-2 font-bold text-sm tracking-wide
      ${this.remainingChars() < maxChars / 5 
          ? 'text-red-600' 
          : this.remainingChars() < maxChars / 2 
            ? 'text-orange-500' 
            : 'text-gray-600'}`

    return (
      <div className="todos">
        <form className="flex mb-2" onSubmit={ this.addTodo }>
          <input 
            id="todoInput"
            className="rounded-l-lg font-medium bg-gray-200 flex-1 px-3 border-l border-t border-b border-transparent focus:outline-none focus:border-gray-400"
            placeholder="Add a task..."
            type="text"
            maxLength={ maxChars }
            value={ currentTodo } 
            onChange={ this.updateTodo } />
          <button 
            className={ addButtonClass }
            disabled={ this.addDisabled() }>
            Add
          </button>
        </form>
        <p className={ charLabelClass }>
          { this.remainingChars() }/{ maxChars } Characters Left
        </p>
        { todoList }
      </div>
    );
  }
}

export default Todos;