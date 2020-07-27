import React from 'react';
import Todos from './Todos';

const App = () => {
  const date = new Date();
  const dateOptions = { weekday: 'long', month: 'long', day: 'numeric' };

  return (
    <div className="App min-h-screen flex flex-col bg-gray-900 text-white">
      <div className="container xl:w-1/2 mx-auto p-8 flex-1">
        <h1 className="text-3xl font-bold mb-5">{ date.toLocaleDateString(undefined, dateOptions) }</h1>
        <Todos />
      </div>
      <footer className="flex text-indigo-200">
        <div className="container w-full p-8 mx-auto flex items-start justify-center">
          <span className="flex items-center">Made with <i className="material-icons mx-1 text-indigo-400">favorite</i> by </span>
          <a href="https://github.com/laurenawilkinson" className="mx-1 border-b-2 border-indigo-400 font-medium text-indigo-200 box-content">Lauren</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
