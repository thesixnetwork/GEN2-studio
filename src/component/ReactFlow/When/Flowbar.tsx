import Menu from "./Sidebar/Menu";

import SyntaxHighlighter from "react-syntax-highlighter";

interface MetaDataProps {
  metaData: string;
}

export default function Flowbar(metaData:MetaDataProps) {
  return (
    <div className="w-full h-28	  bg-[#D9D9D980] rounded-2xl flex justify-between p-4 items-center text-3xl">
      <div className="flex  w-72">
        <Menu nodeName="orNode" title="OR" />
        <Menu nodeName="andNode" title="AND" />
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
      <div className="w-72 items-end flex flex-col	">
        <div>
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
  );
}
