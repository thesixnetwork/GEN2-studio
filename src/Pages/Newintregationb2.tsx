import { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";
import Conectwalet from "../component/Connectwallet";
import Stepper2 from "../component/Stepper2";
import Darkbg from "../component/Alert/Darkbg";

import { ReactFlowProvider } from "reactflow";
import "reactflow/dist/base.css";

import {
  getAccessTokenFromLocalStorage,
  getSCHEMA_CODE,
} from "../helpers/AuthService";
import axios from "axios";
import WhenFlow from "../component/ReactFlow/When/WhenFlow";

export default function Newintregationb1() {
  const [isShow, setIsShow] = useState(false);
  const [actionName, setActionName] = useState("");
  const findSchemaCode = async () => {
    const apiUrl = `${
      import.meta.env.VITE_APP_API_ENDPOINT_SCHEMA_INFO
    }schema/get_schema_info/${getSCHEMA_CODE()}`;
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
        console.log("Response:", response.data);
        const Actions =
          response.data.data.schema_info.schema_info.onchain_data.actions;
        setActionName(
          response.data.data.schema_info.schema_info.onchain_data.actions[
            Actions.length - 1
          ].name
        );
        console.log(
          "actionName:",
          response.data.data.schema_info.schema_info.onchain_data.actions[0]
            .name
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    findSchemaCode();
  }, []);
  return (
    <div className="w-full flex justify-center ">
      <div className="w-full h-full fixed  flex justify-center items-center bg-gradient-24  from-white to-[#7A8ED7]">
        <div className="w-[1280px] h-[832px] bg-gradient-24 to-gray-700 from-gray-300 rounded-2xl flex justify-between p-4 shadow-lg shadow-black/20 dark:shadow-black/40">
          <div className="w-full h-full px-[20px]">
            <div className="flex ">
              <div>
                <Stepper2 ActiveStep={6}></Stepper2>
                <div className="w-[931px] h-[1px] bg-[#D9D9D9]"></div>
              </div>
              <Conectwalet></Conectwalet>
            </div>
            <div className="mt-[20px] flex flex-col items-center justify-center">
              <ReactFlowProvider>
                <WhenFlow
                  isDraft={false}
                  metaFunction="create-new-when"
                  schemaRevision={getSCHEMA_CODE()}
                  actionName={actionName}
                />
              </ReactFlowProvider>
            </div>
          </div>
          <Tooltip title={"help"}>
            <div
              onClick={() => {
                setIsShow(true);
              }}
              className=" z-[51] w-[50px] h-[50px] rounded-full bg-transparent  hover:bg-slate-200 flex justify-center items-center absolute text-[50px] mt-[750px] ml-[1180px] cursor-pointer hover:scale-150 hover:text-[#262f50] duration-500"
            >
              ?
            </div>
          </Tooltip>
        </div>
        {isShow && (
          <div
            className="absolute duration-500"
            onClick={() => {
              setIsShow(!isShow);
            }}
          >
            <Darkbg></Darkbg>
          </div>
        )}
      </div>
    </div>
  );
}
``;
