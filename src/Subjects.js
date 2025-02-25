import React from "react";
import LanguageAdder from "./LanguageAdder";
export default function Subjects(props) {
  let [isAddLangClicked, setIsAddLangClicked] = React.useState(false);
  console.log(isAddLangClicked);
  return (
    <div className="sbj-panel">
      <select
        value={props.selectedValue}
        onChange={(e) => props.setSelectedValue(e.target.value)}
        id="subject"
      >
        {props.languages}
      </select>
      {isAddLangClicked ? (
        <LanguageAdder setIsAddLangClicked={setIsAddLangClicked} />
      ) : null}
      {!isAddLangClicked ? (
        <button onClick={() => setIsAddLangClicked(true)}>Add Language</button>
      ) : null}
    </div>
  );
}
