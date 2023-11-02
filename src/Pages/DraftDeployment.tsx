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

const DraftDeployment = () => {
  const { schema_revision } = useParams();
  const navigate = useNavigate();
  const getOriginAttributFromContract = async () => {
    const apiUrl = `https://six-gen2-studio-nest-backend-api-traffic-gateway-1w6bfx2j.ts.gateway.dev/schema/list_draft`; // Replace with your API endpoint
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
    "https://rpc2.fivenet.sixprotocol.net:443"
  );

  const getAccount = async () => {
    const offlineSigner = await window.getOfflineSigner(chainId);
    const keplrAccounts = await offlineSigner.getAccounts();

    setOfflineSigner(offlineSigner);
    setIsAccount(keplrAccounts);
  };

  const get_schema_info = async () => {
    const schema_info = await axios.get(
      `https://six-gen2-studio-nest-backend-api-traffic-gateway-1w6bfx2j.ts.gateway.dev/schema/get_schema_info/${schema_revision}`,
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
    const msgArray: Array<EncodeObject> = [];

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
        const apiUrl = 'https://six-gen2-studio-nest-backend-api-traffic-gateway-1w6bfx2j.ts.gateway.dev/schema/set_schema_info';
        const requestData = {
          "payload": {
            "schema_code": schema_revision,
            "status": "Testnet",
            "current_state": "7"
          }
        }
          ;

        await axios.post(apiUrl, requestData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAccessTokenFromLocalStorage()}`,  // Set the content type to JSON
            // Add any other headers your API requires
          },
        })
          .then(response => {
            console.log('API Response Deploy :', response.data);
            console.log(requestData)
            // You can handle the API response here
          })
          .catch(error => {
            console.error('API Error:', error);
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
    // <Box style={{
    //     width: '100%',            // w-full
    //     height: '100%',           // h-full
    //     position: 'fixed',        // fixed
    //     display: 'flex',          // flex
    //     justifyContent: 'center',  // justify-center
    //     alignItems: 'center',     // items-center
    // }}
    //     className='bg-gradient-24  from-white to-[#7A8ED7]'
    // >
    //     <Box p={6} width={"90%"} height={'80%'} className='bg-gradient-24 to-gray-700 from-gray-300 rounded-2xl shadow-lg shadow-black/20 dark:shadow-black/40'>
    //         <Box display={"flex"} flexWrap={"wrap"} justifyContent={'center'}>
    //             <Box display={"flex"} p={20} width={"100%"} height={'100%'}>
    //                 <Box display={{ disply: "flex" }} width={'70%'}>
    //                     <Text style={{ fontSize: '48px' }}> Deployment </Text>
    //                     <Divider style={{ backgroundColor: '#D9D9D9', height: '2px' }} />
    //                 </Box>
    //                 <Box width={'30%'} display={'flex'} justifyContent={'center'}>
    //                     <Box>
    //                         <Conectwalet></Conectwalet>
    //                     </Box>
    //                 </Box>
    //             </Box>
    //             {!schemaInfo && (<Flex  pt={130}>
    //                 <Text color="error" style={{ fontSize: '78px' }}>NO SCHEMA INFO</Text>
    //             </Flex>)}

    //             {schemaInfo &&
    //                 <Box width={"100%"} height={'100%'} pt={60}>
    //                     <Flex justifyContent={'space-evenly'}>
    //                         <Flex onClick={() => HandlerDeploySchemaCode()} flexWrap={'wrap'} height={'350px'} maxW={'350px'} className=' border rounded-2xl flex justify-center items-center hover:scale-105 duration-500 cursor-pointer'>
    //                             <Flex padding={'30px'} w={'100%'} justifyContent={'center'}>
    //                                 <img src={imgTestnet} ></img>
    //                             </Flex>
    //                             <Flex w={'100%'} justifyContent={'center'}>
    //                                 <p className='text-white text-2xl hover:text-[#d2d3d7] duration-500 '>Deploy to Testnet</p>
    //                             </Flex>
    //                         </Flex >
    //                         <Flex onClick={() => HandlerDeploySchemaCode()} flexWrap={'wrap'} height={'350px'} maxW={'350px'} className=' border rounded-2xl flex justify-center items-center hover:scale-105 duration-500 cursor-pointer'>
    //                             <Flex padding={'30px'} w={'100%'} justifyContent={'center'}>
    //                                 <img src={imgMainnet} ></img>
    //                             </Flex>
    //                             <Flex w={'100%'} justifyContent={'center'}>
    //                                 <p className='text-white text-2xl hover:text-[#d2d3d7] duration-500 '>Deploy To Mainnet</p>
    //                             </Flex>
    //                         </Flex >
    //                     </Flex>
    //                 </Box>
    //             }
    //         </Box>
    //     </Box>
    // </Box>
    <div className="w-full flex justify-center ">
      <div className="w-full h-full fixed  flex justify-center items-center bg-gradient-24  from-white to-[#7A8ED7]">
        <div className="w-[1280px] h-[832px] bg-gradient-24 to-gray-700 from-gray-300 rounded-2xl flex justify-between p-4 shadow-lg shadow-black/20 dark:shadow-black/40">
          <div className="w-full h-full">
            <div className="flex justify-between">
              <DraftMenu menu="deployment"></DraftMenu>
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
        </div>
      </div>
    </div>
  );
};

export default DraftDeployment;
