import React, { useEffect, useState } from "react";
import expandIcon from "../pic/draft-expand-menu.png";
import editIcon from "../pic/draft-edit.png";
import saveIcon from "../pic/draft-save.png";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import narrowIcon from "../pic/draft-narrow-menu.png";
import { PlusSquareIcon, DeleteIcon } from "@chakra-ui/icons";
import { ItokenAttributes } from "../types/Nftmngr";

import { Box, Flex } from "@chakra-ui/react";

const DraftAttributeTable = ({
  type,
  data,
  expand,
  setIsSave,
  isCheckErrorName,
}) => {
  interface IerrorName {
    isIndex: number;
  }

  const param = useParams();
  const [isData, setIsData] = useState(data);

  const [selectedItem, setSelectedItem] = useState("");
  const [selectedItem2, setSelectedItem2] = useState("");
  const [editableRow, setEditableRow] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isErrorObj, setIsErrorObj] = useState(false);
  const [errorName, setErrorName] = useState<IerrorName[]>([]);
  const [errorMessag, setErrorMessage] = useState("");
  const [errorInRows, setErrorInRows] = useState(isData);

  function containsSpecialChars(str: string) {
    const specialChars = /[`!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
  }

  function containsSpace(str: string) {
    const specialChars = / /;
    return specialChars.test(str);
  }

  function containsUppercase(str: string) {
    return /[A-Z]/.test(str);
  }

  function containsSame(str: string) {
    // const result = await data.filter((x: ItokenAttributes) => x.name === str);
    for (let index = 0; index < data.length; index++) {
      const x = data[index];
      if (x.name === str) {
        // console.log("same true")
        return true;
      }
    return false;

    }
    // console.log(result.length)
    // if (result.length > 1) {
    //   console.log("same true")
    //   return true;
    // }
    // console.log("same false")

    // return false;
  }

  const handleEditClick = (index) => {
    setIsEdit(true);
    if (type === "originAttributes") {
      setIsSave((prevState) => ({
        ...prevState,
        originattributes: false,
      }));
      // console.log("index", index);
      // console.log("index", data[index]);
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

  const handelErrValue = async (value: string, index: number) => {
    const newData = [...errorInRows];
    const currentObj = newData[index];
    currentObj.hasConflict = false;
    // console.log("kkkk22222 ==>", currentObj["default_mint_value"]);
    // console.log("kkkk22222 ==>", index);
    if (currentObj["default_mint_value"]["string_attribute_value"]) {
      const isError = await checkValueAndDataType(value, "string");
      if (isError) {
        currentObj.hasConflict = true;
      }
      // console.log("isErrorString ==>", isError);
    } else if (currentObj["default_mint_value"]["number_attribute_value"]) {
      const isError = await checkValueAndDataType(value, "number");
      if (isError) {
        currentObj.hasConflict = true;
      }
      // console.log("isError ==>", isError);
      // console.log("isError ==>", value);
    } else if (currentObj["default_mint_value"]["boolean_attribute_value"]) {
      const isError = await checkValueAndDataType(value, "boolean");
      if (isError) {
        currentObj.hasConflict = true;
      }
      // console.log("isError ==>", isError);
    }
  };

  const checkValueAndDataType = async (str: string, data_type: string) => {
    if (data_type === "string") {
      if (str === "true" || str === "false") {
        return "Value is not of type string";
      }

      // if (!/^[a-z]*$/.test(str) && typeof str === "string") {
      //   if (str.includes(".")) {
      //     return "Value is not of type string";
      //   }
      //   return "Value is not of type string";
      // }
      return false;
    }

    if (data_type === "number") {
      if (!str && str != "0") {
        return "Value is not of type number";
      }

      if (str === "true" || str === "false") {
        return "Value is not of type number";
      }

      if (!/^[0-9]*$/.test(str) && typeof str === "string") {
        if (str.includes(".")) {
          return "Value is not of type number";
        }
        // console.log("number 111223");
        return "Value is not of type number";
      }
      return false;
    }

    if (data_type === "boolean") {
      if (str.toString() !== "true" && str.toString() !== "false") {
        return "Value is not of type boolean";
      }
      return false;
    }

    return;
  };

  const checkErrorValueName = async (str: string, index: number) => {
    if (!str) {
      const data = {
        isIndex: index,
      };
      console.log("!!!!!str ==>",str)

      setErrorName([...errorName, data]);
      setErrorMessage("Not Availible");
    } else if (await containsSame(str)) {
      const data = {
        isIndex: index,
      };
      console.log("Not Same ==>",str)
      setErrorName([...errorName, data]);
      setErrorMessage("Not Same");
    } else if (containsSpecialChars(str)) {
      const data = {
        isIndex: index,
      };
      console.log("Sp Chars ==>",str)

      setErrorName([...errorName, data]);
      setErrorMessage("Sp Chars");
    } else if (containsSpace(str)) {
      const data = {
        isIndex: index,
      };
      console.log("Space ==>",str)

      setErrorName([...errorName, data]);
      setErrorMessage("Space");
    } else if (containsUppercase(str)) {
      const data = {
        isIndex: index,
      };
      setErrorName([...errorName, data]);
      setErrorMessage("Uppercase");
    } else {
      const result = errorName.filter((x: IerrorName) => x.isIndex !== index);
      setErrorName(result);
    }
  };

  // console.log(errorName)
  const checkErrorNameObj = async (obj: ItokenAttributes[]) => {
    // obj.map((x: ItokenAttributes, index: number) => {
    for (let index = 0; index < obj.length; index++) {
        const x = obj[index];
      // console.log("x.name",x.name)
      if (!x.name) {
        const data = {
          isIndex: index,
        };
        setErrorName([...errorName, data]);
        setErrorMessage("Not Availible");
      } else if (await containsSame(x.name)) {
        const data = {
          isIndex: index,
        };
        setErrorName([...errorName, data]);
        setErrorMessage("Not Same");
      } else if (containsSpecialChars(x.name)) {
        const data = {
          isIndex: index,
        };
        setErrorName([...errorName, data]);
        setErrorMessage("Sp Chars");
      } else if (containsSpace(x.name)) {
        const data = {
          isIndex: index,
        };
      // console.log("x.name Space",x.name)

        setErrorName([...errorName, data]);
        setErrorMessage("Space");
      } else if (containsUppercase(x.name)) {
        const data = {
          isIndex: index,
        };
        setErrorName([...errorName, data]);
        setErrorMessage("Uppercase");
      } else {
        // console.log("x.name errorName",containsSpace(x.name))

        const result = errorName.filter((x: IerrorName) => x.isIndex !== index);
        setErrorName(result);
      }
    };
  };

  const handleCellChange = (index, field, value) => {
    // console.log(`item.data_type ${index}: ${value}`);
    const newData = [...data];
    const fieldParts = field.split(".");

    let currentObj = newData[index];
    for (let i = 0; i < fieldParts.length - 1; i++) {
      currentObj = currentObj[fieldParts[i]];
    }
    currentObj[fieldParts[fieldParts.length - 1]] = value;
    // console.log("currentObj[fieldParts[fieldParts.length - 1]]",currentObj[fieldParts[fieldParts.length - 1]])
    // console.log("Value currentObj", currentObj["default_mint_value"])
    // console.log("Value", value)
    // console.log("Value", value)
    // console.log(errorInRows)

    if (value === "string") {
      if (type !== "originAttributes") {
        currentObj["default_mint_value"] = {
          string_attribute_value: { value: "" },
        };
        // console.log("Value currentObj", currentObj["default_mint_value"])
      }
      // if (newData[index].data_type !== 'number' || newData[index].value !== '123') {
      //   currentObj.hasConflict = true;
      // } else {
      //   currentObj.hasConflict = false;
      // }
      // console.log("Value currentObj", currentObj["display_option"]["default_mint_value"])
      // handelErrValue(value,index)
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

    // handelErrValue(value,index)
  };

  const handleCellChange2 = (index, field, value) => {
    // ทำการตรวจสอบค่า value ที่คุณต้องการ
    // const isValid = true; // เพิ่มตรวจสอบค่าตรงนี้
    const newData = [...data];
    // const fieldParts = field.split(".");

    const currentObj = newData[index];
    // console.log("handleCellChange2 ===>", currentObj);
    // console.log("field ===>", field);
    if (field === "boolean") {
      if (value) {
        currentObj["default_mint_value"] = {
          boolean_attribute_value: { value: true },
        };
        setSelectedItem2("true");
      } else {
        currentObj["default_mint_value"] = {
          boolean_attribute_value: { value: false },
        };
        setSelectedItem2("false");
      }
    } else if (field === "number") {
      // console.log("currentObj[default_mint_value]", currentObj["data_type"]);

      if (value.includes(".")) {
        currentObj["data_type"] = "float";
        currentObj["default_mint_value"] = {
          float_attribute_value: { value: value },
        };
        setSelectedItem2("float");
      } else {
        currentObj["data_type"] = "number";
        currentObj["default_mint_value"] = {
          number_attribute_value: { value: parseInt(value) },
        };
        setSelectedItem2("number");
      }
    }
  };

  useEffect(() => {
    if (errorName.length > 0) {
      isCheckErrorName.current = true;
    } else {
      isCheckErrorName.current = false;
    }
  }, [errorName]);

  const addDataTable = async () => {
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
  };

  const handelDel = (index: number) => {
    data.splice(index, 1);
    setIsData(data);
  };

  const handleErrorName = (index: number) => {
    const findError = errorName.filter((x: IerrorName) => x.isIndex === index);
    if (!findError || !Array.isArray(findError) || !findError.length) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    const fetchData = async () => {
      await checkErrorNameObj(data);
      // ทำอย่างอื่นที่คุณต้องการในนี้
    };

    fetchData();
  }, [isErrorObj]);

  // const handleCheckValue = (text: string, index: number) => {
  // };
  // console.log(data);

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
                    //   className={`border border-white bg-[#B9BAC2]
                    //   ${
                    //     editableRow === index ? "bg-blue-200" : ""
                    //   }`
                    // }
                    className={`border border-white 

                  ${editableRow === index ? "bg-blue-200" : ""}`}
                  >
                    {/* <td
                      className="border border-white"
                      contentEditable={editableRow === index}
                      onBlur={(e) =>
                        handleCellChange(index, "name", e.target.innerText)
                      }
                    >
                      {item.name}
                    </td> */}
                    <td className="border border-white">
                      <div
                        className={`flex justify-evenly ${
                          handleErrorName(index)
                            ? "border-[1px] border-red-500 w-[100%]"
                            : ""
                        }`}
                      >
                        {/* {console.log(item.default_mint_value)} */}
                        <input
                          type="text"
                          defaultValue={item.name}
                          onChange={(e) => {
                            if (isEdit) {
                              // console.log(e.target.value);
                              // console.log(item.default_mint_value)
                              handleCellChange(index, "name", e.target.value);
                              checkErrorValueName(e.target.value, index);
                            }
                          }}
                          // onBlur={fetchError}
                          className="bg-transparent text-[14px] border-[1px] border-[#D9D9D9DD] placeholder-gray-300 border-dashed p-1 focus:outline-none focus:scale-105 duration-1000 w-[100%]"
                          placeholder="Add name here"
                        />
                      </div>
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
                              item.data_type === type ||
                              (item.data_type === "float" && type === "number")
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
                    {type !== "originAttributes" &&
                      item.data_type === "string" && (
                        <td
                          className={`border ${
                            item.hasConflict ? "border-red-500" : "border-white"
                          }`}
                          contentEditable={editableRow === index}
                          // onChange={() => handleCheckValue("dd",index)}
                          onBlur={(e) => {
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
                            );
                            handelErrValue(e.target.innerText, index);
                          }}
                        >
                          {item.data_type === "number"
                            ? item.default_mint_value.number_attribute_value
                                .value
                            : item.data_type === "float"
                            ? item.default_mint_value.float_attribute_value
                                .value
                            : item.data_type === "boolean"
                            ? item.default_mint_value.boolean_attribute_value.value.toString()
                            : item.default_mint_value.string_attribute_value
                                .value}
                        </td>
                      )}

                    {type !== "originAttributes" &&
                      item.data_type === "boolean" && (
                        <div className="flex justify-evenly">
                          {["true", "false"].map((type) => (
                            <button
                              key={type}
                              onClick={(e) => {
                                // {console.log("e.currentTarget.id ", JSON.parse(e.currentTarget.id) )}
                                if (isEdit) {
                                  handleCellChange2(
                                    index,
                                    "boolean",
                                    JSON.parse(e.currentTarget.id)
                                  );
                                }
                              }}
                              id={type}
                              className={`cursor-pointer hover:scale-110 duration-500 w-7 h-7 rounded-full flex justify-center items-center border-[#D9D9D9DD] border-2 border-dashed ${
                                item.default_mint_value.boolean_attribute_value
                                  .value === JSON.parse(type)
                                  ? "bg-[#D9D9D975]"
                                  : "bg-transparent"
                              }`}
                            >
                              {/* {console.log(
                                "item.default_mint_va",
                                item.default_mint_value.boolean_attribute_value
                                  .value === true
                              )} */}
                              {type === "true" ? "yes" : "no"}
                            </button>
                          ))}
                        </div>
                      )}

                    {type !== "originAttributes" &&
                      item.data_type === "number" && (
                        <div className="flex justify-evenly">
                          {/* {console.log(item.default_mint_value)} */}
                          <input
                            type="number"
                            step="0.10"
                            defaultValue={
                              item.data_type === "number"
                                ? item.default_mint_value.number_attribute_value
                                    .value
                                : item.default_mint_value.float_attribute_value
                                    .value
                            }
                            onChange={(e) => {
                              if (isEdit) {
                                // console.log(e.target.value);
                                // console.log(item.default_mint_value)
                                handleCellChange2(
                                  index,
                                  "number",
                                  e.target.value
                                );
                              }
                            }}
                            // onBlur={fetchError}
                            className="bg-transparent text-[14px] border-[1px] border-[#D9D9D9DD] placeholder-gray-300 border-dashed p-1 focus:outline-none focus:scale-105 duration-1000 w-[140px]"
                            placeholder="Add trait type here"
                          />
                        </div>
                      )}

                    {type !== "originAttributes" &&
                      item.data_type === "float" && (
                        <div className="flex justify-evenly">
                          {/* {console.log(item.default_mint_value)} */}
                          <input
                            type="number"
                            step="0.10"
                            defaultValue={
                              item.data_type === "number"
                                ? item.default_mint_value.number_attribute_value
                                    .value
                                : item.default_mint_value.float_attribute_value
                                    .value
                            }
                            onChange={(e) => {
                              if (isEdit) {
                                // console.log(e.target.value);
                                // console.log(item.default_mint_value)
                                handleCellChange2(
                                  index,
                                  "number",
                                  e.target.value
                                );
                              }
                            }}
                            // onBlur={fetchError}
                            className="bg-transparent text-[14px] border-[1px] border-[#D9D9D9DD] placeholder-gray-300 border-dashed p-1 focus:outline-none focus:scale-105 duration-1000 w-[140px]"
                            placeholder="Add trait type here"
                          />
                        </div>
                      )}
                    <th className="border border-white  ">
                      <Flex>
                        <DeleteIcon onClick={() => handelDel(index)} />
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
