import React, { useEffect, useState } from "react";
import menuIcon from "../pic/draft-expand-menu.png";
import editIcon from "../pic/draft-edit.png";
import saveIcon from "../pic/draft-save.png";
import { PlusSquareIcon } from "@chakra-ui/icons";

import OriginAtt from "../helpers/mockOriginAttributes.json";
import OnChainAtt from "../helpers/mockOnchain.json";

const DraftAttributeTable = ({ type, data }) => {
  const [selectedItem, setSelectedItem] = useState("");

  const [isData, setIsData] = useState(data);
  console.log(isData);
  const [editableRow, setEditableRow] = useState(null);

  const handleEditClick = (index) => {
    setEditableRow(index);
  };

  const handleSaveClick = () => {
    setEditableRow(null);
  };

  const handleCellChange = (index, field, value) => {
    console.log(`item.data_type ${index}: ${value}`);
    const newData = [...data];
    // console.log(`item.data_type `, data);

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
      setSelectedItem("string");
    } else if (value === "number") {
      currentObj["default_mint_value"] = {
        number_attribute_value: { value: 0 },
      };
      setSelectedItem("number");
    } else if (value === "boolean") {
      currentObj["default_mint_value"] = {
        boolean_attribute_value: { value: false },
      };
      setSelectedItem("boolean");
    }
  };

  useEffect(() => {
    console.log("---?");
  }, [type, data]);
  console.log(`item.data_type `, data);

  const addDataTable = async () => {
    // let newRow
    // console.log("OriginAtt =>",OriginAtt)
    // const newRow = OriginAtt
    if (type === "originAttributes") {
      const newRow = {
        name: "",
        data_type: "string",
        required: false,
        display_value_field: "",
        display_option: {
          bool_true_value: "",
          bool_false_value: "",
          opensea: {
            display_type: "",
            trait_type: "",
            max_value: "0",
          },
        },
        default_mint_value: null,
        hidden_overide: false,
        hidden_to_marketplace: false,
      };

      data.push(newRow);
      setIsData([...isData, newRow]);
    } else {
      const newRow = {
        name: "",
        data_type: "string",
        required: false,
        display_value_field: "",
        display_option: {
          bool_true_value: "",
          bool_false_value: "",
          opensea: {
            display_type: "",
            trait_type: "",
            max_value: "0",
          },
        },
        default_mint_value: {
          string_attribute_value: {
            value: "",
          },
        },
        hidden_overide: false,
        hidden_to_marketplace: false,
      };

      data.push(newRow);
      setIsData([...isData, newRow]);
    }
    // data.push(newRow);
    // setIsData([...isData, newRow]);
    // console.log(isData)
  };

  // const addDataTableOnChain = () => {
  //   // const newRow = { name: '', data_type: 'string', display_option: { opensea: { trait_type: '' } } };
  //   const newRow = OnChainAtt
  //   data.push(newRow);
  //   setIsData([...isData, newRow]);
  // };

  console.log("isData ==>", isData);

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
        {/* <button onClick={() => console.log(data)}>log</button> */}
        {/* <button onClick={() => addDataTable()}>log</button> */}
        <PlusSquareIcon onClick={() => addDataTable()} />
      </div>
      <div className="w-full max-h-[320px] flex justify-center items-center overflow-scroll">
        {data.length === 0 ? (
          <div className="h-full">
            <p>NO DATA</p>
          </div>
        ) : (
          <table className=" text-left border border-white text-black bg-[#C8C9CD] w-full mx-4">
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
                  isData.map((item, index) => (
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
                          {["string", "number", "boolean"].map((type) => (
                            <button
                              key={type}
                              onClick={(e) => {
                                handleCellChange(
                                  index,
                                  "data_type",
                                  e.target.id
                                );
                              }}
                              id={type}
                              className={`cursor-pointer hover:scale-110 duration-500 w-7 h-7 rounded-full flex justify-center items-center border-[#D9D9D9DD] border-2 border-dashed ${
                                item.data_type === type
                                  ? "bg-[#D9D9D975]"
                                  : "bg-transparent"
                              }`}
                            >
                              {type === "string"
                                ? "abc"
                                : type === "number"
                                ? "123"
                                : "Y/N"}
                            </button>
                          ))}
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
                          {["string", "number", "boolean"].map((type) => (
                            <button
                              key={type}
                              onClick={(e) => {
                                handleCellChange(
                                  index,
                                  "data_type",
                                  e.target.id
                                );
                              }}
                              id={type}
                              className={`cursor-pointer hover:scale-110 duration-500 w-7 h-7 rounded-full flex justify-center items-center border-[#D9D9D9DD] border-2 border-dashed ${
                                item.data_type === type
                                  ? "bg-[#D9D9D975]"
                                  : "bg-transparent"
                              }`}
                            >
                              {type === "string"
                                ? "abc"
                                : type === "number"
                                ? "123"
                                : "Y/N"}
                            </button>
                          ))}
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
