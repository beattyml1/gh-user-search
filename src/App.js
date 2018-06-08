import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {SearchBox} from "./components/SearchBox";
import {PaginatedList} from "./components/PaginatedList";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">GitHub User Search</h1>
        </header>
        <p className="App-intro">
            <SearchBox label={"Search GitHub Users"}/>
            <PaginatedList
                perPage = {10}
                getItems={() => Promise.resolve({items:[], totalResults: 0 })}
                itemComponent={(props) => <div>Hello World</div>}
                getHeader={(totalResults) => `1 results`}
                getItemProps={x=>x}/>
        </p>
      </div>
    );
  }
}

export default App;
