import React, { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";

import Add from "../pic/Group 40.png";

import Conectwalet from "../component/Connectwallet";
import Stepper2 from "../component/Stepper2";
import Darkbg from "../component/Alert/Darkbg";
import AlertCard from "../component/Alert/AlertCard";

import Swal from "sweetalert2";
import AttributeBox from "../component/AttributeBox";
import { useNavigate } from "react-router-dom";

import whiteArrow from "../pic/action-white-arrow.png";
import blackArrow from "../pic/action-back-arrow.png";
import ActionTypeCard from "../component/ActionTypeCard";
import { getActionName } from "../helpers/AuthService";
import DraftMenu from "../component/DraftMenu";
import DraftAttributeTabel from "../component/DraftAttributeTable";
import NormalButton from "../component/NormalButton";
import axios from "axios";
import { getAccessTokenFromLocalStorage } from "../helpers/AuthService";
import { getSCHEMA_CODE } from "../helpers/AuthService";
import { set } from "lodash";
import DraftActionCard from "../component/DraftActionCard";
import DraftActionPreviewCard from "../component/DraftActionPreviewCard";
import { CircularProgress } from "@mui/material";
import { useParams } from 'react-router-dom';


const DraftActions = () => {
  const [actions, setActions] = useState([]);

  const [selectedAction, setSelectedAction] = useState(null);
  const [loading, setLoading] = useState(true);
  const { schema_revision } = useParams();

  const handleActionClick = (data) => {
    setSelectedAction(data);
    console.log(data);
  };

  const FindSchemaCode = async () => {
    const apiUrl = `https://six-gen2-studio-nest-backend-api-traffic-gateway-1w6bfx2j.ts.gateway.dev/schema/get_schema_info/${schema_revision}`;
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
        setActions(
          response.data.data.schema_info.schema_info.onchain_data.actions
        );
        setLoading(false);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error:", error);
        setLoading(false);
      });
  };


  useEffect(() => {
    FindSchemaCode();
  }, []);
  return (
    <div className="w-full flex justify-center ">
      <div className="w-full h-full fixed  flex justify-center items-center bg-gradient-24  from-white to-[#7A8ED7]">
        <div className="w-[1280px] h-[832px] bg-gradient-24 to-gray-700 from-gray-300 rounded-2xl flex justify-between p-4 shadow-lg shadow-black/20 dark:shadow-black/40">
          <div className="w-full h-full">
            <div className="flex justify-between">
              <DraftMenu menu="actions" schemaCode={schema_revision} ></DraftMenu>
            </div>
            <div className="h-[83%] flex items-center justify-center">
              <div className="w-[45%] h-[80%] border-2 border-r rounded-l-xl border-white">
                <h1 className="text-2xl p-4">Actions</h1>
                {loading === true ? (
                  <div className="flex justify-center items-center">
                    <CircularProgress
                      className=" text-white"
                      sx={{
                        width: 300,
                        color: "white",
                      }}
                    ></CircularProgress>
                  </div>
                ):( <div className="grid grid-cols-2 gap-4 p-4">
                {actions !== undefined &&
                  actions.map((data, index) => (
                    <div
                      onClick={() => {
                        handleActionClick(data);
                      }}
                    >
                      <DraftActionCard key={index} data={data} />
                    </div>
                  ))}
              </div>)}
              </div>
              <div className="w-[45%] h-[80%] border-2 border-l rounded-r-xl border-white">
                <h1 className="text-2xl p-4">Code Preview</h1>
                <div className="flex justify-center">
                  {selectedAction !== null && (

                  <DraftActionPreviewCard data={selectedAction} param={schema_revision}/>
                  )}
                </div>
              </div>
            </div>
            <div className="h-[7%] items-center w-full flex justify-center gap-x-8">
              <div className="w-32">
                <NormalButton
                  TextTitle="SAVE"
                  BorderRadius={0}
                  FontSize={24}
                ></NormalButton>
              </div>
              <div className="w-32">
                <NormalButton
                  TextTitle="DISCARD"
                  BorderRadius={0}
                  FontSize={24}
                ></NormalButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DraftActions;
