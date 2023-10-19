import React, { useState } from "react";
import menuIcon from "../pic/draft-expand-menu.png";
import editIcon from "../pic/draft-edit.png";
import saveIcon from "../pic/draft-save.png";

const DraftAttributeTabel = ({type,data}) => {
  const [editableRow, setEditableRow] = useState(null);


  const handleEditClick = (index) => {
    setEditableRow(index);
  };

  const handleSaveClick = () => {
    setEditableRow(null);
  };

  return (
    <div className="w-[560px] h-96 border-2 border-white rounded-xl">
      <div className="flex w-full justify-between p-3">
        <p className="text-xl">{type === "originAttributes" ? "Origin Attributes" : type === "collectionAttributes" ? "Collection Attributes" : type === "tokenAttributes" ? "Token Attributes" : null}</p>
        <img src={menuIcon} alt="expand-menu" className="w-4 h-4" />
      </div>
      <div className="w-full max-h-[320px] flex justify-center overflow-scroll">
        <table className=" text-left border border-white text-black bg-[#C8C9CD] w-[540px]">
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
                <td className="border border-white p-1.5 " contentEditable={editableRow === index}>
                  {data.name}
                </td>
                <td className="border border-white p-1.5" contentEditable={editableRow === index}>
                  {data.data_type}
                </td>
                <td className="border border-white p-1.5 w-14" contentEditable={editableRow === index}>
                  {data.display_option.opensea.trait_type}
                </td>
                <th className="border border-white">
                  {editableRow === index ? (
                    <img
                      src={saveIcon}
                      alt="save"
                      className="w-4 h-4 cursor-pointer"
                      onClick={handleSaveClick}
                    />
                  ) : (
                    <img
                      src={editIcon}
                      alt="edit"
                      className="w-4 h-4 cursor-pointer"
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
