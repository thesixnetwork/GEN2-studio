import React, { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";


import Swal from "sweetalert2";

import DraftMenu from "../component/DraftMenu";
import NormalButton from "../component/NormalButton";
import axios from "axios";
import { getAccessTokenFromLocalStorage } from "../helpers/AuthService";
import { useParams } from 'react-router-dom';
import DraftAttributeTable from "../component/DraftAttributeTable";

import { CircularProgress } from "@mui/material";

const DraftAttributesType = () => {
  const [originAttributes, setOriginAttributes] = useState([]);
  const [collectionAttributes, setCollectionAttributes] = useState([]);
  const [tokenAttributes, setTokenAttributes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState()
  const [isSave, setIsSave] = useState(false);

  const param = useParams();

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
          response.data.data.schema_info.schema_info.onchain_data.token_attributes
        );

        setData(response.data.data.schema_info.schema_info)
          setLoading(false)
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false)
      });
  };

  const saveData = async () => {

    const apiUrl = 'https://six-gen2-studio-nest-backend-api-traffic-gateway-1w6bfx2j.ts.gateway.dev/schema/set_schema_info';
    const requestData = {
      "payload": {
        "schema_info": data,
        "schema_code": param.schema_revision,
        "status": "Draft",
        "current_state": "0"
      }
    };
    if (Object.values(isSave).every(attribute => attribute === true)) {
        await axios.post(apiUrl, requestData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAccessTokenFromLocalStorage()}`,  // Set the content type to JSON
            // Add any other headers your API requires
          },
        })
          .then(response => {
            console.log('API Response saveOriginContractAddressAndOriginBaseURI :', response.data);
            console.log("Request :",requestData)
            // You can handle the API response here
             Swal.fire({
              position: "center",
              icon: "success",
              title: "Attributes saved",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch(error => {
            console.error('API Error:', error);
            // Handle errors here
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Something went wrong",
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }else{
        await Swal.fire({
          position: "center",
          icon: "error",
          title: "Plase save your edited before save your attributes",
          showConfirmButton: true,
        });
  
      }
  }
  console.log(param.attribute_type)
  useEffect(() => {
    FindSchemaCode();
  }, []);
  return (
    <div className="w-full flex justify-center ">
      <div className="w-full h-full fixed  flex justify-center items-center bg-gradient-24  from-white to-[#7A8ED7]">
        <div className="w-[1280px] h-[832px] bg-gradient-24 to-gray-700 from-gray-300 rounded-2xl flex justify-between p-4 shadow-lg shadow-black/20 dark:shadow-black/40">
          <div className="w-full h-full">
            <div className="flex justify-between">
              <DraftMenu menu="attributes" schemaCode={param.schema_revision}></DraftMenu>
            </div>
            <div className="h-[83%] overflow-scroll">
              {loading === false && data !== undefined ? (
                <div className=" flex w-full h-full gap-8 justify-center items-center ">
                  <div className="flex w-full justify-center gap-8 ">
                    <DraftAttributeTable
                      type={param.attribute_type}
                      data={param.attribute_type === "originAttributes" ? data.origin_data.origin_attributes : param.attribute_type === "collectionAttributes" ? data.onchain_data.nft_attributes : data.onchain_data.token_attributes}
                        expand={true}
                        setIsSave={setIsSave}
                    />
                  </div>
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
              <div className="w-32" onClick={saveData}>
                <NormalButton
                  TextTitle="SAVE"
                  BorderRadius={0}
                  FontSize={24}
                ></NormalButton>
              </div>
              <div className="w-32" onClick={FindSchemaCode} >
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

export default DraftAttributesType;
