import React from 'react';
import Todos from './Todos';

const App = () => {
  return (
    <div className="App min-h-screen flex flex-col">
      <div className="container mx-auto p-8 flex-1">
        <h1 className="text-3xl font-bold mb-5">To-Do List</h1>
        <Todos />
      </div>
      <footer className="flex bg-gray-200">
        <div className="container p-8 mx-auto flex items-start justify-center">
          <span className="flex items-center">Made with <i className="material-icons mx-1 text-teal-400">favorite</i> by </span>
          <a href="https://github.com/laurenawilkinson" className="mx-1 border-b-2 border-teal-400 font-medium text-teal-600 box-content">Lauren</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
