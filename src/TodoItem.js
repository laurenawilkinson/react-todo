import React, { Component } from 'react';

class TodoItem extends Component {
  render () {
    const { text, id, completed, deleteTodo, toggleCompleteTodo } = this.props;
    const transition = 'transition-all duration-150 ease-in-out';
    
    const todoClass = `rounded-lg items-center mb-3 group flex ${completed ? 'bg-green-100' : 'bg-gray-100' }`

    const tickMarkClass = `${transition} h-12 w-0 group-hover:w-12 flex items-center justify-center rounded-l-lg ${completed ? 'w-12 bg-green-200' : 'bg-gray-200'}`

    const tickMarkIconClass = `${transition} material-icons group-hover:opacity-100 ${completed ? 'text-green-700' : 'opacity-0 text-gray-500'}`

    const textClass = `flex items-center pl-3 flex-1 cursor-pointer  ${completed ? 'text-green-600' : 'text-gray-800'}`

    const deleteClass = `invisible group-hover:visible flex items-center justify-center rounded-full text-gray-700 w-10 h-10 hover:bg-opacity-25 ${completed ? 'hover:bg-green-400' : 'hover:bg-gray-500'}`

    return (
      <li 
        className={todoClass} 
        onClick={ () => toggleCompleteTodo(id) }>
        <div className={ tickMarkClass }>
          <i className={ tickMarkIconClass }>done</i>
        </div>
        <span className={ textClass }>{ text }</span>
        <button className={ deleteClass } onClick={ (e) => deleteTodo(e, id) }><i className="material-icons">close</i></button>
      </li>
    )
  }
}

export default TodoItem;