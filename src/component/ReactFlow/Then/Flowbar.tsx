import Menu from "./Sidebar/Menu";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { styled } from "@mui/material";
import { Button, Modal, Box, Typography } from "@mui/material";
import { useState } from "react";
import OpenAI from "openai";
import Swal from "sweetalert2";

interface FlowbarProps {
  metaData: string;
  selectedAttribute: string | number | boolean;
  actionName: string;
  setMetaData: React.Dispatch<React.SetStateAction<string>>;
  setIsGenerateGPT: React.Dispatch<React.SetStateAction<boolean>>;
  handleDoubleClickAddNode: (type: string) => void;
  type: string;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Flowbar(props: FlowbarProps) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [outputFromGPT, setOutputFromGPT] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const Robot = styled(SmartToyIcon)({
    borderRadius: "16px",
    transition: "color 0.3s, border 0.3s",
    border: "1px solid white",
    cursor: "pointer",
  });

  const processGPT = async () => {
    let prompt;
    if (props.type === "attribute") {
      prompt = `I want to transform from statement text into programming condition comparison. For example the statement is then decrease points 50 the result will be meta.SetNumber('points', meta.GetNumber('points') + 50) Where meta.GetNumber means data type of 'point' is number. meta.GetString would be character (string) and meta.GetBoolean would be boolean. Here are some rules. There are only 3 actions is increase decrease and set if type are number there will have 3 actions but if type are string and boolean actions will be only set and the answer should be only meta function do not provide any guildline if the statement is\n\"${inputValue}\"\n\n\n\nWhat would be the answer ===>`;
    } else if (props.type === "transfer") {
      prompt = `I want to transform from statement text into programming condition comparison. For example the statement is then transfer points to tokenId amount 200 the result will be meta.TransferNumber('points', params['tokenId'].GetString(), 200)  and the another example is transfer points to tokenId amount points the result will be meta.TransferNumber('points', params['token_id'].GetString(), meta.GetNumber('points'))  if the statement is\n\"${inputValue}\"\n\n\n\nWhat would be the answer ===>`;
    }
    const openai = new OpenAI({
      apiKey: import.meta.env.VITE_APP_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
    });

    const removeLeadingTrailingSpace = (text) => {
      let startIndex = 0;
      while (startIndex < text.length && text[startIndex].trim() === "") {
        startIndex++;
      }

      let endIndex = text.length - 1;
      while (endIndex >= 0 && text[endIndex].trim() === "") {
        endIndex--;
      }

      return text.substring(startIndex, endIndex + 1);
    };

    try {
      const response = await openai.completions.create({
        model: "gpt-3.5-turbo-instruct-0914",
        prompt: prompt,
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      console.log(response);

      setOutputFromGPT(removeLeadingTrailingSpace(response.choices[0].text));
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreate = () => {
    setOpen(false);
    if (!outputFromGPT.startsWith("meta")) {
      Swal.fire({
        icon: "error",
        title: "Output must start with meta",
        showConfirmButton: false,
        timer: 3000,
      });
    } else {
      props.setMetaData(outputFromGPT);
      props.setIsGenerateGPT(true);
    }
  };

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="w-[266px] h-[600px] bg-[#D9D9D980] rounded-2xl p-4 items-center flex flex-col justify-between">
      <div className="flex flex-col items-center justify-between h-full">
        <div className="bg-[#bababa] w-52 h-24 flex flex-col items-center justify-center">
          <p>Action Name:</p>
          <p>{props.actionName}</p>
          <button
            className=" flex items-center justify-center rounded-full border text-xs hover:scale-125 duration-300"
            onClick={handleOpen}
          >
            <Robot />
          </button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                color={"black"}
              >
                Generate trees by input
              </Typography>
              <input
                id="1"
                type="text"
                autoFocus
                className={`text-black bg-transparent text-md border-[1px] focus:border-[#D9D9D9DD] placeholder-gray-300 border-dashed border-[#D9D9D9DD] p-1 focus:outline-none focus:scale-105 duration-1000 w-[100%] h-[${20}px]`}
                placeholder={""}
                onChange={(e) => {
                  handleInput(e);
                }}
              />
              <div className="w-full flex justify-center gap-x-4">
                <Button variant="outlined" onClick={processGPT}>
                  processGPT
                </Button>
                <Button
                  color="error"
                  variant="outlined"
                  onClick={() => console.log(outputFromGPT)}
                >
                  output
                </Button>
              </div>
              <div className="py-4">
                <Typography sx={{ color: "black" }}>
                  output: {outputFromGPT}
                </Typography>
              </div>
              <div className="w-full flex justify-center gap-x-4">
                <Button variant="outlined" onClick={handleCreate}>
                  Create
                </Button>
                <Button color="error" variant="outlined" onClick={handleClose}>
                  Discard
                </Button>
              </div>
            </Box>
          </Modal>
        </div>
        {props.selectedAttribute === "number" ||
        props.selectedAttribute === "float" ||
        props.selectedAttribute === "boolean" ||
        props.selectedAttribute === "string" ? (
          <>
            <div className="flex flex-col justify-center items-center gap-y-2">
              <h2>Available Function</h2>
              {props.selectedAttribute === "number" ||
              props.selectedAttribute === "float" ? (
                <>
                  <Menu
                    nodeName="increaseNode"
                    handleDoubleClickAddNode={props.handleDoubleClickAddNode}
                  />
                  <Menu
                    nodeName="decreaseNode"
                    handleDoubleClickAddNode={props.handleDoubleClickAddNode}
                  />
                  <Menu
                    nodeName="setNode"
                    handleDoubleClickAddNode={props.handleDoubleClickAddNode}
                  />
                </>
              ) : props.selectedAttribute === "boolean" ? (
                <>
                  <Menu
                    nodeName="setNode"
                    handleDoubleClickAddNode={props.handleDoubleClickAddNode}
                  />
                </>
              ) : props.selectedAttribute === "string" ? (
                <Menu
                  nodeName="setNode"
                  handleDoubleClickAddNode={props.handleDoubleClickAddNode}
                />
              ) : null}
            </div>
            <div className="flex flex-col justify-center items-center gap-y-2 mb-20">
              <h2>Available Operand</h2>
              <div className="flex">
                <Menu
                  nodeName="valueNode"
                  handleDoubleClickAddNode={props.handleDoubleClickAddNode}
                />
                <Menu
                  nodeName="attributeNode"
                  handleDoubleClickAddNode={props.handleDoubleClickAddNode}
                />
                <Menu
                  nodeName="paramNode"
                  handleDoubleClickAddNode={props.handleDoubleClickAddNode}
                />
              </div>
            </div>
          </>
        ) : props.selectedAttribute === "none" ? (
          <div className="flex h-full flex-col justify-end items-center gap-y-2 mb-20">
            <div className="flex flex-col items-center justify-center">
              <h2 className="pb-2">Available Operand</h2>
              <div className="flex">
                <Menu
                  nodeName="valueNode"
                  handleDoubleClickAddNode={props.handleDoubleClickAddNode}
                />
                <Menu
                  nodeName="attributeNode"
                  handleDoubleClickAddNode={props.handleDoubleClickAddNode}
                />
                <Menu
                  nodeName="paramNode"
                  handleDoubleClickAddNode={props.handleDoubleClickAddNode}
                />
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-center items-center h-full">
              <p>Please Select Your Attribute</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
