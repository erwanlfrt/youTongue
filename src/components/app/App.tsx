import React, { ReactElement } from 'react';
import ResultList from '../resultList/ResultList';
import SearchBar from '../searchBar/searchBar';
import './app.css'
import Context from 'services/Context'; 
import Placeholder from 'components/placeholder/Placeholder';



type GlobalState = {
  languages_bcp47: string[],
  loading: boolean,
  displayWelcomeScreen: boolean
}
class App extends React.Component<any, GlobalState>{

  constructor (props: any) {
    super(props);
    this.state = {
      languages_bcp47: [],
      loading: false,
      displayWelcomeScreen: true
    };
  }

  componentDidMount(){
    this.displayWelcomeScreen = this.displayWelcomeScreen.bind(this);
    this.loadEvents();
  }

  private loadEvents (): void {
    document.addEventListener('input-click', () => {
      this.displayWelcomeScreen(false)
    });
  }

  private displayWelcomeScreen(display: boolean) {
    this.setState({displayWelcomeScreen: display});
  }

  render() {
    let resultList = null;
    let placeholder: ReactElement | null= <Placeholder></Placeholder>;
    if (!this.state.displayWelcomeScreen) {
      resultList = <ResultList></ResultList>
      placeholder = null
    }
    return (
      <div id="App">
        <Context.Provider value={{languages_bcp47: this.state.languages_bcp47, loading: this.state.loading, displayWelcomeScreen: this.state.displayWelcomeScreen}}>
          <SearchBar></SearchBar>
          {placeholder}
          {resultList}
        </Context.Provider>
        
      </div>
    );
  }

}

export default App;
