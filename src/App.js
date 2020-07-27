import React, { Component } from 'react';
import Todos from './Todos';
import Button from './Button';

export default class App extends Component {
  state = {
    dateOptions: { weekday: 'long', month: 'long', day: 'numeric' },
    currentDateView: new Date().toLocaleDateString('en-us')
  }

  currentDateViewObject = () => {
    return new Date (this.state.currentDateView);
  }

  timeTravelOneDay = (travel = 'forwards') => {
    const date = this.currentDateViewObject();
    const travelTime = travel == 'forwards' ? 1 : -1; 

    date.setDate(date.getDate() + travelTime);

    this.setState({ currentDateView: date.toLocaleDateString('en-us') });
  }

  render () {
    const { currentDateView, dateOptions } = this.state;

    return (
      <div className="App min-h-screen flex flex-col bg-gray-900 text-white">
        <div className="container xl:w-1/2 mx-auto p-8 flex-1">
          <header className="flex items-center mb-5">
            <h1 className="text-2xl md:text-3xl font-bold flex-1">{ this.currentDateViewObject().toLocaleDateString(undefined, dateOptions) }</h1>
            <Button 
              icon="keyboard_arrow_left" 
              text="Previous"
              textClass="hidden md:inline-block"
              onClick={ () => this.timeTravelOneDay('backwards') }  />
            <Button
              className="ml-3" 
              icon="home"
              onClick={ () => this.setState({ currentDateView: new Date().toLocaleDateString('en-us') })} />
            <Button 
              className="ml-3" 
              icon="keyboard_arrow_right" 
              text="Next"
              textClass="hidden md:inline-block"
              iconRight="true"
              onClick={ () => this.timeTravelOneDay('forwards') }  />
          </header>
          <Todos currentDateView={ currentDateView } />
        </div>
        <footer className="flex text-indigo-200">
          <div className="container w-full p-8 mx-auto flex items-start justify-center">
            <span className="flex items-center">Made with <i className="material-icons mx-1 text-indigo-400">favorite</i> by </span>
            <a href="https://github.com/laurenawilkinson" className="mx-1 border-b-2 border-indigo-400 font-medium text-indigo-200 box-content">Lauren</a>
          </div>
        </footer>
      </div>
    )
  };
}
