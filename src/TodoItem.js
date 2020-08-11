import React, { Component } from 'react';

class TodoItem extends Component {
  onKeyDown = (e, id) => {
    switch (e.keyCode) {
      case 13:
        this.props.toggleCompleteTodo(id)
        break;
      case 46:
        this.props.deleteTodo(id);
        break;
      case 8:
        this.props.deleteTodo(id);
        break;
      default:
        break;
    }
  }

  render () {
    const { text, id, completed, deleteTodo, toggleCompleteTodo, originalDate } = this.props;
    const transition = 'transition-all duration-150 ease-in-out';
    
    const todoClass = `${transition} rounded-lg focus:outline-none border border-transparent mb-3 group flex ${completed ? 'bg-green-300 focus:border-green-400' : 'bg-gray-700 focus:border-gray-600' }`

    const tickMarkClass = `${transition} w-0 group-hover:w-12 group-focus:w-12 flex items-center justify-center rounded-l-lg ${completed ? 'w-12 bg-green-400' : 'bg-gray-600'}`

    const tickMarkIconClass = `${transition} material-icons group-hover:opacity-100 group-focus:opacity-100 ${completed ? 'text-green-800' : 'opacity-0 text-gray-900'}`

    const textClass = `flex flex-col overflow-hidden justify-center pl-3 py-3 flex-1 cursor-pointer  ${completed ? 'text-green-900' : 'text-indigo-100'}`

    const deleteClass = `opacity-0 group-hover:opacity-100 group-focus:opacity-100 focus:opacity-100 focus:outline-none flex items-center justify-center rounded-full text-gray-900 w-10 h-10 hover:bg-opacity-25 focus:bg-opacity-25 mr-1 ${completed ? 'hover:bg-green-400 focus:bg-green-400 text-green-800' : 'hover:bg-gray-500 focus:bg-gray-500'}`

    const migratedMessage = originalDate ? 
      <span className="text-xs">Migrated from { originalDate }</span> : null;

    return (
      <li 
        className={ todoClass } 
        tabIndex="0"
        onClick={ () => toggleCompleteTodo(id) }
        onKeyDown={ (e) => this.onKeyDown(e, id) }>
        <div className={ tickMarkClass }>
          <i className={ tickMarkIconClass }>done</i>
        </div>
        <div  className={ textClass }>
          <span className="font-medium">{ text }</span>
          { migratedMessage }
        </div>
        <div className="flex items-center">
          <button 
            className={ deleteClass }
            tabIndex="0" 
            onClick={ (e) => deleteTodo(id, e) }>
            <i className="material-icons">close</i>
          </button>
        </div>
      </li>
    )
  }
}

export default TodoItem;