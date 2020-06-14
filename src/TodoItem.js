import React, { Component } from 'react';

class TodoItem extends Component {
  render () {
    const { text, id, deleteTodo } = this.props;

    return (
      <li className="py-5 px-2 flex">
        <span className="flex-1">{ text }</span>
        <button onClick={ () => deleteTodo(id) }>Delete</button>
      </li>
    )
  }
}

export default TodoItem;