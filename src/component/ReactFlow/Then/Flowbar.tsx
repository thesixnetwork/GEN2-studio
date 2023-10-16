import Menu from "./Sidebar/Menu";

interface FlowbarProps {
  selectedAttribute: string | number | boolean;
}

export default function Flowbar({ selectedAttribute }: FlowbarProps) {
  return (
    <div className="w-[266px] h-[600px] bg-[#D9D9D980] rounded-2xl p-4 items-center flex flex-col justify-between">
      {selectedAttribute === "number" ||
      selectedAttribute === "float" ||
      selectedAttribute === "boolean" ||
      selectedAttribute === "string" ? (
        <>
          <div className="flex flex-col justify-center items-center gap-y-2">
            <h2>Available Function</h2>
            {selectedAttribute === "number" || selectedAttribute === "float" ? (
              <>
                <Menu nodeName="increaseNode" />
                <Menu nodeName="decreaseNode" />
                <Menu nodeName="setNode" />
              </>
            ) : selectedAttribute === "boolean" ? (
              <>
                <Menu nodeName="setNode" />
              </>
            ) : selectedAttribute === "string" ? (
              <Menu nodeName="setNode" />
            ) : null}
          </div>
          <div className="flex flex-col justify-center items-center gap-y-2 mb-20">
            <h2>Available Operand</h2>
            <div className="flex">
              <Menu nodeName="valueNode" />
              <Menu nodeName="attributeNode" />
              <Menu nodeName="paramNode" />
            </div>
          </div>
        </>
      ) : selectedAttribute === "none" ? <div className="flex flex-col justify-center items-center gap-y-2 mb-20">
      <h2>Available Operand</h2>
      <div className="flex">
        <Menu nodeName="valueNode" />
        <Menu nodeName="attributeNode" />
        <Menu nodeName="paramNode" />
      </div>
    </div> : (
        <div className="flex justify-center items-center h-full">
          <p>Please Select Your Attribute</p>
        </div>
      )}
    </div>
  );
}
