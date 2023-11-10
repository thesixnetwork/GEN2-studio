import { propNames } from "@chakra-ui/react";
import Menu from "./Sidebar/Menu";

import SyntaxHighlighter from "react-syntax-highlighter";
import OpenAI from "openai";
import { Button, Modal, Box, Typography } from "@mui/material";
import { useState } from "react";

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
}

export default function Flowbar(metaData: MetaDataProps) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [outputFromGPT, setOutputFromGPT] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const processGPT = async () => {
    const openai = new OpenAI({
      apiKey: import.meta.env.VITE_APP_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
    });

    try {
      const response = await openai.completions.create({
        model: "gpt-3.5-turbo-instruct-0914",
        prompt:
          `I want to transform from statement text into programming condition comparison. For example the statement is \"when points are more than 100\" the result will be \"meta.GetNumber('points') > 100\".\nWhere meta.GetNumber means data type of 'point' is number. meta.GetString would be character (string) and meta.GetBoolean would be boolean. Here are some rules.\n- If the attribute data type is boolean , there's no need to put \"meta.GetBoolean('attributeName') == true\" , result can be just \"meta.GetBoolean('attributeName')\n- more than one comparison join together. For example statement \"when points are more than 100 and already check in , the result will be meta.GetNumber('points') > 100 && meta.GetBoolean('checked_in')\n\nWhat if the statement is "${inputValue}" What would be the answer ===>`,
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      console.log(response);

      setOutputFromGPT(response.choices[0].text)
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreate = () => {
    setOpen(false)
    metaData.metaData = outputFromGPT
  }

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };
  return (
    <div className="w-full h-36	  bg-[#D9D9D980] rounded-2xl flex justify-between p-4 items-center text-3xl">
      <div className="flex flex-col gap-y-2">
        <span className="text-lg">ACTION NAME: {metaData.actionName}</span>
        <div className="w-6 h-6 flex items-center justify-center rounded-full border">
          <button className="text-xs" onClick={handleOpen}>AI</button>
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
                Text in a modal
              </Typography>
              <input
                id="1"
                type="text"
                autoFocus
                className={`text-black bg-transparent text-md border-[1px] border-transparent focus:border-[#D9D9D9DD] placeholder-gray-300 border-dashed p-1 focus:outline-none focus:scale-105 duration-1000 w-[350px] h-[${20}px]`}
                placeholder={""}
                onChange={(e) => {
                  handleInput(e);
                }}
              />
              <button onClick={processGPT} className="text-black">processGPT</button>
              <button className="text-black" onClick={()=>console.log(outputFromGPT)}>output</button>
              <p className="text-black">output: {outputFromGPT}</p>
              <button className="text-black" onClick={handleCreate}>Create</button>
            </Box>
          </Modal>
        </div>
        <div className="max-w-xl h-16 overflow-scroll	">
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
            {metaData.metaData}
          </SyntaxHighlighter>
        </div>
          <button onClick={()=>console.log(metaData)}>log herer</button>
      </div>
      <div className="flex w-90 ">
        <div className="flex flex-col gap-y-2 border-r-2 pr-4 border-gray-100">
          <Menu nodeName="orNode" title="OR" />
          <Menu nodeName="andNode" title="AND" />
        </div>
        <div className="items-end flex flex-col	pl-4">
          <div className="gap-y-2 flex flex-col">
            <div className="flex">
              <Menu nodeName="valueNode" title="V" />
              <Menu nodeName="attributeNode" title="@" />
              <Menu nodeName="paramNode" title="P" />
            </div>
            <div className="flex">
              <Menu nodeName="notEqualNode" title="!=" />
              <Menu nodeName="equalNode" title="=" />
              <Menu nodeName="moreThanNode" title=">" />
              <Menu nodeName="moreThanAndEqualNode" title=">=" />
              <Menu nodeName="lessThanNode" title="<" />
              <Menu nodeName="lessThanAndEqualNode" title="<=" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
