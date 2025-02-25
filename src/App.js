import "./App.css";
import "./variables.css";
import React from "react";
//import Card from './Card';
import Subjects from "./Subjects";
import LanguageAdder from "./LanguageAdder";
import { LangContext } from "./Contexts.js";
import Card from "./Card.js";

function Welcome() {
  let [isInputShown, setIsInputShown] = React.useState(false);
  // function addLenguage() {
  //   setIsInputShown(true);
  // }
  return (
    <div>
      <h2 id="welcome">
        {" "}
        Hi! add your first language, in witch you want to learn cards
      </h2>
      <button onClick={() => setIsInputShown(true)}>Add language</button>
      {isInputShown ? <LanguageAdder /> : null}
    </div>
  );
}
function Theme(props) {
  function changeTheme() {
    if (props.theme === "") {
      props.themeFunc("dark-theme");
      localStorage.setItem("theme", "dark-theme");
    } else {
      props.themeFunc("");
      localStorage.setItem("theme", "");
    }
  }
  return (
    <label className="switch tooltip" data-tooltip="Switch theme">
      <input onChange={changeTheme} className="cb" type="checkbox" />
      <span className="slider round"></span>
    </label>
  );
}
function App() {
  const [cards, setCards] = React.useState([]);
  const [languages, setLanguages] = React.useState([]);
  const [selectedValue, setSelectedValue] = React.useState("");
  let val = React.useRef(selectedValue);
  const [theme, setTheme] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [isVisible, setIsVisible] = React.useState(false);
  let initial = selectedValue;
  const showNotification = (text) => {
    setMessage(text);
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  };
  React.useEffect(() => {
    if (localStorage.getItem("theme")) setTheme(localStorage.getItem("theme"));
  }, []);
  React.useEffect(() => {
    if (typeof languages[0] === "undefined") {
      // load
      if (localStorage.getItem("languages") !== null) {
        const langData = JSON.parse(localStorage.getItem("languages"));
        setLanguages(
          langData.langForStore.map((lang) => (
            <option key={Date.now()} value={lang}>
              {lang}
            </option>
          ))
        );
        val.current = langData.langForStore[0];
      }
    } else {
      // add
      let langForStore = languages.map((lang) => lang.props.value);
      localStorage.setItem("languages", JSON.stringify({ langForStore }));
    }
  }, [languages]);
  if (selectedValue === "") initial = val.current;
  React.useEffect(() => {
    //if (typeof cards[0] === 'undefined') { // load
    if (localStorage.getItem(initial) !== null) {
      let cardsForLoad = JSON.parse(localStorage.getItem(initial));
      cardsForLoad = cardsForLoad.map((card) => (
        <Card
          addMode={false}
          native={card.native}
          foreign={card.foreign}
          setCards={setCards}
          selectedValue={initial}
        />
      ));
      setCards(cardsForLoad);
      console.log(cards);
    }
    //}
  }, [selectedValue]);
  return (
    <div className={"App" + " " + theme}>
      <header className="App-header ctrl-panel">
        <LangContext.Provider
          value={{ languages, setLanguages, showNotification }}
        >
          {typeof languages[0] !== "undefined" ? (
            <Subjects
              languages={languages}
              selectedValue={selectedValue}
              setSelectedValue={setSelectedValue}
            />
          ) : null}
        </LangContext.Provider>
        <Theme theme={theme} themeFunc={setTheme} />
      </header>
      <LangContext.Provider value={{ languages, setLanguages }}>
        {typeof languages[0] == "undefined" ? <Welcome /> : null}
      </LangContext.Provider>
      {typeof languages[0] !== "undefined" ? (
        <button
          onClick={() => {
            setCards([
              ...cards,
              <Card
                addMode={true}
                selectedValue={initial}
                setCards={setCards}
              />,
            ]);
          }}
        >
          {" "}
          Add card
        </button>
      ) : null}
      <div className="cards-container">{cards}</div>
      {isVisible ? <div className="notification">{message}</div> : null}
      <div className="sheet"></div>
      <div className="bg"></div>
    </div>
  );
}

export default App;
