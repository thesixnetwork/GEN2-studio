import { Button, Tooltip } from "@mui/material";
import editIcon from "../pic/draft-edit-rounded.png";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import NormalButton from "./NormalButton";
import EastIcon from "@mui/icons-material/East";
import { useState } from "react";
import axios from "axios";
import { set } from "lodash";
import { getAccessTokenFromLocalStorage } from "../helpers/AuthService";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import RedAleart from "./Alert/RedAleart";

const DraftCreateNewAction = ( {actions,setActions}) => {
  const [actionNameValue, setActionNameValue] = useState("");
  const [actionDescriptionValue, setActionDescriptionValue] = useState("");
  const [showActionName, setShowActionName] = useState(false);
  const [showActionDescription, setShowActionDescription] = useState(false);
  const [descriptionErrorMessage, setDescriptionErrorMessage] = useState("");
  const [actionNameErrorMessage, setActionNameErrorMessage] = useState("");
  const [isDescriptionError, setIsDescriptionError] = useState(false);
  const [isActionNameError, setIsActionNameError] = useState(false);
  const param = useParams();
  const navigate = useNavigate();

  const saveAction = async () => {
    const apiUrl =
      `${import.meta.env.VITE_APP_API_ENDPOINT_SCHEMA_INFO}schema/set_actions`;
    const requestData = {
      payload: {
        schema_code: param.schema_revision,
        name: actionNameValue,
        desc: actionDescriptionValue,
      },
    };
    console.log("1",requestData)

    await axios
      .post(apiUrl, requestData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessTokenFromLocalStorage()}`,
        },
      })
      .then((response) => {
        console.log(
          "API Response saveOnchainCollectionAttributes :",
          response.data
        );
        console.log("Request :", requestData);
        console.log(">",actions)
        console.log(">>",response.data)
        console.log(">>>",response.data.data.schema_info.schema_info.onchain_data.actions)
        setActions([...actions,response.data.data.schema_info.schema_info.onchain_data.actions[response.data.data.schema_info.schema_info.onchain_data.actions.length-1]])
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  };

  const containsSpecialChars = (str) => {
    const specialChars = /[`!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
  };

  const containsSpace = (str) => {
    const specialChars = / /;
    return specialChars.test(str);
  };

  const containsUppercase = (str) => {
    return /[A-Z]/.test(str);
  };

  const checkActionNameError = async (str) => {
    setIsActionNameError(false);
    if (!str) {
      setActionNameErrorMessage("Not Availible");
      setIsActionNameError(true);
    } else if (containsSpecialChars(str)) {
      setActionNameErrorMessage("Special Characters");
      setIsActionNameError(true);
    } else if (containsSpace(str)) {
      setActionNameErrorMessage("Space");
      setIsActionNameError(true);
    } else if (containsUppercase(str)) {
      setActionNameErrorMessage("Uppercase");
      setIsActionNameError(true);
    } else {
      setIsActionNameError(false);
    }
  };

  const checkDescriptionError = async (str) => {
    setIsDescriptionError(false);
    if (!str) {
      setDescriptionErrorMessage("Not Availible");
      setIsDescriptionError(true);
    } else {
      setIsDescriptionError(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowActionName(true);
    }, 2300);
  }, []);
  return (
    <div className="border border-white w-full h-80 p-4">
      <TypeAnimation
        className=" text-gray-200"
        sequence={[
          `Welcome to Actions\nLet’s begin the adventure`,
          2000,
          `Welcome to Actions\nLet’s begin the adventure`,
        ]}
        speed={50}
        style={{ whiteSpace: "pre-line", fontSize: "15px" }}
        repeat={0}
        preRenderFirstString={false}
      />
      {showActionName && (
        <div>
          <h1 className="text-md font-bold mt-4">Enter your “Action” name</h1>
          <div className="w-full flex  items-center mt-3">
            <div className="">
              <EastIcon></EastIcon>
            </div>
            <div className="ml-4">
              <input
                id="1"
                type="text"
                autoFocus
                className={`bg-transparent text-md border-[1px] border-transparent focus:border-[#D9D9D9DD] placeholder-gray-300 border-dashed p-1 focus:outline-none focus:scale-105 duration-1000 w-[350px] h-[${20}px]`}
                placeholder={""}
                onChange={(e) => {
                  setActionNameValue(e.target.value);
                  checkActionNameError(e.target.value);
                }}
              />
              {isActionNameError && (
                <div className=" flex  justify-center">
                  <RedAleart
                    Height={20}
                    Width={180}
                    Rotate={0}
                    ML={0}
                    MT={0}
                    detailsText={actionNameErrorMessage}
                  />
                </div>
              )}
            </div>
            {!showActionDescription && (
              <div
                onClick={() => setShowActionDescription(true)}
                className="ml-5"
              >
                <NormalButton
                  BorderRadius={0}
                  FontSize={0}
                  TextTitle={"Next"}
                ></NormalButton>
              </div>
            )}
          </div>
          {showActionDescription && (
            <>
              <div>
                <h1 className="text-md font-bold mt-8">
                  Enter your description of the action
                </h1>
                <div className=" w-full flex items-center  mt-3 ">
                  <EastIcon></EastIcon>
                  <div className="ml-4">
                    <input
                      type="text"
                      autoFocus
                      className={`bg-transparent text-md border-[1px] border-transparent focus:border-[#D9D9D9DD] placeholder-gray-300 border-dashed p-1 focus:outline-none focus:scale-105 duration-1000 w-[350px] h-[${20}px]`}
                      placeholder={""}
                      onChange={(e) => {
                        setActionDescriptionValue(e.target.value);
                        checkDescriptionError(e.target.value);
                      }}
                    />
                    {isDescriptionError && (
                      <div className="flex justify-center">
                        <RedAleart
                          Height={20}
                          Width={180}
                          Rotate={0}
                          ML={0}
                          MT={0}
                          detailsText={descriptionErrorMessage}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-end flex-end w-full mt-8">
                <div
                  onClick={saveAction}
                  className="w-48"
                >
                  <NormalButton
                    BorderRadius={0}
                    FontSize={0}
                    TextTitle={"ADD NEW ACTION"}
                  ></NormalButton>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default DraftCreateNewAction;
