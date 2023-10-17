import { DragEvent } from "react";

const onDragStart = (event: DragEvent, nodeType: string) => {
  event.dataTransfer.setData("application/reactflow", nodeType);
  event.dataTransfer.effectAllowed = "move";
};

interface MenuProps {
  nodeName: string;
  backgroundColor?: string;
}

const Menu = (prop: MenuProps) => {

  return (
    <>
      {prop.nodeName === "increaseNode" ||
      prop.nodeName === "decreaseNode" ||
      prop.nodeName === "trueNode" ||
      prop.nodeName === "falseNode" ||
      prop.nodeName === "setNode" ? (
        <div
          className="h-14 w-48 flex items-center justify-center border-2 transform translate-x-0 translate-y-0"
          onDragStart={(event: DragEvent) => onDragStart(event, prop.nodeName)}
          draggable
        >
          <p className="text-base">
            {prop.nodeName === "increaseNode"
              ? "INCREASE"
              : prop.nodeName === "decreaseNode"
              ? "DECREASE"
              : prop.nodeName === "trueNode"
              ? "TRUE"
              : prop.nodeName === "falseNode"
              ? "FALSE"
              : prop.nodeName === "setNode"
              ? "SET"
              : null}
          </p>
        </div>
      ) : prop.nodeName === "valueNode" ||
        prop.nodeName === "paramNode" ||
        prop.nodeName === "attributeNode" ? (
        <div className="flex flex-col items-center w-12">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center border-2 transform translate-x-0 translate-y-0"
            onDragStart={(event: DragEvent) =>
              onDragStart(event, prop.nodeName)
            }
            draggable
          >
            <p className="text-base">
              {prop.nodeName === "valueNode"
                ? "V"
                : prop.nodeName === "paramNode"
                ? "P"
                : prop.nodeName === "attributeNode"
                ? "@"
                : null}
            </p>
          </div>
          <p className="text-xs">
            {prop.nodeName === "valueNode"
              ? "Value"
              : prop.nodeName === "paramNode"
              ? "Param"
              : prop.nodeName === "attributeNode"
              ? "Attribute"
              : null}
          </p>
        </div>
      ) : null}
    </>
  );
};

export default Menu;
