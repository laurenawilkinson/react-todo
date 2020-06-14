import React from 'react';
import Todos from './Todos';

const App = () => {
  return (
    <div className="App container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-5">To-Do List</h1>
      <Todos />
    </div>
  );
}

export default App;
