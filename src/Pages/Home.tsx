import React, { useEffect, useState } from "react";
import logo1 from "../pic/Keplr_Icon 1.png";
import logo2 from "../pic/Copy.png";
import logo3 from "../pic/Share.png";
import logo4 from "../pic/SIX_Token_Icon 1.png";
import logo5 from "../pic/X.png";
import logo6 from "../pic/NFTBrowsItemFrame.png";
import logo7 from "../pic/Buakaw_Collection 1.png";
import logo8 from "../pic/Ethereum-icon-purple 1.png";
import logo9 from "../pic/SCR-25660710-nkmd 1.png";
import logo10 from "../pic/klaytn-klay-logo 1.png";
import logoNoImgage from "../pic/logo-nftgen2-01.png";
import Conectwalet from "../component/Connectwallet";
import { Link, useNavigate } from "react-router-dom";
import WhiteBox from "../component/WhiteBox";
import axios from "axios";
import { getAccessTokenFromLocalStorage } from "../helpers/AuthService";
import HomeDraftCard from "../component/HomeDraftCard";
import { Skeleton } from "@mui/material";

import { ISchemaInfo } from "../types/Nftmngr";
import {
    Button,
    Box,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    SimpleGrid,
    Heading,
    Flex,
    Text,
    Divider,
} from "@chakra-ui/react";

const Home = () => {
    const [listDraft, setlistDraft] = React.useState([]);
    const [Data, setData] = React.useState([]);
    const [listTestnet, setListTestnet] = React.useState<ISchemaInfo[]>([]);
    const [countCollection, setCountCollection] = React.useState<string[]>([]);
    console.log("countCollection", countCollection)
    const [loading, setLoading] = useState(true);
    const [loadingTestnet, setLoadingTestnet] = useState(false);
    const getOriginAttributFromContract = async () => {
        const apiUrl = `https://six-gen2-studio-nest-backend-api-traffic-gateway-1w6bfx2j.ts.gateway.dev/schema/list_draft`;
        const params = {};

        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessTokenFromLocalStorage()}`,
        };

        try {
            const response = await axios.get(apiUrl, {
                params: params,
                headers: headers,
            });
            setlistDraft(response.data.data.sesstion);
            setData(response.data.data);
            console.log("Response:", response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error:", error);
            setLoading(false);
        }
    };

    const getDataTestnet = async () => {
        const apiUrl = `https://six-gen2-studio-nest-backend-api-traffic-gateway-1w6bfx2j.ts.gateway.dev/schema/list_testnet`;
        const params = {};

        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessTokenFromLocalStorage()}`,
        };

        try {
            const response = await axios.get(apiUrl, {
                params: params,
                headers: headers,
            });

            if (response.data.data.result) {
                console.log("------------------------")
                const arr_schema_name: string[] = [];
                const countColl: string[] = [];
                await response.data.data.result.forEach((res: ISchemaInfo) => {
                    if (res.schema_name) {
                        arr_schema_name.push(res.schema_name);
                    }
                });

                await arr_schema_name.forEach(async (schema_name: string) => {
                    try {
                        const apiUrl = `https://api1.fivenet.sixprotocol.net/thesixnetwork/sixnft/nftmngr/nft_collection/${schema_name}`;
                        const params = {};
                        const headers = {
                            "Content-Type": "application/json",
                        };

                        const resColl = await axios.get(apiUrl, {
                            params: params,
                            headers: headers,
                        });
                        countColl.push(resColl.data.pagination.total)
                    } catch (error) {
                        console.error("Error:", error);
                    }
                });
                setCountCollection(countColl)

            }
            setListTestnet(response.data.data.result);
            // console.log("Response testnet:", response.data.data.result);
            setLoadingTestnet(true);
        } catch (error) {
            console.error("Error:", error);
            setLoading(false);
        }
    };

    const mockItems = [
        { id: 1, text: "Item 1", imageSrc: logo7, schema_code: "Buakaw1", countColl: "2000" },
        { id: 2, text: "Item 2", imageSrc: logo9, schema_code: "Whale Gate Collection", countColl: "600" },
    ];

    useEffect(() => {
        getOriginAttributFromContract();
    }, []);

    useEffect(() => {
        getDataTestnet();
    }, []);

    useEffect(() => {
        console.log("Listdraft:", listDraft);
        console.log("Data :", Data);
    }, [listDraft, Data]);
    const navigate = useNavigate();
    const getImg = async (imgPath) => {
        let imgUrl;
        try {
            const response = await axios.get(imgPath);
            console.log("Response:", response.data.image);
            imgUrl = response.data.image;
        } catch (error) {
            console.error("Error:", error);
        }
        return imgUrl;
    };

    return (
        <div className="w-full flex justify-center ">
            <div className="w-full h-full fixed  flex justify-center items-center bg-gradient-24  from-white to-[#7A8ED7] overflow-scroll">
                <Box className="w-[1280px] h-[832px] bg-gradient-24 to-gray-700 from-gray-300 rounded-2xl flex p-4  shadow-lg shadow-black/20 dark:shadow-black/40" >
                    <Box className="h-full w-4/6 flex flex-col pl-[50px] pt-[50px] relative " >
                        <Flex wrap={"wrap"} height={"832px"} overflow={"auto"} >
                            <p className="text-[#FFFFFF] text-3xl mb-1">Draft</p>
                            <div className="w-[891px] h-[1px] bg-[#D9D9D9]"></div>
                            <div className="flex mt-2 items-center  w-[1100px] h-[400px] overflow-scroll ">
                                <div
                                    onClick={() => { if (listDraft.length !== 0) { navigate("newintregation/5") } else { navigate("newintregation/1") } }}
                                >
                                    <HomeDraftCard
                                        CollectionName={"New Intregation"}
                                        CollectionImage={"NewIntregation"}
                                    ></HomeDraftCard>
                                </div>
                                {loading ? (
                                    <>
                                        <div className="h-[232px] pl-[20px] flex flex-col justify-between">
                                            <Skeleton variant="rounded" width={197} height={200} />
                                            <Skeleton variant="rounded" width={197} height={20} />
                                        </div>
                                        <div className="h-[232px] pl-[20px] flex flex-col justify-between">
                                            <Skeleton variant="rounded" width={197} height={200} />
                                            <Skeleton variant="rounded" width={197} height={20} />
                                        </div>
                                        <div className="h-[232px] pl-[20px] flex flex-col justify-between">
                                            <Skeleton variant="rounded" width={197} height={200} />
                                            <Skeleton variant="rounded" width={197} height={20} />
                                        </div>
                                        <div className="h-[232px] pl-[20px] flex flex-col justify-between">
                                            <Skeleton variant="rounded" width={197} height={200} />
                                            <Skeleton variant="rounded" width={197} height={20} />
                                        </div>
                                        <div className="h-[232px] pl-[20px] flex flex-col justify-between">
                                            <Skeleton variant="rounded" width={197} height={200} />
                                            <Skeleton variant="rounded" width={197} height={20} />
                                        </div>
                                    </>
                                ) : (
                                    listDraft &&
                                    listDraft.map((item, index) => (
                                        <div
                                            onClick={() => { navigate(`/draft/origindata/${item.schema_revision}`) }}
                                        >
                                            {/* <HomeDraftCard CollectionName={item.schema_name} CollectionImage={getImg(item.schema_info[0].schema_info.origin_data.origin_base_uri)}></HomeDraftCard> */}
                                            {/* <button onClick={()=>{console.log(item)}}>btn</button> */}
                                            <HomeDraftCard
                                                CollectionName={item.schema_revision}
                                                CollectionImage={
                                                    item.schema_info &&
                                                    item.schema_info[0] &&
                                                    item.schema_info[0].schema_info.origin_data.origin_base_uri
                                                }
                                            ></HomeDraftCard>
                                        </div>
                                    ))
                                )}
                            </div>
                            {/* <p className="text-[#FFFFFF] text-3xl mt-[30px] mb-1 ">Live</p>
                            <div className="w-[891px] h-[1px] bg-[#D9D9D9]"></div>
                            <div className="mt-[30px] flex ">
                                <div className="flex flex-col justify-center items-center cursor-pointer">
                                    <div className=" flex  items-end hover:scale-105 duration-500 shadow-lg shadow-black/20 dark:shadow-black/40">
                                        <img
                                            src={logo7}
                                            className="w-[197px] h-[232px] border-[#D9D9D9] border-[0.5px] rounded-2xl  "
                                        ></img>
                                        <div className="w-[197px] h-[69px] bg-[#D9D9D9]/[0.8] rounded-b-2xl  flex flex-row justify-center items-center">
                                            <img src={logo8} className="mr-2"></img>
                                            <p className="text-[#100072] text-[20px]  ">2000 Items</p>
                                        </div>
                                    </div>
                                    <p className="text-white text-2xl font-bold mt-3 hover:text-[#7A8ED7] duration-500 ">
                                        Buakaw1
                                    </p>
                                </div>

                                <div className="flex flex-col justify-center items-center ml-5 cursor-pointer">
                                    <div className=" flex  items-end hover:scale-105 duration-500 shadow-lg shadow-black/20 dark:shadow-black/40">
                                        <img
                                            src={logo9}
                                            className="w-[197px] h-[232px] border-[#D9D9D9] border-[0.5px] rounded-2xl  "
                                        ></img>
                                        <div className="w-[197px] h-[69px] bg-[#D9D9D9]/[0.8] rounded-b-2xl absolute flex flex-row justify-center items-center">
                                            <img src={logo10} className="mr-2"></img>
                                            <p className="text-[#100072] text-[20px]  ">600 Items</p>
                                        </div>
                                    </div>
                                    <p className="text-white text-2xl font-bold mt-3  hover:text-[#7A8ED7] duration-500 ">
                                        Whale Gate Collection
                                    </p>
                                </div>
                            </div> */}

                            {/* <p className="text-[#FFFFFF] text-3xl mt-[30px] mb-1 ">Live</p> */}
                            {/* <div className="w-[891px] h-[1px] bg-[#D9D9D9]"></div> */}
                            {console.log(listDraft)}

                            <Flex wrap={"wrap"} paddingBottom={"50px"}>
                                <Box>
                                    <p className="text-[#FFFFFF] text-3xl mt-[30px] mb-1 ">Live</p>
                                    <div className="w-[782px] h-[1px] bg-[#D9D9D9]"></div>
                                </Box>
                                <Box overflow={"auto"} pt={60}>
                                    <Flex className="w-[782px] h-[323px] overflow-scroll " pt={30}>
                                        {mockItems.map((item) => (
                                            <Flex direction={"column"} alignItems={"center"}>
                                                <Flex
                                                    position="relative"
                                                    key={item.id}
                                                    px={20}
                                                    width={"auto"}
                                                    height={"232px"}
                                                    maxHeight={"300px"}
                                                    _hover={{ transform: "scale(1.2)", transition: "transform 0.3s" }}
                                                >
                                                    <Box width={"197px"}>
                                                        <img
                                                            src={item.imageSrc}
                                                            alt={`Image ${item.id}`}
                                                        />
                                                    </Box>
                                                    <Box
                                                        position="absolute"
                                                        top="0"
                                                        left="0"
                                                        right="0"
                                                        bottom="0"
                                                        display="flex"
                                                        alignItems="flex-end"
                                                        justifyContent="center"
                                                        zIndex="1"
                                                    >
                                                        <div className="w-[197px] h-[69px] bg-[#D9D9D9]/[0.8] rounded-b-2xl absolute flex flex-row justify-center items-center">
                                                            <img src={logo8} className="mr-2" alt="Logo" />
                                                            <p className="text-[#100072] text-[20px]">{item.countColl} Items</p>
                                                        </div>
                                                    </Box>
                                                </Flex>
                                                <Text pt={20}>{item.schema_code}</Text>
                                            </Flex>
                                        ))}
                                    </Flex>
                                </Box>
                            </Flex>

                            <Flex wrap={"wrap"} paddingBottom={"50px"}>
                                <Box width={"100%"}>
                                    <p className="text-[#FFFFFF] text-3xl mt-[30px] mb-1 ">Testnet</p>
                                    <div className="w-[782px] h-[1px] bg-[#D9D9D9]"></div>
                                </Box>

                                {loadingTestnet && listTestnet &&
                                    <Box overflow={"auto"} pt={60} >
                                        <Flex className="w-[732px] h-[332px] overflow-scroll " pt={30}>
                                            {listTestnet.map((item, index) => (
                                                <Flex direction={"column"} alignItems={"center"}>

                                                    <Flex
                                                        position="relative"
                                                        key={index}
                                                        px={20}
                                                        width={"auto"}
                                                        height={"232px"}
                                                        maxHeight={"300px"}
                                                        _hover={{ transform: "scale(1.2)", transition: "transform 0.3s" }}
                                                    >
                                                        <Box width={"197px"} height={"232px"} maxHeight={"500px"} className="border-[#D9D9D9] border-[0.5px] rounded-2xl">
                                                            <img
                                                                src={item.image ? item.item : logoNoImgage}
                                                                // style={{
                                                                //     height: "232px", // Set the height
                                                                //     width: "397px", // Set the width
                                                                // }}
                                                                // className="border-[#D9D9D9] border-[0.5px] rounded-2xl"
                                                                alt={`Image ${index}`}
                                                            />
                                                        </Box>
                                                        <Box
                                                            position="absolute"
                                                            top="0"
                                                            left="0"
                                                            right="0"
                                                            bottom="0"
                                                            display="flex"
                                                            alignItems="flex-end"
                                                            justifyContent="center"
                                                            zIndex="1"
                                                        >
                                                            <div className="w-[197px] h-[69px] bg-[#D9D9D9]/[0.8] rounded-b-2xl absolute flex flex-row justify-center items-center">
                                                                <img src={logo8} className="mr-2" alt="Logo" />
                                                                <p className="text-[#100072] text-[20px]">{countCollection[index] ? countCollection[index] : "0"} Items</p>
                                                            </div>
                                                        </Box>
                                                    </Flex>
                                                    <Text pt={18} className="text-white text-2xl font-bold mt-3  hover:text-[#7A8ED7] duration-500 ">{item.schema_name}</Text>
                                                </Flex>
                                            ))}
                                        </Flex>
                                    </Box>
                                }
                                {!loadingTestnet &&
                                    <Box overflow={"auto"} pt={60} >
                                        <Flex className="w-[782px] h-[300px] overflow-scroll " pt={30}>
                                            {!loadingTestnet && Array.from({ length: 12 }).map((_, index) => (
                                                <Box key={index} className="h-[232px] pl-[20px]">
                                                    <Skeleton variant="rounded" width={197} height={200} />
                                                </Box>
                                            ))}
                                        </Flex>
                                    </Box>
                                }
                            </Flex>
                        </Flex>

                    </Box>
                    <div className="w-2/6 h-full flex flex-col items-end  ">
                        <Conectwalet></Conectwalet>
                        <div className=" mt-[70%]">
                            <WhiteBox
                                Title={"Choose your collection"}
                                DeTail={
                                    "Create new integration, modify existing draft or manage collection which already in production."
                                }
                                Height={174}
                                Width={266}
                                TitleSize={20}
                                DetailSize={15}
                            ></WhiteBox>
                        </div>
                    </div>
                </Box>
            </div>
        </div>
    );
};

export default Home;
