import React, { useEffect, useState } from "react";
import menuIcon from "../pic/draft-expand-menu.png";
import editIcon from "../pic/draft-edit.png";
import saveIcon from "../pic/draft-save.png";
import { Button } from "@mui/material";
const DraftAttributeTable = ({ type, data }) => {
  // useEffect(() => {
  //   console.log("==>",data)
  // }, [data]);

  const [selectedItem, setSelectedItem] = useState("");

  const [editableRow, setEditableRow] = useState(null);

  const handleEditClick = (index) => {
    setEditableRow(index);
  };

  const handleSaveClick = () => {
    setEditableRow(null);
  };

  const handleCellChange = (index, field, value) => {
    console.log(`item.data_type: ${value}`);
    const newData = [...data];
    const fieldParts = field.split(".");

    let currentObj = newData[index];
    for (let i = 0; i < fieldParts.length - 1; i++) {
      currentObj = currentObj[fieldParts[i]];
    }
    currentObj[fieldParts[fieldParts.length - 1]] = value;

    if (value === "string") {
      currentObj["default_mint_value"] = {
        string_attribute_value: { value: "" },
      };
    } else if (value === "number") {
      currentObj["default_mint_value"] = {
        number_attribute_value: { value: 0 },
      };
    } else if (value === "boolean") {
      currentObj["default_mint_value"] = {
        boolean_attribute_value: { value: false },
      };
    }
  };

  const handleChangeIcon = (e) => {
    // //(typeof e.target.id)
    if (e.target.id == "string") {
      data["data_type"] = "string";
      data["default_mint_value"] = { string_attribute_value: { value: "" } };
    } else if (e.target.id == "number") {
      data["data_type"] = "number";
      data["default_mint_value"] = { number_attribute_value: { value: 0 } };
    } else if (e.target.id == "boolean") {
      data["data_type"] = "boolean";
      data["default_mint_value"] = {
        boolean_attribute_value: { value: false },
      };
    }
  };

  return (
    <div className="w-[560px] h-96 border-2 border-white rounded-xl">
      <div className="flex w-full justify-between p-3">
        <p className="text-xl">
          {type === "originAttributes"
            ? "Origin Attributes"
            : type === "collectionAttributes"
            ? "Collection Attributes"
            : type === "tokenAttributes"
            ? "Token Attributes"
            : null}
        </p>
        <img
          src={menuIcon}
          alt="expand-menu"
          className="w-4 h-4 cursor-pointer hover:scale-125 duration-300"
        />
        <button onClick={() => console.log(data)}>log</button>
      </div>
      <div className="w-full max-h-[320px] flex justify-center items-center overflow-scroll">
        {data.length === 0 ? (
          <div className="h-full">
            <p>NO DATA</p>
          </div>
        ) : (
          <table className=" text-left border border-white text-black bg-[#C8C9CD] w-full">
            <thead>
              <tr className="border border-white">
                <th className="border border-white">Name</th>
                <th className="border border-white">Data Type</th>
                <th className="border border-white">Trait Type</th>
                {type === "originAttributes" ? null : (
                  <th className="border border-white">Value</th>
                )}
                <th className="border border-white"></th>
              </tr>
            </thead>
            <tbody>
              {type === "originAttributes"
                ? data !== undefined &&
                  data.map((item, index) => (
                    <tr
                      key={index}
                      className={`border border-white bg-[#B9BAC2] ${
                        editableRow === index ? "bg-blue-200" : ""
                      }`}
                    >
                      <td
                        className="border border-white w-52"
                        contentEditable={editableRow === index}
                        onBlur={(e) =>
                          handleCellChange(index, "name", e.target.innerText)
                        }
                      >
                        {item.name}
                      </td>
                      <td
                        className="border border-white w-24"
                        contentEditable={editableRow === index}
                        // onBlur={(e) =>
                        //   handleCellChange(index, "data_type", e.target.innerText)
                        // }
                      >
                        <div className="flex justify-evenly">
                          <button
                            onClick={(e) => {
                              handleCellChange(index, "data_type", e.target.id);
                            }}
                            id="string"
                            style={{
                              backgroundColor:
                                item.data_type === "string"
                                  ? "#D9D9D975"
                                  : "transparent",
                            }}
                            className={`cursor-pointer hover:scale-110 duration-500 w-7 h-7 rounded-full flex justify-center items-center border-[#D9D9D9DD] border-2 border-dashed ${
                              item.data_type === "string"
                                ? "focus:bg-[#D9D9D975]"
                                : "bg-transparent"
                            }`}
                          >
                            abc
                          </button>
                          <button
                            onClick={(e) => {
                              handleCellChange(index, "data_type", e.target.id);
                            }}
                            id="number"
                            className={`cursor-pointer hover:scale-110 duration-500 w-7 h-7 rounded-full flex justify-center items-center border-[#D9D9D9DD] border-2 border-dashed ${
                              item.data_type === "number"
                                ? "focus:bg-[#D9D9D975]"
                                : "bg-transparent"
                            }`}
                          >
                            123
                          </button>
                          <button
                            onClick={(e) => {
                              handleCellChange(index, "data_type", e.target.id);
                            }}
                            id="boolean"
                            className={`cursor-pointer hover:scale-110 duration-500 w-7 h-7 rounded-full flex justify-center items-center border-[#D9D9D9DD] border-2 border-dashed ${
                              item.data_type === "boolean"
                                ? "focus:bg-[#D9D9D975]"
                                : "bg-transparent"
                            }`}
                          >
                            Y/N
                          </button>
                        </div>
                      </td>
                      <td
                        className="border border-white w-36"
                        contentEditable={editableRow === index}
                        onBlur={(e) =>
                          handleCellChange(
                            index,
                            "display_option.opensea.trait_type",
                            e.target.innerText
                          )
                        }
                      >
                        {item.display_option.opensea.trait_type}
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
                  ))
                : data !== undefined &&
                  data.map((item, index) => (
                    <tr
                      key={index}
                      className={`border border-white bg-[#B9BAC2] ${
                        editableRow === index ? "bg-blue-200" : ""
                      }`}
                    >
                      <td
                        className="border border-white w-36"
                        contentEditable={editableRow === index}
                        onBlur={(e) =>
                          handleCellChange(index, "name", e.target.innerText)
                        }
                      >
                        {item.name}
                      </td>
                      <td
                        className="border border-white w-24"
                        contentEditable={editableRow === index}
                        // onBlur={(e) =>
                        //   handleCellChange(index, "data_type", e.target.innerText)
                        // }
                      >
                        <div className="flex justify-evenly">
                          <button
                            onClick={(e) => {
                              handleCellChange(index, "data_type", e.target.id);
                            }}
                            // onMouseLeave={() => fetchError()}
                            id="string"
                            style={{
                              backgroundColor:
                                item.data_type === "string"
                                  ? "#D9D9D975"
                                  : "transparent",
                            }}
                            className={`cursor-pointer hover:scale-110 duration-500 w-7 h-7 rounded-full flex justify-center items-center border-[#D9D9D9DD] border-2 border-dashed ${
                              item.data_type === "string"
                                ? "focus:bg-[#D9D9D975]"
                                : "bg-transparent"
                            }`}
                          >
                            abc
                          </button>
                          <button
                            onClick={(e) => {
                              handleCellChange(index, "data_type", e.target.id);
                            }}
                            // onMouseLeave={() => fetchError()}
                            id="number"
                            className={`cursor-pointer hover:scale-110 duration-500 w-7 h-7 rounded-full flex justify-center items-center border-[#D9D9D9DD] border-2 border-dashed ${
                              item.data_type === "number"
                                ? "focus:bg-[#D9D9D975]"
                                : "bg-transparent"
                            }`}
                          >
                            123
                          </button>
                          <button
                            onClick={(e) => {
                              handleCellChange(index, "data_type", e.target.id);
                            }}
                            // onMouseLeave={() => fetchError()}
                            id="boolean"
                            className={`cursor-pointer hover:scale-110 duration-500 w-7 h-7 rounded-full flex justify-center items-center border-[#D9D9D9DD] border-2 border-dashed ${
                              item.data_type === "boolean"
                                ? "focus:bg-[#D9D9D975]"
                                : "bg-transparent"
                            }`}
                          >
                            Y/N
                          </button>
                        </div>
                      </td>
                      <td
                        className="border border-white w-24"
                        contentEditable={editableRow === index}
                        onBlur={(e) =>
                          handleCellChange(
                            index,
                            "display_option.opensea.trait_type",
                            e.target.innerText
                          )
                        }
                      >
                        {item.display_option.opensea.trait_type}
                      </td>
                      <td
                        className="border border-white w-28"
                        contentEditable={editableRow === index}
                        onBlur={(e) =>
                          handleCellChange(
                            index,
                            item.data_type === "number"
                              ? "default_mint_value.number_attribute_value.value"
                              : item.data_type === "float"
                              ? "default_mint_value.float_attribute_value.value"
                              : item.data_type === "boolean"
                              ? "default_mint_value.boolean_attribute_value.value"
                              : "default_mint_value.string_attribute_value.value",
                            e.target.innerText
                          )
                        }
                      >
                        {item.data_type === "number"
                          ? item.default_mint_value.number_attribute_value.value
                          : item.data_type === "float"
                          ? item.default_mint_value.float_attribute_value.value
                          : item.data_type === "boolean"
                          ? item.default_mint_value.boolean_attribute_value.value.toString()
                          : item.default_mint_value.string_attribute_value
                              .value}
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
        )}
      </div>
    </div>
  );
};

export default DraftAttributeTable;
