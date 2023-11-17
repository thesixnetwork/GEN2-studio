import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { CircularProgress, styled } from "@mui/material";
import { set } from "lodash";
import ClearIcon from "@mui/icons-material/Clear";
import { getAccessTokenFromLocalStorage } from "../helpers/AuthService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
interface MyComponentProps {
  CollectionName: string;
  CollectionImage: string;
  schema_revision: string;
}

export default function HomeDraftCard(props: MyComponentProps) {
  const navigate = useNavigate();
  const [imgUrl, setImgUrl] = useState("");
  const [loading, setLoading] = useState(true);

  const Delete = styled(ClearIcon)({
    borderRadius: "16px",
    transition: "color 0.3s, border 0.3s",
    border: "2px solid white",
    cursor: "pointer",
  });

  useEffect(() => {
    const getImage = async () => {
      try {
        await axios.get(props.CollectionImage).then((res) => {

          setImgUrl(res.data.image);
          setLoading(false);
        });
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    getImage();
  }, []);

  const DeleteAttribute = () => {
    const apiUrl = `${import.meta.env.VITE_APP_API_ENDPOINT_SCHEMA_INFO}schema/delete_daft/${props.schema_revision}`;

    axios.delete(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAccessTokenFromLocalStorage()}`,  // Set the content type to JSON
        // Add any other headers your API requires
      },
    })
      .then(response => {
        console.log('API Response:', response.data);
        // You can handle the API response here
      })
      .catch(error => {
        console.error('API Error:', error);
        // Handle errors here
      });
  }

  const handleDeleteAttribute = () => {
    Swal.fire({
      title: 'Are you sure to delete draft ?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7A8ED7',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete '
    }).then(async (result) => {
      if (result.isConfirmed) {
        await DeleteAttribute();
        Swal.fire(
          'Delete Complete!',
          'Your Draft has been Deleted.',
          'success'
        ).then(() => {
          handleRefresh()
        })
      }
    })
  }

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="w-[197px] h-[232px]  flex flex-col justify-center items-center mx-3 cursor-pointer">
      <div className=" relative w-[197px] h-[232px]   flex  items-end hover:scale-105 duration-500 border-2 border-white rounded-xl overflow-hidden cursor-pointer">
        {props.CollectionImage !== "NewIntregation" &&
          <Delete
            className=" absolute top-0 right-0 m-2 hover:scale-125   z-20"
            onClick={handleDeleteAttribute}
          />
        }
        {loading ? (
          <div className="w-full h-full flex justify-center items-center" onClick={() => {
            navigate(`/draft/origindata/${props.schema_revision}`);
          }}>
            <CircularProgress
              className=" text-white"
              sx={{
                width: 300,
                color: "white",
              }}
            ></CircularProgress>
          </div>
        ) : props.CollectionImage === "NewIntregation" ? (
          <div className="h-full w-full flex justify-center items-center rounded-2xl">
            New Intregation
          </div>
        ) : props.CollectionImage === "" ? (
          <div className="h-full w-full flex justify-center items-center rounded-2xl" onClick={() => {
            navigate(`/draft/origindata/${props.schema_revision}`);
          }}>
            NO IMAGE
          </div>
        ) : (
          <img onClick={() => {
            navigate(`/draft/origindata/${props.schema_revision}`);
          }} src={imgUrl} className="h-full w-full "></img>
        )}
      </div>
      <p onClick={() => {navigate(`/draft/origindata/${props.schema_revision}`)}}  className="text-white text-sm font-bold mt-3  hover:text-[#afbae1] duration-500 ">
        {props.CollectionName}
      </p>
    </div>
  );
}
