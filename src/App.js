import React, { useState } from "react";
import ReactDiffViewer, { DiffMethod } from "react-diff-viewer";
import "./App.css";

const App = ({ diffText }) => {
  const [newValue, setNewValue] = useState("");
  const [oldValue, setOldValue] = useState("");
  const [versions, setVersions] = useState([]);
  const [currentVersionCompar, setCurrentVersionCompar] = useState("");

  const handleValue = (event) => {
    setNewValue(event.target.value);
  };

  const handleSubmitSaveText = (event) => {
    if (newValue === oldValue) return;

    setOldValue(newValue);
    let newVersion = {
      idVersion: "version-" + versions.length,
      titleVersion: "Version",
      text: newValue,
    };

    let newVersions = [...versions, newVersion];
    setVersions(newVersions);
    setCurrentVersionCompar(newVersion.idVersion);
  };

  const handleSelectVersion = (event) => {
    if (event.target.value === "default") return;

    let versionSelect = versions.find(
      (el) => el.idVersion === event.target.value
    );

    setCurrentVersionCompar(event.target.value);
    setOldValue(versionSelect.text);
  };

  return (
    <div className="cantainer-tasks">
      <div className="text-article-task">
        <textarea
          name="tarea-texto"
          id="articulo"
          cols="30"
          rows="5"
          onChange={handleValue}
          value={newValue}
        ></textarea>
        <input
          type="submit"
          value="Save"
          onClick={() => handleSubmitSaveText()}
        />
      </div>

      <select
        name="versiones"
        id="versions-select"
        value={currentVersionCompar}
        onChange={handleSelectVersion}
      >
        <option value="default"> ninguna </option>
        {versions.map((el, index) => (
          <option key={el.idVersion + "-" + index} value={el.idVersion}>
            {el.titleVersion + "-" + index}
          </option>
        ))}
      </select>
        <ReactDiffViewer
          oldValue={oldValue}
          newValue={newValue}
          splitView={true}
          compareMethod={DiffMethod.WORDS}
        />
       </div>
  );
};

export default App;
