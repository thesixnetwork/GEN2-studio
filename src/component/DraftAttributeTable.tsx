import React, { useState } from "react";
import menuIcon from "../pic/draft-expand-menu.png";
import editIcon from "../pic/draft-edit.png";
import saveIcon from "../pic/draft-save.png";

const DraftAttributeTabel = ({type,data, setOriginAttributes,setData}) => {
  const [editableRow, setEditableRow] = useState(null);


  const handleEditClick = (index) => {
    setEditableRow(index);
  };

  const handleSaveClick = () => {
    setEditableRow(null);
    setOriginAttributes([...data])
  };

  const handleCellChange = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = value;
    setData(newData);
  };

  return (
    <div className="w-[560px] h-96 border-2 border-white rounded-xl">
      <div className="flex w-full justify-between p-3">
        <p className="text-xl">{type === "originAttributes" ? "Origin Attributes" : type === "collectionAttributes" ? "Collection Attributes" : type === "tokenAttributes" ? "Token Attributes" : null}</p>
        <img src={menuIcon} alt="expand-menu" className="w-4 h-4 cursor-pointer hover:scale-125 duration-300" />
        <button onClick={()=>console.log(data)}>log</button>
      </div>
      <div className="w-full max-h-[320px] flex justify-center overflow-scroll px-3">
        <table className=" text-left border border-white text-black bg-[#C8C9CD] w-full">
          <thead>
            <tr className="border border-white">
              <th className="border border-white">Name</th>
              <th className="border border-white">Data Type</th>
              <th className="border border-white">Trait Type</th>
              <th className="border border-white"></th>
            </tr>
          </thead>
          <tbody>
            {data!== undefined && data.map((data, index) => (
              <tr
                key={index}
                className={`border border-white bg-[#B9BAC2] ${
                  editableRow === index ? "bg-blue-200" : ""
                }`}
              >
                <td className="border border-white w-52" contentEditable={editableRow === index}
                onBlur={(e) =>
                  handleCellChange(index, "name", e.target.innerText)
                }
                >
                  {data.name}
                </td>
                <td className="border border-white w-24" contentEditable={editableRow === index}
                     onBlur={(e) =>
                      handleCellChange(index, "name", e.target.innerText)
                    }>
                  {data.data_type}
                </td>
                <td className="border border-white w-36" contentEditable={editableRow === index}
                     onBlur={(e) =>
                      handleCellChange(index, "name", e.target.innerText)
                    }>
                  {data.display_option.opensea.trait_type}
                </td>
                <th className="border border-white w-12 ">
                  {editableRow === index ? (
                    <img
                      src={saveIcon}
                      alt="save"
                      className="w-4 h-4 cursor-pointer m-auto  hover:scale-125 duration-300"
                      onClick={handleSaveClick}
                    />
                  ) : (
                    <img
                      src={editIcon}
                      alt="edit"
                      className="w-4 h-4 cursor-pointer m-auto  hover:scale-125 duration-300"
                      onClick={() => handleEditClick(index)}
                    />
                  )}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DraftAttributeTabel;
