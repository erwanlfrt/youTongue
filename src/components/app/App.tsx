import React from 'react';
import ResultList from '../resultList/ResultList';
import SearchBar from '../searchBar/searchBar';
import './app.css'
import Context from 'services/Context'; 



type GlobalState = {
  languages_bcp47: string[]
}
class App extends React.Component<any, GlobalState>{
  state = {
    languages_bcp47: []
  };

  render() {
    
    return (
      <div id="App">
        <Context.Provider value={{languages_bcp47: this.state.languages_bcp47}}>
          <SearchBar></SearchBar>
          <ResultList></ResultList>
        </Context.Provider>
        
      </div>
    );
  }

}

export default App;
