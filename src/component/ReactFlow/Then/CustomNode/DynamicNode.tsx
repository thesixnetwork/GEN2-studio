import { useState } from "react";
import { Handle, Position, useStoreApi } from "reactflow";
import { useReactFlow } from "reactflow";

interface CircleNodeProps {
  data: {
    id: string;
    showType: string;
    value: string;
    dataType: string;
  };
}

interface EventProps {
  target: {
    value: string;
  };
}

const DynamicNode = (props: CircleNodeProps) => {
  const { setNodes } = useReactFlow();
  const store = useStoreApi();

  const [hovered, setHovered] = useState(false);

  const handleDragEnter = () => {
    setHovered(true);
  };

  const handleDragLeave = () => {
    setHovered(false);
  };

  const handleDrop = () => {
    setHovered(false);
  };

  const onChange = (e: EventProps) => {
    const { nodeInternals } = store.getState();
    setNodes(
      Array.from(nodeInternals.values()).map((node) => {
        if (node.id === props.data.id) {
          node.data.value = e.target.value;
        }
        return node;
      })
    );
  };

  const handleSelect = (e: EventProps) => {
    const selectedOption = JSON.parse(e.target.value);
    // props.data.value = selectedOption.name
    // props.data.dataType = selectedOption.dataType
    const { nodeInternals } = store.getState();
    setNodes(
      Array.from(nodeInternals.values()).map((node) => {
        if (node.id === props.data.id) {
          props.data.value = selectedOption.name;
          props.data.dataType = selectedOption.dataType;
        }
        return node;
      })
    );
  };

  return props.data.showType === "selectAttributeNode" ? (
    <div
      className={`w-full py-2 px-6 rounded-full flex items-center justify-center border-2 bg-[#ff0072]
                ${
                  hovered ? "border-indigo-600 opacity-80 " : "border-gray-600"
                }`}
      onDragOver={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Handle type="target" position={Position.Top} />
      <div className="flex flex-col items-center justify-center">
        <p
          className={`text-white ${
            hovered ? "text-indigo-600 " : "text-gray-600"
          }`}
        >
          Select Your Attribute
        </p>
        <select
          id=""
          name=""
          form=""
          className="rounded-full text-black"
          onChange={handleSelect}
        >
          <option value="" disabled selected hidden>
            -- select here --
          </option>
          <option value={JSON.stringify({ name: "point", dataType: "number" })}>
            point
          </option>
          <option
            value={JSON.stringify({ name: "check_in", dataType: "boolean" })}
          >
            check_in
          </option>
          <option value={JSON.stringify({ name: "score", dataType: "number" })}>
            score
          </option>
          <option value={JSON.stringify({ name: "tier", dataType: "string" })}>
            tier
          </option>
          <option
            value={JSON.stringify({ name: "caption", dataType: "string" })}
          >
            caption
          </option>
          <option
            value={JSON.stringify({
              name: "after_party_claim",
              dataType: "boolean",
            })}
          >
            after_party_claim
          </option>
          <option
            value={JSON.stringify({ name: "stage_count", dataType: "number" })}
          >
            stage_count
          </option>
          <option
            value={JSON.stringify({ name: "minor_count", dataType: "number" })}
          >
            minor_count
          </option>
        </select>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  ) : props.data.showType === "increaseNode" ||
    props.data.showType === "decreaseNode" ||
    props.data.showType === "setNode" ||
    props.data.showType === "toNode" ||
    props.data.showType === "amountNode" ? (
    <div
      className={`w-32 h-12 flex justify-center items-center border-2 ${
        props.data.showType === "increaseNode"
          ? "bg-[#ff6700]"
          : props.data.showType === "decreaseNode"
          ? "bg-[#6865A5]"
          : props.data.showType === "setNode"
          ? "bg-[#ffc800]"
          : props.data.showType === "toNode"
          ? "bg-[#5E5F9C]"
          : props.data.showType === "amountNode"
          ? "bg-[#B33640]"
          : "bg-white"
      } `}
    >
      <Handle type="target" position={Position.Top} />

      <div>
        {props.data.showType === "increaseNode"
          ? "INCREASE"
          : props.data.showType === "decreaseNode"
          ? "DECREASE"
          : props.data.showType === "setNode"
          ? "SET"
          : props.data.showType === "toNode"
          ? "TO"
          : props.data.showType === "amountNode"
          ? "AMOUNT"
          : null}
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  ) : props.data.showType === "changeValueNode" ? (
    <div className="p-2 border-2 bg-[#0041d0]">
      <Handle type="target" position={Position.Top} />

      <div>Change Value Node</div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  ) : props.data.showType === "trueNode" ||
    props.data.showType === "falseNode" ? (
    <div
      className={`p-2 border-2  ${
        props.data.showType === "trueNode"
          ? "bg-[#ff0072]"
          : props.data.showType === "falseNode"
          ? "bg-[#00d7ca]"
          : "bg-white"
      } `}
    >
      <Handle type="target" position={Position.Top} />

      <div>
        {props.data.showType === "trueNode"
          ? "TRUE"
          : props.data.showType === "falseNode"
          ? "FALSE"
          : null}
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  ) : props.data.showType === "valueNode" ? (
    <div
      className={`w-full p-2 rounded-full flex items-center justify-center border-2 text-black 
        ${props.data.showType === "valueNode" ? "bg-[#6ede87]" : "bg-white"}
        ${hovered ? "border-indigo-600 opacity-80" : "border-gray-600"}`}
      onDragOver={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Handle type="target" position={Position.Top} />
      <div className="flex items-center justify-center">
        <p className={`${hovered ? "text-indigo-600" : "text-gray-600"}`}>
          V: &nbsp;
        </p>
        <input
          type="text"
          name=""
          id=""
          className="w-16 rounded-full"
          onChange={(e) => {
            onChange(e);
          }}
        />
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  ) : props.data.showType === "attributeNode" ? (
    <div
      className={`w-full p-2 rounded-full flex items-center justify-center border-2 border-black	
        ${
          props.data.showType === "attributeNode"
            ? "bg-[#9ca8b3]"
            : "bg-white"
        }
        ${hovered ? "border-indigo-600 opacity-80" : "border-gray-600"}`}
      onDragOver={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Handle type="target" position={Position.Top} />
      <div className="flex items-center justify-center">
        <p className={`${hovered ? "text-indigo-600 " : "text-gray-600"}`}>
        @: &nbsp;{" "}
        </p>
        <select
          id=""
          name=""
          form=""
          className="rounded-full text-black"
          onChange={handleSelect}
        >
          <option value="" disabled selected hidden>
            -- select here --
          </option>
          <option value={JSON.stringify({ name: "point", dataType: "number" })}>
            point
          </option>
          <option
            value={JSON.stringify({ name: "check_in", dataType: "boolean" })}
          >
            check_in
          </option>
          <option value={JSON.stringify({ name: "score", dataType: "number" })}>
            score
          </option>
          <option value={JSON.stringify({ name: "tier", dataType: "string" })}>
            tier
          </option>
          <option
            value={JSON.stringify({ name: "caption", dataType: "string" })}
          >
            caption
          </option>
          <option
            value={JSON.stringify({
              name: "after_party_claim",
              dataType: "boolean",
            })}
          >
            after_party_claim
          </option>
          <option
            value={JSON.stringify({ name: "stage_count", dataType: "number" })}
          >
            stage_count
          </option>
          <option
            value={JSON.stringify({ name: "minor_count", dataType: "number" })}
          >
            minor_count
          </option>
        </select>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  ) : props.data.showType === "paramNode" ? (
  <div
    className={`w-full p-2 rounded-full flex items-center justify-center border-2 border-black	
      ${
          props.data.showType === "paramNode"
          ? "bg-[#FF99C3]"
          : "bg-white"
      }
      ${hovered ? "border-indigo-600 opacity-80" : "border-gray-600"}`}
    onDragOver={handleDragEnter}
    onDragLeave={handleDragLeave}
    onDrop={handleDrop}
  >
    <Handle type="target" position={Position.Top} />
    <div className="flex items-center justify-center">
      <p className={`${hovered ? "text-indigo-600 " : "text-gray-600"}`}>
        {" "}
        {props.data.showType === "paramNode"
          ? "P"
          : props.data.showType === "attributeNode"
          ? "@"
          : null}
        :&nbsp;{" "}
      </p>
      <input
          type="text"
          name=""
          id=""
          className="w-16 rounded-full text-black"
          onChange={(e) => {
            onChange(e);
          }}
        />
    </div>
    <Handle type="source" position={Position.Bottom} id="a" />
  </div>
) : (
    <div
      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 bg-[#ffc800]
                ${
                  hovered ? "border-indigo-600 opacity-80	" : "border-gray-600"
                }`}
      onDragOver={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Handle type="target" position={Position.Top} />
      <p className={`${hovered ? "text-indigo-600" : "text-gray-600"}`}>+</p>
      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
};

export default DynamicNode;
