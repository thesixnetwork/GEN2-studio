import React, { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";

import EastIcon from "@mui/icons-material/East";
import { Link, useNavigate, useParams } from "react-router-dom";
import NormalButton from "../component/NormalButton";
import {
  getAccessTokenFromLocalStorage,
  getActionName,
  getSCHEMA_CODE,
} from "../helpers/AuthService";
import axios from "axios";
import { result } from "lodash";

const DraftEditActionsThenTranformStatic = () => {
  const [isShow, setIsShow] = useState(false);
  const [imgSource, setImgSource] = useState("");
  const param = useParams();
  const [metaFunction, setMetaFunction] = useState("");
  const [valuInput, setValueInput] = useState("");
  const [actionData, setActionData] = useState();
  const [actionThenArr, setActionThenArr] = useState([]);
  const [actionThenIndex, setActionThenIndex] = useState(null);

  const convertFromBase64 = (str) => {
    return atob(str);
  };

  const convertToBase64 = (str) => {
    return btoa(str);
  };

  const FindSchemaCode = async () => {
    const apiUrl = `https://six-gen2-studio-nest-backend-api-traffic-gateway-1w6bfx2j.ts.gateway.dev/schema/get_schema_info/${param.schema_revision}`;
    const params = {};
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessTokenFromLocalStorage()}`,
    };
    await axios
      .get(apiUrl, {
        params: params,
        headers: headers,
      })
      .then((response) => {
        console.log(
          "Response:",
          response.data.data.schema_info.schema_info.onchain_data.actions
        );
        setActionData(
          response.data.data.schema_info.schema_info.onchain_data.actions
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };


  const onChange = (e: any) => {
    setImgSource(e.target.value);
    setValueInput(e.target.value);
  };

  const getImgFromParam = (string) => {
    const firstQuoteIndex = string.indexOf("'");
    if (firstQuoteIndex === -1) {
      return null;
    }

    const secondQuoteIndex = string.indexOf("'", firstQuoteIndex + 1);
    if (secondQuoteIndex === -1) {
      return null;
    }

    const url = string.slice(firstQuoteIndex + 1, secondQuoteIndex);
    return url;
  };

  useEffect(() => {
    FindSchemaCode();
  }, []);

  useEffect(() => {
    setMetaFunction(convertFromBase64(convertToBase64(param.meta_function)));
    console.log("---metaFunction",convertFromBase64(metaFunction))
    if (metaFunction.startsWith("meta.SetImage")) {
      setImgSource(getImgFromParam(metaFunction));
      setValueInput(getImgFromParam(metaFunction));
      console.log("working")
    }
  }, [metaFunction]);

  // useEffect(() => {
  //   if (actionData !== undefined) {
  //     const getDataByName = (data, name) => {
  //       return data.find((item) => item.name === name);
  //     };
  //     const result = getDataByName(actionData, param.action_name);
  //     setActionThenArr(result.then);
  //   }

  //   const index = actionThenArr.indexOf(
  //     `${convertFromBase64(param.meta_function)}`
  //   );
  //   setActionThenIndex(index);
  //   console.log("123", `${convertFromBase64(param.meta_function)}`);
  //   console.log("actionThenArr: ", actionThenArr);
  // }, [actionData]);

  // const convertMetaData = (imagePath: string) => {
  //   return `meta.SetImage('${imagePath}')`;
  // };

  const saveAction = async () => {

    actionThenArr[actionThenIndex] = convertMetaData(imgSource)
    console.log(actionThenArr)
    const apiUrl =
      "https://six-gen2-studio-nest-backend-api-traffic-gateway-1w6bfx2j.ts.gateway.dev/schema/set_actions"; // Replace with your API endpoint
    const requestData = {
      payload: {
        schema_code: param.schema_revision,
        update_then: true,
        name: param.action_name,
        then: actionThenArr,
      },
    };

    await axios
      .post(apiUrl, requestData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessTokenFromLocalStorage()}`, // Set the content type to JSON
          // Add any other headers your API requires
        },
      })
      .then((response) => {
        console.log(
          "API Response saveOnchainCollectionAttributes :",
          response.data
        );
        console.log("Request :", requestData);
        // You can handle the API response here
      })
      .catch((error) => {
        console.error("API Error:", error);
        // Handle errors here
      });
  };
  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-center ">
      <div className="w-full h-full fixed  flex justify-center items-center bg-gradient-24  from-white to-[#7A8ED7]">
        <div className="w-[1280px] h-[832px] bg-gradient-24 to-gray-700 from-gray-300 rounded-2xl flex justify-between p-4 shadow-lg shadow-black/20 dark:shadow-black/40">
          <div className="w-full h-full px-[20px]">
            <div className="w-full  flex items-center justify-center h-full">
              <div className="h-[600px] border-2 border-white rounded-lg p-14">
                <h2>Enter static image path</h2>
                <div>
                  <EastIcon></EastIcon>
                  <input
                    id="1"
                    type="text"
                    autoFocus
                    className="ml-2 my-2 bg-transparent text-[14px] border-[1px] border-transparent focus:border-[#D9D9D9DD] placeholder-gray-300 border-dashed p-1 focus:outline-none focus:scale-105 duration-1000 w-[350px] h-[20px]"
                    placeholder={"Input your image url"}
                    value={valuInput}
                    onChange={async (e) => {
                      onChange(e);
                    }}
                  />
                </div>
                <div className="flex flex-col justify-center items-center">
                  <div className="bg-[#A2A3AA] border-2 border-white py-1 px-2">
                    Preview
                  </div>
                  <div className="my-4 h-60">
                    {imgSource !== "" && (
                      <img
                        src={imgSource}
                        alt="preview-image"
                        className="w-full h-full"
                      />
                    )}
                  </div>
                  <div
                    className="flex justify-center"
                    onClick={async () => {
                      await saveAction();
                      navigate(`/draft/actions/${param.schema_revision}`);
                    }}
                  >
                    <NormalButton
                      BorderRadius={0}
                      FontSize={32}
                      TextTitle={"SAVE"}
                    ></NormalButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DraftEditActionsThenTranformStatic;
