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

import { CircularProgress } from "@mui/material";

const DraftAttributes = () => {
  const [originAttributes, setOriginAttributes] = useState([]);
  const [collectionAttributes, setCollectionAttributes] = useState([]);
  const [tokenAttributes, setTokenAttributes] = useState([]);
  const [loading, setLoading] = useState(true);
  const FindSchemaCode = async () => {
    const apiUrl = `https://six-gen2-studio-nest-backend-api-traffic-gateway-1w6bfx2j.ts.gateway.dev/schema/get_schema_info/${getSCHEMA_CODE()}`;
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
        // console.log('Response:', response.data.data.schema_info.schema_info.origin_data.origin_attributes);
        setOriginAttributes(
          response.data.data.schema_info.schema_info.origin_data
            .origin_attributes
        );
        // console.log('Response:', response.data.data.schema_info.schema_info.onchain_data.nft_attributes);
        setCollectionAttributes(
          response.data.data.schema_info.schema_info.onchain_data.nft_attributes
        );
        // console.log(
        //   response.data.data.schema_info.schema_info.onchain_data
        //     .token_attributes
        // );
        setTokenAttributes(
          response.data.data.schema_info.schema_info.onchain_data
            .token_attributes
        );
      })
      setLoading(false)
      .catch((error) => {
        // Handle errors here
        console.error("Error:", error);
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
              <DraftMenu menu="attributes"></DraftMenu>
            </div>
            <div className="h-[83%] overflow-scroll">
              {loading === false ? (
                <div className=" flex flex-col gap-8 m-6 justify-center items-center ">
                  <div className="flex w-full justify-center gap-8 ">
                    <DraftAttributeTabel
                      type="originAttributes"
                      data={originAttributes}
                    />
                    <DraftAttributeTabel
                      type="collectionAttributes"
                      data={collectionAttributes}
                    />
                  </div>
                  <DraftAttributeTabel
                    type="tokenAttributes"
                    data={tokenAttributes}
                  />
                </div>
              ) : (
                <div className="h-full w-full flex items-center justify-center">
                  <CircularProgress
                    className=" text-white"
                    sx={{
                      width: 300,
                      color: "white",
                    }}
                  ></CircularProgress>
                </div>
              )}
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

export default DraftAttributes;
