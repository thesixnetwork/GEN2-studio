import { propNames } from "@chakra-ui/react";
import Menu from "./Sidebar/Menu";

import SyntaxHighlighter from "react-syntax-highlighter";

interface MetaDataProps {
  metaData: string;
  actionName: string;
}

export default function Flowbar(metaData: MetaDataProps) {
  return (
    <div className="w-full h-36	  bg-[#D9D9D980] rounded-2xl flex justify-between p-4 items-center text-3xl">
      <div className="flex flex-col gap-y-2">
        <span className="text-lg">ACTION NAME: {metaData.actionName}</span>
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
