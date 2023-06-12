import React, { useState } from "react";
import CustomSearchableDropdown from "./CustomDropdown";
import { getValue } from "./lodash";

function App(props) {
  const [value, setValue] = useState("");
  const handleSelectChange = (value) => {
    setValue(getValue(value, `id`, ""));
  };
  return (
    <div className="home">
      <CustomSearchableDropdown
        label={"label"}
        value={value}
        onChange={handleSelectChange}
        add
      />
    </div>
  );
}

export default App;
