import { propNames } from "@chakra-ui/react";
import Menu from "./Sidebar/Menu";

import SyntaxHighlighter from "react-syntax-highlighter";
import OpenAI from "openai";
import { Button, Modal, Box, Typography } from "@mui/material";
import { useState } from "react";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { styled } from "@mui/material";
import Swal from "sweetalert2";

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

interface MetaDataProps {
  metaData: string;
  actionName: string;
  setMetaData: React.Dispatch<React.SetStateAction<string>>;
  setIsGenerateGPT: React.Dispatch<React.SetStateAction<boolean>>;
  handleDoubleClickAddNode: (type: string) => void;
}

export default function Flowbar(props: MetaDataProps) {
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
        prompt: `I want to transform from statement text into programming condition comparison. For example the statement is when points are more than 100 the result will be "meta.GetNumber('points') > 100.\nWhere meta.GetNumber means data type of 'point' is number. meta.GetString would be character (string) and meta.GetBoolean would be boolean. Here are some rules.\n- If the attribute data type is boolean , result will be meta.GetBoolean('attributeName') == true \n- more than one comparison join together. For example statement when points are more than 100 and already check in , the result will be meta.GetNumber('points') > 100 && meta.GetBoolean('checked_in') == true\n- These are the symbol which cannot be used '!' for example if not check in the output can't be !meta.GetBoolean('checked_in') the output must be meta.GetBoolean('checked_in') == false and the answer should be only meta function do not provide any guildline \n\nWhat if the statement is\n${inputValue}\n\n\n\nWhat would be the answer ===>`,
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
    console.log(">>", props.metaData);
  };

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="w-full h-36	  bg-[#D9D9D980] rounded-2xl flex justify-between p-4 items-center text-3xl">
      <div className="flex flex-col gap-y-2">
        <div className="flex items-center gap-x-1">
          <span className="text-lg">Action Name: {props.actionName}</span>
          <div>
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
                  <Button
                    color="error"
                    variant="outlined"
                    onClick={handleClose}
                  >
                    Discard
                  </Button>
                </div>
              </Box>
            </Modal>
          </div>
        </div>
        <div className="max-w-xl h-16 overflow-scroll">
          <SyntaxHighlighter
            language="go"
            wrapLongLines={true}
            codeTagProps={{
              style: {
                fontSize: "16px",
                lineHeight: "1",
              },
            }}
          >
            {props.metaData}
          </SyntaxHighlighter>
        </div>
      </div>
      <div className="flex w-90 ">
        <div className="flex flex-col gap-y-2 border-r-2 pr-4 border-gray-100">
          <Menu nodeName="orNode" title="OR" handleDoubleClickAddNode={props.handleDoubleClickAddNode}/>
          <Menu nodeName="andNode" title="AND" handleDoubleClickAddNode={props.handleDoubleClickAddNode}/>
        </div>
        <div className="items-end flex flex-col	pl-4">
          <div className="gap-y-2 flex flex-col">
            <div className="flex">
              <Menu nodeName="notEqualNode" title="!=" handleDoubleClickAddNode={props.handleDoubleClickAddNode}/>
              <Menu nodeName="equalNode" title="=" handleDoubleClickAddNode={props.handleDoubleClickAddNode}/>
              <Menu nodeName="moreThanNode" title=">" handleDoubleClickAddNode={props.handleDoubleClickAddNode}/>
              <Menu nodeName="moreThanAndEqualNode" title=">=" handleDoubleClickAddNode={props.handleDoubleClickAddNode}/>
              <Menu nodeName="lessThanNode" title="<" handleDoubleClickAddNode={props.handleDoubleClickAddNode}/>
              <Menu nodeName="lessThanAndEqualNode" title="<=" handleDoubleClickAddNode={props.handleDoubleClickAddNode}/>
            </div>
            <div className="flex">
              <Menu nodeName="valueNode" title="V" handleDoubleClickAddNode={props.handleDoubleClickAddNode}/>
              <Menu nodeName="attributeNode" title="@" handleDoubleClickAddNode={props.handleDoubleClickAddNode}/>
              <Menu nodeName="paramNode" title="P" handleDoubleClickAddNode={props.handleDoubleClickAddNode}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
