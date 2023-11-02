import React, { useEffect, useState } from "react";
import expandIcon from "../pic/draft-expand-menu.png";
import editIcon from "../pic/draft-edit.png";
import saveIcon from "../pic/draft-save.png";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import narrowIcon from "../pic/draft-narrow-menu.png";
import { PlusSquareIcon, DeleteIcon } from "@chakra-ui/icons";

import { Box, Flex } from "@chakra-ui/react";

const DraftAttributeTable = ({ type, data, expand, setIsSave }) => {
  const param = useParams();
  const [isData, setIsData] = useState(data);

  const [selectedItem, setSelectedItem] = useState("");
  const [editableRow, setEditableRow] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const handleEditClick = (index) => {
    setIsEdit(true);
    if (type === "originAttributes") {
      setIsSave((prevState) => ({
        ...prevState,
        originattributes: false,
      }));
    } else if (type === "collectionAttributes") {
      setIsSave((prevState) => ({
        ...prevState,
        collectionattributes: false,
      }));
    } else if (type === "tokenAttributes") {
      setIsSave((prevState) => ({
        ...prevState,
        tokenattributes: false,
      }));
    }

    setEditableRow(index);
  };

  const handleSaveClick = () => {
    setIsEdit(false);
    if (type === "originAttributes") {
      setIsSave((prevState) => ({
        ...prevState,
        originattributes: true,
      }));
    } else if (type === "collectionAttributes") {
      setIsSave((prevState) => ({
        ...prevState,
        collectionattributes: true,
      }));
    } else if (type === "tokenAttributes") {
      setIsSave((prevState) => ({
        ...prevState,
        tokenattributes: true,
      }));
    }
    setEditableRow(null);
  };

  const handleCellChange = (index, field, value) => {
    console.log(`item.data_type ${index}: ${value}`);
    const newData = [...data];
    const fieldParts = field.split(".");

    let currentObj = newData[index];
    for (let i = 0; i < fieldParts.length - 1; i++) {
      currentObj = currentObj[fieldParts[i]];
    }
    currentObj[fieldParts[fieldParts.length - 1]] = value;
    // console.log("currentObj[fieldParts[fieldParts.length - 1]]",currentObj[fieldParts[fieldParts.length - 1]])

    if (value === "string") {
      if (type !== "originAttributes") {
        currentObj["default_mint_value"] = {
          string_attribute_value: { value: "" },
        };
      }
      setSelectedItem("string");
    } else if (value === "number") {
      if (type !== "originAttributes") {
        currentObj["default_mint_value"] = {
          number_attribute_value: { value: 0 },
        };
      }
      setSelectedItem("number");
    } else if (value === "boolean") {
      if (type !== "originAttributes") {
        currentObj["default_mint_value"] = {
          boolean_attribute_value: { value: false },
        };
      }
      setSelectedItem("boolean");
    }
  };

  useEffect(() => {
    console.log("---?");
  }, [type, data]);

  const addDataTable = async () => {
    // let newRow
    // console.log("OriginAtt =>",OriginAtt)
    // const newRow = OriginAtt
    if (type === "originAttributes") {
      const newRow = {
        name: "",
        data_type: "",
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
  console.log(data);

  return (
    <div
      className={`${
        expand === true ? "w-[1260px] h-[600px]" : "w-[560px] h-96"
      } border-2 border-white rounded-xl`}
    >
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
        {expand === true ? (
          <Link to={`/draft/attributes/${param.schema_revision}`}>
            <img
              src={narrowIcon}
              alt="narrow-menu"
              className="w-4 h-4 cursor-pointer hover:scale-125 duration-300"
            />
          </Link>
        ) : (
          <Link to={`/draft/attributes/${type}/${param.schema_revision}`}>
            <img
              src={expandIcon}
              alt="expand-menu"
              className="w-4 h-4 cursor-pointer hover:scale-125 duration-300"
            />
          </Link>
        )}
        {/* <button onClick={() => console.log(data)}>log</button> */}
        <PlusSquareIcon onClick={() => addDataTable()} />
      </div>
      <div className="w-full max-h-[320px] flex justify-center items-center overflow-scroll">
        ()
        {data.length === 0 ? (
          <div className="h-full">
            <p>NO DATA</p>
          </div>
        ) : (
          <table className=" text-left border border-white text-black bg-[#C8C9CD] w-full mx-4">
            <thead>
              {expand === true ? (
                <tr className="border border-white">
                  {type === "originAttributes" ? (
                    <>
                      <th className="border border-white w-[40%]">Name</th>
                      <th className="border border-white w-[10%]">Data Type</th>
                      <th className="border border-white w-[40%]">
                        Trait Type
                      </th>
                      <th className="border border-white w-[5%]"></th>
                    </>
                  ) : (
                    <>
                      <th className="border border-white w-[35%]">Name</th>
                      <th className="border border-white w-[10%]">Data Type</th>
                      <th className="border border-white w-[15%]">
                        Trait Type
                      </th>
                      <th className="border border-white w-[35%]">Value</th>
                      <th className="border border-white w-[5%]"></th>
                    </>
                  )}
                </tr>
              ) : (
                <tr className="border border-white">
                  {type === "originAttributes" ? (
                    <>
                      <th className="border border-white w-[40%]">Name</th>
                      <th className="border border-white w-[20%]">Data Type</th>
                      <th className="border border-white w-[30%]">
                        Trait Type
                      </th>
                      <th className="border border-white w-[10%]"></th>
                    </>
                  ) : (
                    <>
                      <th className="border border-white w-[25%]">Name</th>
                      <th className="border border-white w-[20%]">Data Type</th>
                      <th className="border border-white w-[20%]">
                        Trait Type
                      </th>
                      <th className="border border-white w-[25%]">Value</th>
                      <th className="border border-white w-[15%]"></th>
                    </>
                  )}
                </tr>
              )}
            </thead>
            <tbody>
              {data !== undefined &&
                data.map((item, index) => (
                  <tr
                    key={index}
                    className={`border border-white bg-[#B9BAC2] ${
                      editableRow === index ? "bg-blue-200" : ""
                    }`}
                  >
                    <td
                      className="border border-white"
                      contentEditable={editableRow === index}
                      onBlur={(e) =>
                        handleCellChange(index, "name", e.target.innerText)
                      }
                    >
                      {item.name}
                    </td>
                    <td className="border border-white">
                      <div className="flex justify-evenly">
                        {["string", "number", "boolean"].map((type) => (
                          <button
                            key={type}
                            onClick={(e) => {
                              if (isEdit) {
                                handleCellChange(
                                  index,
                                  "data_type",
                                  e.target.id
                                );
                              }
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
                      className="border border-white"
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
                    {type === "originAttributes" ? null : (
                      <td
                        className="border border-white"
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
                    )}
                    <th className="border border-white  ">
                      <Flex>
                        <DeleteIcon />
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
                      </Flex>
                      {/* <PlusSquareIcon/>
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
                      )} */}
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
