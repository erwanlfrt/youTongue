import React from 'react';
import ResultList from '../resultList/ResultList';
import SearchBar from '../searchBar/searchBar';
import SelectedLanguages from 'components/selected-languages/SelectedLanguages';
import './app.css'
import Context from 'services/Context'; 



type GlobalState = {
  languages_bcp47: string[],
  loading: boolean,
  displayWelcomeScreen: boolean
}
class App extends React.Component<any, GlobalState>{
  state = {
    languages_bcp47: [],
    loading: false,
    displayWelcomeScreen: true
  };

  constructor (props: any) {
    super(props);
    this.loadEvents();
  }

  private loadEvents (): void {
    document.addEventListener('input-click', () => {
      this.setState({displayWelcomeScreen: false});
    });
  }

  render() {
    let resultList = null;
    let selectedLanguages = null;
    if (!this.state.displayWelcomeScreen) {
      resultList = <ResultList></ResultList>
      selectedLanguages = <SelectedLanguages></SelectedLanguages>
    }
    return (
      <div id="App">
        <Context.Provider value={{languages_bcp47: this.state.languages_bcp47, loading: this.state.loading, displayWelcomeScreen: this.state.displayWelcomeScreen}}>
          <SearchBar></SearchBar>
          {resultList}
          {selectedLanguages}
        </Context.Provider>
        
      </div>
    );
  }

}

export default App;
