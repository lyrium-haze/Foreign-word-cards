import "./Card.css";
import React from "react";
export default function Card(props) {
  let native = React.useRef("");
  let foreign = React.useRef("");
  function deleteCard() {
    const cards = JSON.parse(localStorage.getItem(props.selectedValue));
    let changedCards = cards.map((card) => card.native);
    changedCards = cards.filter((card) => card.native != props.native);
    localStorage.setItem(props.selectedValue, JSON.stringify(changedCards));
    props.setCards((prev) =>
      prev.filter((card) => card.native != props.native)
    );
  }
  function saveCard() {
    let newCard = {
      native: native.current.value,
      foreign: foreign.current.value,
    };
    console.log(props.selectedValue);
    props.setCards((prev) => [
      ...prev,
      <Card
        addMode={false}
        native={native.current.value}
        foreign={foreign.current.value}
        setCards={props.setCards}
        selectedValue={props.selectedValue}
      />,
    ]);
    if (localStorage.getItem(props.selectedValue) === null) {
      localStorage.setItem(props.selectedValue, JSON.stringify([newCard]));
    } else {
      let cards = JSON.parse(localStorage.getItem(props.selectedValue));
      cards.push(newCard);
      localStorage.setItem(props.selectedValue, JSON.stringify(cards));
    }
  }
  if (props.addMode === true) {
    return (
      <div className="card addCard">
        <input ref={native} name="native" type="text" placeholder="native" />
        <input ref={foreign} name="foreign" type="text" placeholder="foreign" />
        <button onClick={saveCard}>Save</button>
      </div>
    );
  } else {
    return (
      <div className="card">
        <div className="card-inner">
          <div className="word card-front">{props.native}</div>
          <div className="word card-back">{props.foreign}</div>
          <button className="delete-btn" onClick={deleteCard}>
            Delete
          </button>
        </div>
      </div>
    );
  }
}
