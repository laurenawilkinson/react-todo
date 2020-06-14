import React, { Component } from 'react';

class TodoItem extends Component {
  render () {
    const { text, id, completed, deleteTodo, toggleCompleteTodo } = this.props;
    const textClass = `group-hover:line-through ${completed ? 'line-through text-gray' : 'text-red'}`

    return (
      <li className="py-5 px-2 flex">
        <span className="group flex-1 cursor-pointer" onClick={ () => toggleCompleteTodo(id) }>
          <span className={ textClass }>{ text }</span>
        </span>
        <button onClick={ () => deleteTodo(id) }>Delete</button>
      </li>
    )
  }
}

export default TodoItem;