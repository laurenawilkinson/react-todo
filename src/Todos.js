import React, { Component } from 'react';
import TodoItem from './TodoItem'

class Todos extends Component {
  static defaultProps = {
    currentDateView: new Date().toLocaleDateString('en-us')
  }

  state = {
    todos: [],
    currentTodo: '',
    currentTodoId: 0,
    maxChars: 140
  }

  displayedTodos = () => {
    return this.state.todos.filter(x => x.date === this.props.currentDateView);
  }

  setTodos = (todos) => {
    this.setState({ todos })
    localStorage.setItem('todos', JSON.stringify(todos))
  }

  addTodo = async (e) => {
    e.preventDefault();
    
    await this.setState(previousState => ({
      todos: [ 
        ...previousState.todos, 
        { 
          text: previousState.currentTodo,
          id: previousState.currentTodoId,
          date: this.props.currentDateView
        }
      ],
      currentTodo: '',
      currentTodoId: previousState.currentTodoId + 1
    }))

    localStorage.setItem('todos', JSON.stringify(this.state.todos))

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

    this.setTodos(todos);
  }

  toggleCompleteTodo = (id) => {
    const todos = this.state.todos.map(todo => {
      if (todo.id === id)
        todo.completed = !todo.completed
        
      return todo;
    })

    this.setTodos(todos);
  }

  addDisabled = () => {
    return !this.state.currentTodo.length;
  }

  remainingChars = () => {
    return this.state.maxChars - this.state.currentTodo.length;
  }

  componentDidMount () {
    let localTodos = JSON.parse(localStorage.getItem('todos')) || [];
    let localTodoId = localTodos.length > 0 ?
       localTodos[localTodos.length - 1].id + 1 : 0;
    
    this.setState({
      todos: localTodos,
      currentTodoId: localTodoId
    })

    document.getElementById('todoInput').focus()
  }

  render () {
    const { currentTodo, maxChars } = this.state;
    const todoList = this.displayedTodos().length > 0 ? 
      (
        <ul className="todo-list">
          { this.displayedTodos().map(todo => {
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
      (<p className="text-center">Nothing left To-Do To-Day!</p>)

    const addButtonClass = `
      rounded-r-lg bg-indigo-500 flex items-center focus:outline-none text-white font-semibold py-3 px-3 md:px-10
      ${this.addDisabled() ? 'cursor-not-allowed' : 'hover:bg-indigo-400 focus:bg-indigo-400'}`

    const charLabelClass = `mb-5 ml-2 font-bold text-sm tracking-wide
      ${this.remainingChars() < maxChars / 5 
          ? 'text-red-600' 
          : this.remainingChars() < maxChars / 2 
            ? 'text-orange-500' 
            : 'text-gray-400'}`

    return (
      <div className="todos">
        <form className="flex mb-2" onSubmit={ this.addTodo }>
          <input 
            id="todoInput"
            className="rounded-l-lg font-medium bg-gray-800 flex-1 px-3 border-l border-t border-b border-transparent focus:outline-none focus:border-gray-400"
            placeholder="Add a task..."
            type="text"
            maxLength={ maxChars }
            value={ currentTodo } 
            onChange={ this.updateTodo } />
          <button 
            className={ addButtonClass }
            disabled={ this.addDisabled() }>
            <i className="material-icons md:hidden">add</i>
            <span className="hidden md:inline-block">Add</span>
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