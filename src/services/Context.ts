import React from 'react';



interface ArrayContext {
  languages_bcp47: string[]
 }

 const defaultValue: ArrayContext= {
   languages_bcp47:[]
 }


const Context = React.createContext<ArrayContext>(defaultValue);

export default Context;