import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {SearchBox} from "./components/SearchBox";
import {PaginatedList} from "./components/PaginatedList";
import * as Users from './services/UsersRest'
import {User} from "./components/User";

class App extends Component {
  constructor() {
      super();
      this.state = { searchQuery: '' }
  }

  search = (searchQuery) => {
      this.setState({ searchQuery })
  }

  render = () => {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">GitHub User Search</h1>
        </header>
          <div className={"user-search-widget"}>
              <SearchBox label={"Search GitHub Users"} onSearch={this.search}/>
              <PaginatedList
                  perPage = {30}
                  getItems={(params) => Users.searchDetailed(this.state.searchQuery, params)}
                  itemComponent={User}
                  getHeader={(totalResults) =>
                      !totalResults ? null :
                      totalResults !== 1 ? `${totalResults} Users Found` : '1 User Found'}
                  getItemProps={x=>x}/>
          </div>
      </div>
    );
  }
}

export default App;
