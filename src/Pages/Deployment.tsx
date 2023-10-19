
import imgTestnet from '../pic/Group 448.png'
import imgMainnet from '../pic/Chain/SIX Protocol Icon.png'
import Conectwalet from '../component/Connectwallet'
import axios from 'axios'
import { Buffer } from 'buffer';
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

import { getAccessTokenFromLocalStorage } from '../helpers/AuthService'
import React, { useEffect, useState, } from "react";
import { useParams } from 'react-router-dom';
import { EncodeObject, OfflineSigner, Registry } from "@cosmjs/proto-signing";

import { MsgCreateNFTSchema } from "../types/nftmngr/tx";
import { SigningStargateClient } from "@cosmjs/stargate";
import { GasPrice } from "@cosmjs/stargate/build/fee";


const Deploy = () => {
    const { ORG_NAME, SCHEMA_NAME } = useParams();
    const schema_code = `${ORG_NAME}.${SCHEMA_NAME}`

    const getOriginAttributFromContract = async () => {

        const apiUrl = `https://six-gen2-studio-nest-backend-api-traffic-gateway-1w6bfx2j.ts.gateway.dev/schema/list_draft`; // Replace with your API endpoint
        const params = {

        };

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAccessTokenFromLocalStorage()}`,
        }

        // Make a GET request with parameters
        await axios.get(apiUrl, {
            params: params, // Pass parameters as an object
            headers: headers, // Pass headers as an object
        })
            .then((response) => {
                console.log("Response :", response.data)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    useEffect(() => {
        getOriginAttributFromContract();
    }, [])



    //////////////////////
    const [schemaInfo, setSchemaInfo] = useState(null);
    const [isAccount, setIsAccount] = useState<OfflineSigner[]>();
    const [chainId, setChainId] = useState("fivenet");
    const [offlineSigner, setOfflineSigner] = useState();
    const [isFalse, setIsFalse] = useState(false);
    // const isAccount = useRef({});
    // console.log("isAccount", isAccount)
    // let isAccounts:Account

    const [rpcEndpoint, setRpcEndpoint] = useState(
        "https://rpc2.fivenet.sixprotocol.net:443"
    );


    const getAccount = async () => {
        const offlineSigner = await window.getOfflineSigner(chainId);
        const keplrAccounts = await offlineSigner.getAccounts();

        setOfflineSigner(offlineSigner)
        setIsAccount(keplrAccounts)
    }

    const get_schema_info = async () => {
        const schema_info = await axios.get(`https://six-gen2-studio-nest-backend-api-traffic-gateway-1w6bfx2j.ts.gateway.dev/schema/get_schema_info/${schema_code}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getAccessTokenFromLocalStorage()}`,
                }
            })
        if (schema_info.data.data.schema_info.schema_info) {
            setSchemaInfo(schema_info.data.data.schema_info.schema_info)
        }
        console.log("req,schema_info", schema_info)
    }


    const HandlerDeploySchemaCode = async () => {

        let msgArray: Array<EncodeObject> = [];

        let encodeBase64Schema = Buffer.from(JSON.stringify(schemaInfo)).toString(
            "base64"
        );
        console.log("schemaInfo", schemaInfo)

        if (isAccount && offlineSigner) {
            const msgCreateNFTSchema: MsgCreateNFTSchema = {
                creator: isAccount[0].address,
                nftSchemaBase64: encodeBase64Schema,
            };

            const msgCreateNFTSchemaEndcode: EncodeObject = ({
                typeUrl: "/thesixnetwork.sixnft.nftmngr.MsgCreateNFTSchema",
                value: MsgCreateNFTSchema.fromPartial(msgCreateNFTSchema)
            })
            // const msgCreateNFTSchemaEndcode = await TomsgCreateNFTSchema(msgCreateNFTSchema)
            const types = [
                ["/thesixnetwork.sixnft.nftmngr.MsgCreateNFTSchema", MsgCreateNFTSchema],
            ];

            // const registry = new Registry(types);
            const registry = new Registry();
            registry.register(
                "/thesixnetwork.sixnft.nftmngr.MsgCreateNFTSchema",
                MsgCreateNFTSchema
            );
            // const registry = new Registry().register(types);

            const rpcClient = await SigningStargateClient.connectWithSigner(rpcEndpoint, offlineSigner, {
                registry: registry,
                gasPrice: GasPrice.fromString("1.25usix"),
            });

            console.log("rpcClient",rpcClient)
            msgArray.push(msgCreateNFTSchemaEndcode);

            try {
                const txResponse = await rpcClient.signAndBroadcast(
                    isAccount[0].address,
                    msgArray,
                    "auto",
                    ``
                );
                console.log(txResponse);
            } catch (error) {
                console.error(error);
            }
        }
    }

    useEffect(() => {
        get_schema_info();
        getAccount()
    }, [isFalse]);
    //////////////////////


    return (

        <Box style={{
            width: '100%',            // w-full
            height: '100%',           // h-full
            position: 'fixed',        // fixed
            display: 'flex',          // flex
            justifyContent: 'center',  // justify-center
            alignItems: 'center',     // items-center
        }}
            className='bg-gradient-24  from-white to-[#7A8ED7]'
        >
            <Box p={6} width={"90%"} height={'80%'} className='bg-gradient-24 to-gray-700 from-gray-300 rounded-2xl shadow-lg shadow-black/20 dark:shadow-black/40'>
                <Box display={"flex"} flexWrap={"wrap"} justifyContent={'center'}>
                    <Box display={"flex"} p={20} width={"100%"} height={'100%'}>
                        <Box display={{ disply: "flex" }} width={'70%'}>
                            <Text style={{ fontSize: '48px' }}> Deployment </Text>
                            <Divider style={{ backgroundColor: '#D9D9D9', height: '2px' }} />
                        </Box>
                        <Box width={'30%'} display={'flex'} justifyContent={'center'}>
                            <Box>
                                <Conectwalet></Conectwalet>
                            </Box>
                        </Box>
                    </Box>
                    {!schemaInfo && (<Flex  pt={130}>
                        <Text color="error" style={{ fontSize: '78px' }}>NO SCHEMA INFO</Text>
                    </Flex>)}

                    {schemaInfo &&
                        <Box width={"100%"} height={'100%'} pt={60}>
                            <Flex justifyContent={'space-evenly'}>
                                <Flex onClick={() => HandlerDeploySchemaCode()} flexWrap={'wrap'} height={'350px'} maxW={'350px'} className=' border rounded-2xl flex justify-center items-center hover:scale-105 duration-500 cursor-pointer'>
                                    <Flex padding={'30px'} w={'100%'} justifyContent={'center'}>
                                        <img src={imgTestnet} ></img>
                                    </Flex>
                                    <Flex w={'100%'} justifyContent={'center'}>
                                        <p className='text-white text-2xl hover:text-[#d2d3d7] duration-500 '>Deploy to Testnet</p>
                                    </Flex>
                                </Flex >
                                <Flex onClick={() => HandlerDeploySchemaCode()} flexWrap={'wrap'} height={'350px'} maxW={'350px'} className=' border rounded-2xl flex justify-center items-center hover:scale-105 duration-500 cursor-pointer'>
                                    <Flex padding={'30px'} w={'100%'} justifyContent={'center'}>
                                        <img src={imgMainnet} ></img>
                                    </Flex>
                                    <Flex w={'100%'} justifyContent={'center'}>
                                        <p className='text-white text-2xl hover:text-[#d2d3d7] duration-500 '>Deploy To Mainnet</p>
                                    </Flex>
                                </Flex >
                            </Flex>
                        </Box>
                    }
                </Box>
            </Box>
        </Box>

    )
}

export default Deploy