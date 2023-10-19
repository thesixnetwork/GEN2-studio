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
const DraftActions = () => {
  const [originAttributes,setOriginAttributes] = useState([])
  const [collectionAttributes,setCollectionAttributes] = useState([])
  const [tokenAttributes,setTokenAttributes] = useState([])
  
  const FindSchemaCode = async () => {
    const apiUrl = `https://six-gen2-studio-nest-backend-api-traffic-gateway-1w6bfx2j.ts.gateway.dev/schema/get_schema_info/${getSCHEMA_CODE()}`;
    const params = {
    };
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAccessTokenFromLocalStorage()}`,
    }
    await axios.get(apiUrl, {
      params: params, 
      headers: headers, 
    })
      .then((response) => {
        console.log('Response:', response.data.data.schema_info.schema_info.origin_data.origin_attributes);

      })
      .catch((error) => {
        // Handle errors here
        console.error('Error:', error);
      });
  }

  useEffect(() => {
    FindSchemaCode()
  }, []);
  return (
    <div className="w-full flex justify-center ">
      <div className="w-full h-full fixed  flex justify-center items-center bg-gradient-24  from-white to-[#7A8ED7]">
        <div className="w-[1280px] h-[832px] bg-gradient-24 to-gray-700 from-gray-300 rounded-2xl flex justify-between p-4 shadow-lg shadow-black/20 dark:shadow-black/40">
          <div className="w-full h-full">
            <div className="flex justify-between">
              <DraftMenu menu="attributes"></DraftMenu>
            </div>
            <div className="h-[83%] flex items-center justify-center">
             <div className="w-[45%] h-[80%] border-2 border-r rounded-l-xl border-white">
                <h1 className="text-2xl p-4">Actions</h1>
                <div className="flex">

                <DraftActionCard></DraftActionCard>
                <DraftActionCard></DraftActionCard>
                </div>

             </div>
             <div className="w-[45%] h-[80%] border-2 border-l rounded-r-xl border-white">
                <h1 className="text-2xl p-4">Code Preview</h1>
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
