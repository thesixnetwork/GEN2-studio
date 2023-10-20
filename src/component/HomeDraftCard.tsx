import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
interface MyComponentProps {
  CollectionName: string;
  CollectionImage: string;
}
import { CircularProgress } from "@mui/material";
import { set } from "lodash";

export default function HomeDraftCard(props: MyComponentProps) {
  const [imgUrl, setImgUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getImage = async () => {
        try{
            await axios.get(props.CollectionImage).then((res) => {
              console.log("res", res);
              setImgUrl(res.data.image);
              setLoading(false);
            });
        }catch(err){
            console.log(err)
            setLoading(false);
        }
    };
    getImage()
  }, []);

  return (
    <div className="w-[197px] h-[232px]  flex flex-col justify-center items-center ml-5 cursor-pointer">
      <div className=" w-[197px] h-[232px]   flex  items-end hover:scale-105 duration-500 border-2 border-white rounded-xl overflow-hidden">
        {loading ? (
          <CircularProgress
            className=" text-white"
            sx={{
              width: 300,
              color: "white",
            }}
          ></CircularProgress>
        ) : props.CollectionImage === "NewIntregation" ? (
          <div className="h-full w-full flex justify-center items-center rounded-2xl">
            New Intregation
          </div>
        ) : props.CollectionImage === "" ? (
          <div className="h-full w-full flex justify-center items-center rounded-2xl">
            NO IMAGE
          </div>
        ) : (
          <img src={imgUrl} className="h-full w-full "></img>
        )}
        {/* {props.CollectionImage === "NewIntregation" ? (
          <div className="h-full w-full flex justify-center items-center rounded-2xl">
            New Intregation
          </div>
        ) : props.CollectionImage === "" ? (
          <div className="h-full w-full flex justify-center items-center rounded-2xl">
            NO IMAGE
          </div>
        ) : (
          <img src={imgUrl} className="h-full w-full "></img>
        )} */}
      </div>
      <p className="text-white text-sm font-bold mt-3  hover:text-[#7A8ED7] duration-500 ">
        {props.CollectionName}
      </p>
    </div>
  );
}
