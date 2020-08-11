import React, { Component } from 'react';
import Todos from './Todos';
import Button from './Button';


export default class App extends Component {
  constructor () {
    super();
    this.todoRef = React.createRef();
  }

  state = {
    currentDateView: new Date(),
    todaysDate: new Date(),
    todoRef: null,
    migratableTodos: []
  }

  formatDate = (dateObj) => {
    const addZero = (num) => num < 10 ? '0' + num : num; 

    let dd = addZero(dateObj.getDate());
    let mm = addZero(dateObj.getMonth() + 1);
    let yyyy = dateObj.getFullYear();

    return `${yyyy}/${mm}/${dd}`
  }

  timeTravelOneDay = (travel = 'forwards') => {
    const date = this.state.currentDateView;
    const travelTime = travel === 'forwards' ? 1 : -1; 

    date.setDate(date.getDate() + travelTime);

    this.setState({ currentDateView: date });
  }

  goToCurrentDate = () => {
    // set todaysDate as well just incase date has changed
    this.setState({
      currentDateView: new Date(),
      todaysDate: new Date()
    })
  }

  migrateTodos = () => {
    this.todoRef.current.migrateTodos();
  }

  removeMigratableTodos = () => {
    this.todoRef.current.removeMigratableTodos();
  }

  updateMigratableTodos = (value) => {
    this.setState({ migratableTodos: value })
  }

  render () {
    const { currentDateView, todaysDate } = this.state;
    const dateOptions = { weekday: 'long', month: 'long', day: 'numeric' };

    const migrateToastClasses = {
      sm: 'w-11/12 left-0 right-0 m-auto flex-col sm:flex-row',
      lg: 'xl:w-64 xl:left-auto xl:flex-col xl:w-1/4 xl:m-3'
    }
    const migrateToast = this.state.migratableTodos.length > 0 ? (
      <div className={ 
          ['border-l-8 border-indigo-600 bg-indigo-300 fixed bottom-0 text-black flex items-center rounded-r-lg p-3 mb-1', 
            migrateToastClasses.sm, 
            migrateToastClasses.lg ].join(' ') }>
        <span className="flex-1">
          You have { this.state.migratableTodos.length } unfinished task(s) from previous days
        </span>
        <div className="w-full sm:w-auto xl:w-full flex justify-end">
          <Button
            text="Remove All"
            hoverClass="bg-indigo-400"
            onClick={ this.removeMigratableTodos } />
          <Button 
            text="Migrate All"
            buttonClass="ml-1"
            hoverClass="bg-indigo-400"
            onClick={ this.migrateTodos } />
        </div>
      </div>
    ) : null;

    return (
      <div className="App min-h-screen flex flex-col bg-gray-900 text-white">
        <div className="container xl:w-1/2 mx-auto p-8 flex-1">
          <header className="flex items-center mb-5">
            <h1 className="text-2xl md:text-3xl font-bold flex-1">{ currentDateView.toLocaleDateString(undefined, dateOptions) }</h1>
            <Button 
              icon="keyboard_arrow_left" 
              text="Previous"
              textClass="hidden md:inline-block"
              onClick={ () => this.timeTravelOneDay('backwards') }  />
            <Button
              disabled={ this.formatDate(currentDateView) === this.formatDate(todaysDate) } 
              icon="home"
              onClick={ () => this.goToCurrentDate() } />
            <Button 
              icon="keyboard_arrow_right" 
              text="Next"
              textClass="hidden md:inline-block"
              iconRight="true"
              onClick={ () => this.timeTravelOneDay('forwards') }  />
          </header>
          <Todos 
            ref={ this.todoRef }
            formatDate={ (date) => this.formatDate(date) }
            todaysDate={ todaysDate }
            updateMigratableTodos={ (val) => this.updateMigratableTodos(val) }
            currentDateView={ currentDateView } />
        </div>
        <div className="select-none w-full">
          { migrateToast }
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
