import imgTestnet from "../pic/testnet.png";
import imgMainnet from "../pic/mainnet.png";
import Conectwalet from "../component/Connectwallet";
import axios from "axios";
import { Buffer } from "buffer";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Flex,
  Text,
  Divider,
  useDisclosure,
} from "@chakra-ui/react";

import { getAccessTokenFromLocalStorage } from "../helpers/AuthService";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EncodeObject, OfflineSigner, Registry } from "@cosmjs/proto-signing";

import { MsgCreateNFTSchema } from "../types/nftmngr/tx";
import { SigningStargateClient } from "@cosmjs/stargate";
import { GasPrice } from "@cosmjs/stargate/build/fee";
import DraftMenu from "../component/DraftMenu";
import NormalButton from "../component/NormalButton";
import Swal from "sweetalert2";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import GobackButton from "../component/GobackButton";

const DraftDeployment = () => {
  const { schema_revision } = useParams();
  const navigate = useNavigate();
  const getOriginAttributFromContract = async () => {
    const apiUrl = `${
      import.meta.env.VITE_APP_API_ENDPOINT_SCHEMA_INFO
    }schema/list_draft`; // Replace with your API endpoint
    const params = {};

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessTokenFromLocalStorage()}`,
    };

    // Make a GET request with parameters
    await axios
      .get(apiUrl, {
        params: params, // Pass parameters as an object
        headers: headers, // Pass headers as an object
      })
      .then((response) => {
        console.log("Response :", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    getOriginAttributFromContract();
  }, []);

  //////////////////////
  const [schemaInfo, setSchemaInfo] = useState(null);
  const [isAccount, setIsAccount] = useState<OfflineSigner[]>();
  const [chainId, setChainId] = useState("fivenet");
  const [offlineSigner, setOfflineSigner] = useState();
  const [isFalse, setIsFalse] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deployLoading, setDeployLoading] = useState(false);
  // const isAccount = useRef({});
  // console.log("isAccount", isAccount)
  // let isAccounts:Account

  const [rpcEndpoint, setRpcEndpoint] = useState(
    `${import.meta.env.VITE_APP_RPC2_ENDPOINT_SIX_FIVENET}`
  );

  const getAccount = async () => {
    const offlineSigner = await window.getOfflineSigner(chainId);
    const keplrAccounts = await offlineSigner.getAccounts();

    setOfflineSigner(offlineSigner);
    setIsAccount(keplrAccounts);
  };

  const get_schema_info = async () => {
    const schema_info = await axios.get(
      `${
        import.meta.env.VITE_APP_API_ENDPOINT_SCHEMA_INFO
      }schema/get_schema_info/${schema_revision}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessTokenFromLocalStorage()}`,
        },
      }
    );
    if (schema_info.data.data.schema_info.schema_info) {
      setSchemaInfo(schema_info.data.data.schema_info.schema_info);
      setLoading(false);
    }
    console.log("req,schema_info", schema_info);
  };

  const HandlerDeploySchemaCode = async () => {
    setDeployLoading(true);
    let msgArray: Array<EncodeObject> = [];

    const encodeBase64Schema = Buffer.from(JSON.stringify(schemaInfo)).toString(
      "base64"
    );
    console.log("schemaInfo", schemaInfo);

    if (isAccount && offlineSigner) {
      const msgCreateNFTSchema: MsgCreateNFTSchema = {
        creator: isAccount[0].address,
        nftSchemaBase64: encodeBase64Schema,
      };
      const msgCreateNFTSchemaEndcode: EncodeObject = {
        typeUrl: "/thesixnetwork.sixnft.nftmngr.MsgCreateNFTSchema",
        value: MsgCreateNFTSchema.fromPartial(msgCreateNFTSchema),
      };
      // const msgCreateNFTSchemaEndcode = await TomsgCreateNFTSchema(msgCreateNFTSchema)
      const types = [
        [
          "/thesixnetwork.sixnft.nftmngr.MsgCreateNFTSchema",
          MsgCreateNFTSchema,
        ],
      ];

      // const registry = new Registry(types);
      const registry = new Registry();
      registry.register(
        "/thesixnetwork.sixnft.nftmngr.MsgCreateNFTSchema",
        MsgCreateNFTSchema
      );
      // const registry = new Registry().register(types);

      const rpcClient = await SigningStargateClient.connectWithSigner(
        rpcEndpoint,
        offlineSigner,
        {
          registry: registry,
          gasPrice: GasPrice.fromString("1.25usix"),
        }
      );

      console.log("rpcClient", rpcClient);
      msgArray.push(msgCreateNFTSchemaEndcode);

      try {
        const txResponse = await rpcClient.signAndBroadcast(
          isAccount[0].address,
          msgArray,
          "auto",
          ``
        );
        console.log("tx-----", txResponse);
        const apiUrl = `${
          import.meta.env.VITE_APP_API_ENDPOINT_SCHEMA_INFO
        }schema/set_schema_info`;
        const requestData = {
          payload: {
            schema_code: schema_revision,
            status: "Testnet",
            current_state: "7",
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
            console.log("API Response Deploy :", response.data);
            console.log(requestData);
            // You can handle the API response here
          })
          .catch((error) => {
            console.error("API Error:", error);
            // Handle errors here
          });

        await Swal.fire({
          position: "center",
          icon: "success",
          title: "Deployed Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      } catch (error) {
        console.error(error);
        setDeployLoading(false);
        await Swal.fire({
          position: "center",
          icon: "error",
          title: "Something went wrong",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  useEffect(() => {
    get_schema_info();
    getAccount();
  }, [isFalse]);

  return (
    <div className="w-full flex justify-center ">
      <div className="w-full h-full fixed  flex justify-center items-center bg-gradient-24  from-white to-[#7A8ED7]">
        <div className=" relative w-[1280px] h-[832px] bg-gradient-24 to-gray-700 from-gray-300 rounded-2xl flex justify-between p-4 shadow-lg shadow-black/20 dark:shadow-black/40">
          <div className=" w-full h-full">
            <div className="flex justify-between">
              <DraftMenu menu="deployment" next={true}></DraftMenu>
            </div>
            <div className="h-[83%] flex items-center justify-center">
              {loading ? (
                <div className="h-full w-full flex items-center justify-center">
                  <CircularProgress
                    className=" text-white"
                    sx={{
                      width: 300,
                      color: "white",
                    }}
                  ></CircularProgress>
                </div>
              ) : schemaInfo ? (
                deployLoading ? (
                  <div className="h-full w-full flex flex-col items-center justify-center">
                    <CircularProgress
                      className=" text-white"
                      sx={{
                        width: 300,
                        color: "white",
                      }}
                    ></CircularProgress>
                    <Text padding={"10px"}>Schema Deploying...</Text>
                  </div>
                ) : (
                  <Box>
                    <Flex gap={"120px"}>
                      <Flex
                        onClick={() => HandlerDeploySchemaCode()}
                        flexWrap={"wrap"}
                        height={"350px"}
                        maxW={"350px"}
                        className=" border rounded-2xl flex justify-center items-center hover:scale-105 duration-500 cursor-pointer"
                      >
                        <Flex
                          padding={"30px"}
                          w={"200px"}
                          justifyContent={"center"}
                        >
                          <img src={imgMainnet}></img>
                          <p className="absolute border border-white rounded-lg py-0.5 px-2 mt-[50px] ml-[80px]">
                            Testnet
                          </p>
                        </Flex>
                        <Flex w={"100%"} justifyContent={"center"}>
                          <p className="text-white text-2xl hover:text-[#d2d3d7] duration-500 ">
                            Deploy to Testnet
                          </p>
                        </Flex>
                      </Flex>
                      <Flex
                        onClick={() => HandlerDeploySchemaCode()}
                        flexWrap={"wrap"}
                        height={"350px"}
                        maxW={"350px"}
                        className=" border rounded-2xl flex justify-center items-center hover:scale-105 duration-500 cursor-pointer"
                      >
                        <Flex
                          padding={"30px"}
                          w={"200px"}
                          justifyContent={"center"}
                        >
                          <img src={imgMainnet}></img>
                        </Flex>
                        <Flex w={"100%"} justifyContent={"center"}>
                          <p className="text-white text-2xl hover:text-[#d2d3d7] duration-500 ">
                            Deploy To Mainnet
                          </p>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Box>
                )
              ) : (
                <Flex>
                  <Text color="error" style={{ fontSize: "78px" }}>
                    NO SCHEMA INFO
                  </Text>
                </Flex>
              )}
            </div>
            <div className="h-[7%] items-center w-full flex justify-center gap-x-8">
              <div className="w-60">
                <Link to="/">
                  <NormalButton
                    TextTitle="Back To Home"
                    BorderRadius={0}
                    FontSize={24}
                  ></NormalButton>
                </Link>
              </div>
            </div>
          </div>
          <div className=" absolute left-0 bottom-2">
            <GobackButton
              BackPage={`/draft/actions/${schema_revision}`}
            ></GobackButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DraftDeployment;
