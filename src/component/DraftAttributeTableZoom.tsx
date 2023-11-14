import React, { useEffect, useState } from "react";
import narrowIcon from "../pic/draft-narrow-menu.png";
import editIcon from "../pic/draft-edit.png";
import saveIcon from "../pic/draft-save.png";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ItokenAttributes } from "../types/Nftmngr";

const DraftAttributeTableZoom = ({ type, data }) => {
  const param = useParams();
  console.log("ppp", type);
  const [, setSelectedItem] = useState("");

  // const [mockData, setData] = useState(data);

  const [editableRow, setEditableRow] = useState<null | number>(null);

  const handleEditClick = (index: number) => {
    setEditableRow(index);
  };

  const handleSaveClick = () => {
    setEditableRow(null);
  };

  const handleCellChange = (index: number, field: string, value: string) => {
    console.log(`item.data_type ${index}: ${value}`);
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

  return (
    <div className="w-[1260px] h-[600px] border-2 border-white rounded-xl">
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
        <Link to={`/draft/attributes/${param.schema_revision}`}>
          <img
            src={narrowIcon}
            alt="narrow-menu"
            className="w-4 h-4 cursor-pointer hover:scale-125 duration-300"
          />
        </Link>
        {/* <button onClick={() => console.log(data)}>log</button> */}
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
                {type === "originAttributes" ? (
                  <>
                    <th className="border border-white w-[40%]">Name</th>
                    <th className="border border-white w-[10%]">Data Type</th>
                    <th className="border border-white w-[40%]">Trait Type</th>
                    <th className="border border-white w-[5%]"></th>
                  </>
                ) : (
                  <>
                    <th className="border border-white w-[35%]">Name</th>
                    <th className="border border-white w-[10%]">Data Type</th>
                    <th className="border border-white w-[15%]">Trait Type</th>
                    <th className="border border-white w-[35%]">Value</th>
                    <th className="border border-white w-[5%]"></th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {type === "originAttributes"
                ? data !== undefined &&
                  data.map((item: ItokenAttributes, index: number) => (
                    <tr
                      key={index}
                      className={`border border-white bg-[#B9BAC2] ${
                        editableRow === index ? "bg-blue-200" : ""
                      }`}
                    >
                      <td
                        className="border border-white"
                        contentEditable={editableRow === index}
                        onBlur={(
                          e: React.FocusEvent<HTMLTableCellElement, Element>
                        ) =>
                          handleCellChange(index, "name", e.target.innerText)
                        }
                      >
                        {item.name}
                      </td>
                      <td
                        className="border border-white"
                        contentEditable={editableRow === index}
                      >
                        <div className="flex justify-evenly">
                          {["string", "number", "boolean"].map((type) => (
                            <button
                              key={type}
                              onClick={(
                                e: React.MouseEvent<
                                  HTMLButtonElement,
                                  MouseEvent
                                >
                              ) => {
                                handleCellChange(
                                  index,
                                  "data_type",
                                  (e.target as HTMLButtonElement).id
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
                        className="border border-white"
                        contentEditable={editableRow === index}
                        onBlur={(
                          e: React.FocusEvent<HTMLTableCellElement, Element>
                        ) =>
                          handleCellChange(
                            index,
                            "display_option.opensea.trait_type",
                            e.target.innerText
                          )
                        }
                      >
                        {item.display_option.opensea.trait_type}
                      </td>
                      <th className="border border-white">
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
                  data.map((item: ItokenAttributes, index: number) => (
                    <tr
                      key={index}
                      className={`border border-white bg-[#B9BAC2] ${
                        editableRow === index ? "bg-blue-200" : ""
                      }`}
                    >
                      <td
                        className="border border-white"
                        contentEditable={editableRow === index}
                        onBlur={(
                          e: React.FocusEvent<HTMLTableCellElement, Element>
                        ) =>
                          handleCellChange(index, "name", e.target.innerText)
                        }
                      >
                        {item.name}
                      </td>
                      <td
                        className="border border-white"
                        contentEditable={editableRow === index}
                        // onBlur={(e) =>
                        //   handleCellChange(index, "data_type", e.target.innerText)
                        // }
                      >
                        <div className="flex justify-evenly">
                          {["string", "number", "boolean"].map((type) => (
                            <button
                              key={type}
                              onClick={(
                                e: React.MouseEvent<
                                  HTMLButtonElement,
                                  MouseEvent
                                >
                              ) => {
                                handleCellChange(
                                  index,
                                  "data_type",
                                  (e.target as HTMLButtonElement).id
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
                        className="border border-white"
                        contentEditable={editableRow === index}
                        onBlur={(
                          e: React.FocusEvent<HTMLTableCellElement, Element>
                        ) =>
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
                          ? item.default_mint_value.number_attribute_value
                              ?.value
                          : item.data_type === "float"
                          ? item.default_mint_value.float_attribute_value?.value
                          : item.data_type === "boolean"
                          ? item.default_mint_value.boolean_attribute_value?.value.toString()
                          : item.default_mint_value.string_attribute_value
                              ?.value}
                      </td>
                      <th className="border border-white ">
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

export default DraftAttributeTableZoom;
