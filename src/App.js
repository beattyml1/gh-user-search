import React, { Component } from 'react';
import './App.css';
import {SearchBox} from "./components/SearchBox/SearchBox";
import {PaginatedList} from "./components/PaginatedList/PaginatedList";
import * as Users from './services/UsersRest'
import {UserListItem} from "./components/UserListItem/UserListItem";
import {thingCountLabel} from "./services/Pluralization";

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
                  perPage = {10}
                  getItems={(params) => Users.searchDetailed(this.state.searchQuery, params)}
                  getKey={item=>item.login}
                  itemComponent={UserListItem}
                  getHeader={(totalResults) => `${thingCountLabel(totalResults, 'User')} Found` } />
          </div>
      </div>
    );
  }
}

export default App;
