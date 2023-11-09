import { useEffect, useState } from "react";

import Swal from "sweetalert2";

import DraftMenu from "../component/DraftMenu";
import DraftAttributeTable from "../component/DraftAttributeTable";
import NormalButton from "../component/NormalButton";
import axios from "axios";
import { getAccessTokenFromLocalStorage } from "../helpers/AuthService";

import { useParams } from "react-router-dom";

import { CircularProgress } from "@mui/material";

const DraftAttributes = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [isSave, setIsSave] = useState({
    originattributes: true,
    collectionattributes: true,
    tokenattributes: true,
  });
  const [whichExpand, setWhichExpand] = useState("none");
  const { schema_revision } = useParams();

  const FindSchemaCode = async () => {
    const apiUrl = `${
      import.meta.env.VITE_APP_API_ENDPOINT_SCHEMA_INFO
    }schema/get_schema_info/${schema_revision}`;
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
        setData(response.data.data.schema_info.schema_info);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  };

  const saveData = async () => {
    const apiUrl = `${
      import.meta.env.VITE_APP_API_ENDPOINT_SCHEMA_INFO
    }schema/set_schema_info`;
    const requestData = {
      payload: {
        schema_info: data,
        schema_code: schema_revision,
        status: "Draft",
        current_state: "0",
      },
    };
    if (Object.values(isSave).every((attribute) => attribute === true)) {
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
            "API Response saveOriginContractAddressAndOriginBaseURI :",
            response.data
          );
          console.log("Request :", requestData);
          // You can handle the API response here
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Attributes saved",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((error) => {
          console.error("API Error:", error);
          // Handle errors here
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Something went wrong",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    } else {
      await Swal.fire({
        position: "center",
        icon: "error",
        title: "Plase save your edited before save your attributes",
        showConfirmButton: true,
      });
    }
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
              <DraftMenu
                menu="attributes"
                schemaCode={schema_revision}
                next={true}
              ></DraftMenu>
            </div>
            <div className="h-[83%] overflow-scroll">
              <div className=" flex flex-col gap-8 m-6 justify-center items-center ">
                {loading === false &&
                data !== undefined &&
                whichExpand === "none" ? (
                  <>
                    <div className="flex w-full justify-center gap-8 ">
                      <DraftAttributeTable
                        type="originAttributes"
                        expand={false}
                        data={data.origin_data.origin_attributes}
                        setIsSave={setIsSave}
                        whichExpand={whichExpand}
                        setWhichExpand={setWhichExpand}
                      />
                      <DraftAttributeTable
                        type="collectionAttributes"
                        expand={false}
                        data={data.onchain_data.nft_attributes}
                        setIsSave={setIsSave}
                        whichExpand={whichExpand}
                        setWhichExpand={setWhichExpand}
                      />
                    </div>
                    <DraftAttributeTable
                      type="tokenAttributes"
                      expand={false}
                      data={data.onchain_data.token_attributes}
                      setIsSave={setIsSave}
                      whichExpand={whichExpand}
                      setWhichExpand={setWhichExpand}
                    />
                  </>
                ) : whichExpand === "originAttributes" ? (
                  <div className="flex w-full justify-center gap-8 ">
                    <DraftAttributeTable
                      type="originAttributes"
                      expand={true}
                      data={data.origin_data.origin_attributes}
                      setIsSave={setIsSave}
                      whichExpand={whichExpand}
                      setWhichExpand={setWhichExpand}
                    />
                  </div>
                ) : whichExpand === "collectionAttributes" ? (
                  <div className="flex w-full justify-center gap-8 ">
                  <DraftAttributeTable
                    type="collectionAttributes"
                    expand={true}
                    data={data.onchain_data.nft_attributes}
                    setIsSave={setIsSave}
                    whichExpand={whichExpand}
                    setWhichExpand={setWhichExpand}
                  />
                  </div>
                ) : whichExpand === "tokenAttributes" ? (
                  <div className="flex w-full justify-center gap-8 ">
                  <DraftAttributeTable
                    type="tokenAttributes"
                    expand={true}
                    data={data.onchain_data.token_attributes}
                    setIsSave={setIsSave}
                    whichExpand={whichExpand}
                    setWhichExpand={setWhichExpand}
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
            </div>
            <div className="h-[7%] items-center w-full flex justify-center gap-x-8">
              <div className="w-32" onClick={saveData}>
                <NormalButton
                  TextTitle="SAVE"
                  BorderRadius={0}
                  FontSize={24}
                ></NormalButton>
              </div>
              <div className="w-32" onClick={FindSchemaCode}>
                <NormalButton
                  TextTitle="RESET"
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
