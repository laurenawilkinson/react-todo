import React, { Component } from 'react';
import TodoItem from './TodoItem'

class Todos extends Component {
  static defaultProps = {
    currentDateView: new Date()
  }

  constructor (props) {
    super(props);

    let localTodos = JSON.parse(localStorage.getItem('todos')) || [];
    let localTodoId = localTodos.length > 0 ?
       localTodos[localTodos.length - 1].id + 1 : 0;

    this.state = {
      todos: localTodos,
      currentTodo: '',
      currentTodoId: localTodoId,
      maxChars: 140
    }
  }

  getMigratableTodos = () => {
    return this.state.todos.filter(todo => {
      // convert date strings into objects 
      // (some strings may be US format, though the standard now is yyyy/mm/dd)
      const todoDate = this.props.formatDate(new Date(todo.date));
      const currentDate = this.props.formatDate(new Date(this.props.todaysDate));

      return todoDate < currentDate && !todo.completed;
    })
  }

  removeMigratableTodos = () => {
    const idsToRemove = this.getMigratableTodos().map(x => x.id);
    const todos = this.state.todos.filter(x => !idsToRemove.includes(x.id))

    this.setTodos(todos);
    this.props.updateMigratableTodos([]);
  }

  migrateTodos = () => {
    // migrate older todos
    let newTodolist = this.state.todos.map(t => {
      // copy to avoid mutation
      let todo = JSON.parse(JSON.stringify(t));

      const todoDate = this.props.formatDate(new Date(todo.date));
      const currentDate = this.props.formatDate(new Date(this.props.currentDateView));
      
      if (todoDate < currentDate && !todo.completed) {
        todo.originalDate = todoDate;
        todo.date = currentDate;
      }

      return todo;
    })

    this.setTodos(newTodolist);
    this.props.updateMigratableTodos([]);
  }

  displayedTodos = () => {
    const criteria = (todo) => {
      const todoDate = this.props.formatDate(new Date(todo.date));
      const currentDate = this.props.formatDate(new Date(this.props.currentDateView));

      return todoDate === currentDate;
    }
    return this.state.todos.filter(criteria);
  }

  setTodos = (todos, stateUpdates = {}) => {
    this.setState({ todos, ...stateUpdates })
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
          date: this.props.formatDate(this.props.currentDateView)
        }
      ],
      currentTodo: '',
      currentTodoId: previousState.currentTodoId + 1
    }))

    localStorage.setItem('todos', JSON.stringify(this.state.todos))

    document.getElementById('todoInput').focus();
  }

  updateCurrentTodoText = (e) => {
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
    // check for migratable todos
    this.props.updateMigratableTodos(this.getMigratableTodos());
    
    document.getElementById('todoInput').focus()
  }

  render () {
    const { currentTodo, maxChars } = this.state;
    const completedTodos = this.displayedTodos().filter(x => x.completed);

    const todoList = this.displayedTodos().length > 0 ? 
      (
        <div>
          <div className="mb-5 text-right">
            <span className={`font-medium ${completedTodos.length === this.displayedTodos().length ? 'text-green-200' : 'text-indigo-200'}`}>{ completedTodos.length }/{ this.displayedTodos().length } completed</span>
          </div>
          <ul className="todo-list select-none">
            { this.displayedTodos().map(todo => {
              return (
                <TodoItem 
                  text={ todo.text }
                  completed={ todo.completed }
                  originalDate={ todo.originalDate }
                  id={ todo.id } 
                  key={ todo.id } 
                  deleteTodo={ this.deleteTodo }
                  toggleCompleteTodo={ this.toggleCompleteTodo } />
              )
            }) }
          </ul>
        </div>
      ) :
      (<p className="text-center mt-5">No tasks scheduled for this day.</p>)

    const addButtonClass = `
      rounded-r-lg bg-indigo-500 flex items-center focus:outline-none text-white font-semibold py-3 px-3 md:px-10
      ${this.addDisabled() ? 'cursor-not-allowed' : 'hover:bg-indigo-400 focus:bg-indigo-400'}`

    const charLabelClass = `ml-2 font-bold text-sm tracking-wide
      ${this.remainingChars() < maxChars / 5 
          ? 'text-red-600' 
          : this.remainingChars() < maxChars / 2 
            ? 'text-orange-500' 
            : 'text-gray-400'}`

    return (
      <div className="todos">
        <form className="flex mb-2" autoComplete="off" onSubmit={ this.addTodo }>
          <input 
            id="todoInput"
            className="rounded-l-lg font-medium bg-gray-800 flex-1 px-3 border-l border-t border-b border-transparent focus:outline-none focus:border-gray-400"
            placeholder="Add a task..."
            type="text"
            autoComplete="off"
            maxLength={ maxChars }
            value={ currentTodo } 
            onChange={ this.updateCurrentTodoText } />
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