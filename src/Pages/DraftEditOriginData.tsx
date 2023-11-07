import React, { useEffect, useState } from 'react'
import DraftMenu from '../component/DraftMenu'
import { useParams } from 'react-router-dom';
import { getAccessTokenFromLocalStorage } from '../helpers/AuthService';
import axios from 'axios';
import DraftOrigindataCard from '../component/DraftOrigindataCard';
import NormalButton from '../component/NormalButton';
import GobackButton from '../component/GobackButton';

function DraftEditOriginData() {
    const { schema_revision } = useParams();
    const [Title, setTitle] = useState(["Collection Data", "Origin Data"]);
    const [loading, setLoading] = useState(true)
    const [Discard, setDiscard] = useState(false)
    const [Save, setSave] = useState(false)

    // const FindSchemaCode = async () => {
    //     const apiUrl = `https://six-gen2-studio-nest-backend-api-traffic-gateway-1w6bfx2j.ts.gateway.dev/schema/get_schema_info/${schema_revision}`;
    //     const params = {};
    //     const headers = {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${getAccessTokenFromLocalStorage()}`,
    //     };
    //     await axios
    //         .get(apiUrl, {
    //             params: params,
    //             headers: headers,
    //         })
    //         .then((response) => {
    //             console.log("SchemaInFo :", response.data.data.schema_info)
    //             setSchemaInFo(response.data.data.schema_info)
    //             setLoading(true)
    //         })
    //         .catch((error) => {
    //             console.error("Error:", error);
    //         });
    // };

    // useEffect(() => {
    //     FindSchemaCode();
    // }, [])



    return (
        <div className="w-full flex justify-center ">
            <div className="w-full h-full fixed  flex justify-center items-center bg-gradient-24  from-white to-[#7A8ED7]">
                <div className=" relative w-[1280px] h-[832px] bg-gradient-24 to-gray-700 from-gray-300 rounded-2xl flex justify-between p-4 shadow-lg shadow-black/20 dark:shadow-black/40">
                    <div className="w-full h-full ">
                        <div className="flex justify-between">
                            <DraftMenu menu="origin" schemaCode={schema_revision}></DraftMenu>
                        </div>
                        <div className='w-full flex flex-col justify-center items-center'>
                            {loading && (
                                <DraftOrigindataCard
                                    Title={Title}
                                    Discard={Discard}
                                    Save={Save}
                                ></DraftOrigindataCard>
                            )}
                        </div>
                        {loading && (
                            <div className="  h-[7%] mt-4 items-center w-full flex justify-center gap-x-8">
                                <div className="w-32" onClick={() => { setSave(!Save) }} >
                                    <NormalButton
                                        TextTitle="SAVE"
                                        BorderRadius={0}
                                        FontSize={24}
                                    ></NormalButton>
                                </div>
                                <div className="w-32" onClick={() => { setDiscard(!Discard) }} >
                                    <NormalButton
                                        TextTitle="DISCARD"
                                        BorderRadius={0}
                                        FontSize={24}
                                    ></NormalButton>
                                </div>

                            </div>

                        )}
                        <div className=' absolute left-0 bottom-2'>
                            <GobackButton BackPage='/'></GobackButton>
                        </div>
                    </div>

                </div>
            </div>
        </div >
    )
}
export default DraftEditOriginData


