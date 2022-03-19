import { render } from '@testing-library/react';
import React from 'react';
import { IResult } from '../../model/Format';
import SearchService from '../../services/SearchService';
import ResultList from '../resultList/ResultList';
import SearchBar from '../searchBar/searchBar';
import './app.css'


class App extends React.Component {

  render() {
    return (
      <div id="App">
        <SearchBar></SearchBar>
        <ResultList></ResultList>
      </div>
    );
}



}

export default App;
