// import { Tooltip } from "@mui/material";
import React from "react"

const DraftActionThenPreview = (actions) => {
  const convertStringIfTooLong = (str: string, length: number) => {
    if (str.length > length) {
      return str.substring(0, length) + "...";
    } else {
      return str;
    }
  };
  return (
    <div className="w-full h-72 border-2 border-white justify-center flex bg-white bg-opacity-20">
      <div className="w-1/2 border-r h-full p-4">
        <h2 className="text-2xl bold h-10">Action Info: </h2>
        <div className="ml-8">
          <p>Name: {actions.actions[0].name} </p>
          <p>
            Description: {convertStringIfTooLong(actions.actions[0].desc, 34)}{" "}
          </p>
          <p>Parameters: </p>
        </div>
      </div>
      <div className="w-1/2 border-l h-full p-4">
        <h2 className="text-2xl bold h-10"></h2>

        <p>When: {actions.actions[0].when} </p>
        <p>Then: </p>
        <ul className="ml-8">
          {actions.actions[0].then !== undefined &&
            actions.actions[0].then.map((item, index) => (
              <li key={index} className="list-disc">
                <span className="whitespace-nowrap">
                  {convertStringIfTooLong(item, 60)}
                </span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default DraftActionThenPreview;
