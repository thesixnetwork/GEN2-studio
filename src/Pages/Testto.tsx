import React, { useState } from "react";

function App() {
  const [keyType, setKeyType] = useState("string");
  const [value, setValue] = useState("");
  const [obj, setObj] = useState<{[key:string]:string|boolean}>({ [keyType]: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);

    if (keyType === "string") {
      setObj({ string: e.target.value });
    } else if (keyType === "boolean") {
      setObj({ boolean: e.target.value === "true" });
    }
  };

  const handleKeyTypeChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    setKeyType(e.target.value);
    setObj({ [e.target.value]: value });
  };

  return (
    <div>
      <select value={keyType} onChange={handleKeyTypeChange}>
        <option value="string">String</option>
        <option value="boolean">Boolean</option>
      </select>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Type here..."
      />
      <input type="text" value={obj[keyType].toString()} readOnly />
    </div>
  );
}

export default App;
