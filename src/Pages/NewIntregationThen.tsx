import { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";
import Conectwalet from "../component/Connectwallet";
import Stepper2 from "../component/Stepper2";
import Darkbg from "../component/Alert/Darkbg";
import ActionTypeCard from "../component/ActionTypeCard";
import DraftActionThenPreview from "../component/DraftActionThenPreview";
import axios from "axios";
import {
  getAccessTokenFromLocalStorage,
  getSCHEMA_CODE,
  getActionName,
} from "../helpers/AuthService";
import { CircularProgress } from "@mui/material";

const NewIntregationThen = () => {
  const [isShow, setIsShow] = useState(false);
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(true);
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
        console.log(
          "Response:",
          response.data.data.schema_info.schema_info.onchain_data.actions
        );
        // find action name from param.action_name which action have same name with respond then setActions
        const actions =
          response.data.data.schema_info.schema_info.onchain_data.actions.filter(
            (action) => action.name === getActionName()
          );
        setActions(actions);
        console.log("->>>", actions);
        setLoading(false);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error:", error);
        setLoading(false);
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
            <div className="flex justify-between">
              <div>
                <Stepper2 ActiveStep={6}></Stepper2>
                <div className="w-[931px] h-[1px] bg-[#D9D9D9]"></div>
              </div>
              <Conectwalet></Conectwalet>
            </div>
            <div className=" w-full flex flex-col items-center justify-center gap-10 min-h-[89.1%]">
              {loading ? (
                <CircularProgress
                  className=" text-white"
                  sx={{
                    width: 300,
                    color: "white",
                  }}
                ></CircularProgress>
              ) : (
                <>
                <div className="max-w-1/2 h-92 flex flex-col items-center justify-center gap-y-10">
                  {actions !== undefined && (
                    <DraftActionThenPreview actions={actions}/>
                  )}
                  <div className="flex gap-x-10">
                    <ActionTypeCard type="update" draft={true} />
                    <ActionTypeCard type="transfer" draft={true} />
                    <ActionTypeCard type="transform" draft={true} />
                  </div>

                </div>
                </>
              )}
            </div>
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
        {isShow && (
          <div
            className="absolute duration-500"
            onClick={() => {
              setIsShow(!isShow);
              //   sethelpStep(0)
            }}
          >
            <Darkbg></Darkbg>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewIntregationThen;
