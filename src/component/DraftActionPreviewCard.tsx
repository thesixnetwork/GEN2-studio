import {
  // Button,
  Tooltip,
} from "@mui/material";
import editIcon from "../pic/draft-edit-rounded.png";
// import IconButton from "@mui/material/IconButton";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import { Link } from "react-router-dom";
// import { useParams } from "react-router-dom";
import { useState } from "react";
import saveIcon from "../pic/draft-save.png";
import { getAccessTokenFromLocalStorage } from "../helpers/AuthService";
import axios from "axios";
import { useEffect } from "react";
import Swal from "sweetalert2";
import {
  // Navigate,
  useNavigate,
} from "react-router-dom";
import addIcon from "../pic/draft-add.png";

import { IActions } from "../types/Nftmngr";

interface MyComponentProps {
  data: IActions;
  param: string;
}
const DraftActionPreviewCard = (props: MyComponentProps) => {
  const [isEditDesc, setIsEditDesc] = useState(false);
  const [, setActionData] = useState();
  // const [actionThenArr, setActionThenArr] = useState([]);
  // const [actionThenIndex, setActionThenIndex] = useState(null);
  const [descInput, setDescInput] = useState(props.data.desc);
  const navigate = useNavigate();

  const handleDescInput = (e) => {
    setDescInput(e.target.value);
    props.data.desc = e.target.value;
  };
  const convertToBase64 = (str) => {
    return btoa(str);
  };

  const convertStringIfTooLong = (str: string, length: number) => {
    if (str.length > length) {
      return str.substring(0, length) + "...";
    } else {
      return str;
    }
  };

  const findSchemaCode = async () => {
    // const apiUrl = `${
    //   import.meta.env.VITE_APP_API_ENDPOINT_SCHEMA_INFO
    // }schema/get_schema_info/${param.schema_revision}`;
    const apiUrl = `${
      import.meta.env.VITE_APP_API_ENDPOINT_SCHEMA_INFO
    }schema/get_schema_info/${props.param}`;
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
        setActionData(
          response.data.data.schema_info.schema_info.onchain_data.actions
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    findSchemaCode();
  }, []);

  const handleEditDesc = () => {
    setIsEditDesc(true);
  };

  const handleSaveDesc = () => {
    setIsEditDesc(false);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7A8ED7",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, edit it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await saveEditedDesc();
        Swal.fire("Saved!", "Your descripttion has been saved.", "success");
        navigate(`/draft/actions/${props.param}`);
      } else if (result.isDismissed) {
        setDescInput(props.data.desc);
      }
    });
  };

  const saveEditedDesc = async () => {
    const apiUrl = `${
      import.meta.env.VITE_APP_API_ENDPOINT_SCHEMA_INFO
    }schema/set_actions`;
    const requestData = {
      payload: {
        schema_code: props.param,
        name: props.data.name,
        desc: descInput,
      },
    };

    await axios
      .post(apiUrl, requestData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessTokenFromLocalStorage()}`,
        },
      })
      .then((response) => {
        console.log(
          "API Response saveOnchainCollectionAttributes :",
          response.data
        );
        console.log("Request :", requestData);
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  };

  return (
    <div className="border border-white w-full">
      {/* <div className="ml-[484px] absolute ">
        <IconButton
          onClick={handleOpen}
          size="small"
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <img src={editIcon} alt="edit" className="h-6 w-6"></img>
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleClose}>coding</MenuItem>
          <MenuItem onClick={handleClose}>low code</MenuItem>
        </Menu>
      </div> */}

      {console.log("props.data ==>", props.data)}

      <div className="p-3">
        <div className="flex">
          <p className="text-md">Name:&nbsp;</p>
          <span className="text-md underline">{props.data.name}</span>
        </div>
        <div>
          <p>Description:&nbsp;</p>
          <div className="flex items-center ml-8">
            {isEditDesc ? (
              <button onClick={handleSaveDesc}>
                <img
                  src={saveIcon}
                  alt="save"
                  className="w-4 h-4 mr-1 duration-300 hover:scale-125"
                />
              </button>
            ) : (
              <button onClick={handleEditDesc}>
                <img
                  src={editIcon}
                  alt="edit"
                  className="w-4 h-4 mr-1 duration-300 hover:scale-125"
                />
              </button>
            )}
            <Tooltip title={props.data.desc}>
              {isEditDesc ? (
                <input
                  type="text"
                  className="bg-transparent border-0 focus:outline-none w-full"
                  value={descInput}
                  onChange={handleDescInput}
                ></input>
              ) : (
                <span>
                  {props.data.desc !== undefined &&
                    convertStringIfTooLong(props.data.desc, 70)}
                </span>
              )}
            </Tooltip>
          </div>
        </div>
        <div className="flex">
          <p className="text-md">Parameters:&nbsp;</p>
          {/* <span className="text-md underline">{data.params}</span> */}
          {props.data.params ? (
            <div>
              {props.data.params.map((param, index: number) => (
                <div key={index}>
                  <span className="text-md underline">{param.name}</span>
                </div>
              ))}
            </div>
          ) : (
            <span>No parameters available</span>
          )}
        </div>
        <div>
          <p>When:&nbsp;</p>
          <div className="flex items-center ml-8">
            <Link
              to={
                props.data.when === ""
                  ? `/draft/actions/edit/when/${props.data.name}/create-new-when/${props.param}`
                  : `/draft/actions/edit/when/${props.data.name}/${props.data.when}/${props.param}`
              }
            >
              <button>
                <img
                  src={editIcon}
                  alt="edit"
                  className="w-4 h-4 mr-1 duration-300 hover:scale-125"
                />
              </button>
              <Tooltip title={props.data.when}>
                <span>{convertStringIfTooLong(props.data.when, 70)}</span>
              </Tooltip>
            </Link>
          </div>
        </div>
        <div>
          <p>Then:&nbsp;</p>
          <ul className="ml-8">
            {props.data.then.map((item, index: number) => (
              <li key={index} className="list-disc w-96 flex items-center">
                <div className="flex items-center">
                  <Link
                    to={
                      props.data.then[index].startsWith(
                        "meta.SetImage(meta.ReplaceAllString"
                      )
                        ? `/draft/actions/edit/then/transform/dynamic/${
                            props.data.name
                          }/${convertToBase64(props.data.then[index])}/${
                            props.param
                          }`
                        : props.data.then[index].startsWith("meta.SetImage")
                        ? `/draft/actions/edit/then/transform/static/${
                            props.data.name
                          }/${convertToBase64(props.data.then[index])}/${
                            props.param
                          }`
                        : props.data.then[index].startsWith(
                            "meta.TransferNumber"
                          )
                        ? `/draft/actions/edit/then/transfer/${props.data.name}/${props.data.then[index]}/${props.param}`
                        : props.data.then[index].startsWith("meta.SetString") ||
                          props.data.then[index].startsWith(
                            "meta.SetBoolean"
                          ) ||
                          props.data.then[index].startsWith("meta.SetNumber") ||
                          props.data.then[index].startsWith("meta.SetFloat")
                        ? `/draft/actions/edit/then/attribute/${props.data.name}/${props.data.then[index]}/${props.param}`
                        : `/draft/actions/edit/then/${props.data.name}/${props.data.then[index]}/${props.param}`
                    }
                  >
                    <div className="w-4 h-4 mr-1">
                      <img
                        src={editIcon}
                        alt="edit"
                        className="w-4 h-4 duration-300 hover:scale-125"
                      />
                    </div>
                  </Link>
                  <Tooltip title={item}>
                    <span className="whitespace-nowrap">
                      {convertStringIfTooLong(item, 60)}
                    </span>
                  </Tooltip>
                </div>
              </li>
            ))}
          </ul>
          <div
            className="ml-14 mt-2 hover:scale-125 duration-300 w-4 h-4 cursor-pointer"
            onClick={() => {
              // saveActionName(props.actionName);
              navigate(
                `/draft/actions/edit/then/${props.data.name}/create-new-action/${props.param}`
              );
            }}
          >
            <img src={addIcon}></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DraftActionPreviewCard;
