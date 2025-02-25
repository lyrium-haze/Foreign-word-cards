import React from 'react';
import {LangContext} from './Contexts.js';
export default function LanguageAdder(props) {
  let language = React.useRef(null);
  const {languages, setLanguages, showNotification} = React.useContext(LangContext);
  function addLanguage() {
    const langsForCheck = languages.map(language => language.props.value);
    if(langsForCheck.includes(language.current.value)) {
      showNotification('Language already exists!');
      return;
    }
    setLanguages((prev) => [...prev, <option key={Date.now()} value={language.current.value}>{language.current.value}</option>]);
  }
  return (
    <div>
      <input type='text' ref={language}/>
      <button onClick={addLanguage}>Submit</button>
    </div>
  )
}