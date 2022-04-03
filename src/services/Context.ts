import React from 'react';



interface ArrayContext {
  languages_bcp47: string[],
  loading: boolean,
  displayWelcomeScreen: boolean
 }

 const defaultValue: ArrayContext= {
   languages_bcp47:[],
   loading: false,
   displayWelcomeScreen: true
 }


const Context = React.createContext<ArrayContext>(defaultValue);

export default Context;