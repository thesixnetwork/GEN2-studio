import { DragEvent } from "react";

const onDragStart = (event: DragEvent, nodeType: string) => {
  event.dataTransfer.setData("application/reactflow", nodeType);
  event.dataTransfer.effectAllowed = "move";
  console.log(event);
};

interface MenuProps {
  nodeName: string;
  title: string;
  backgroundColor?: string;
}

const Menu = (prop: MenuProps) => {
  return (
    <div className="flex flex-col items-center w-12 transform translate-x-0 translate-y-0">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center border-2"
        onDragStart={(event: DragEvent) => onDragStart(event, prop.nodeName)}
        draggable
      >
        <p className="text-base">{prop.title}</p>
      </div>
      <p className="text-xs">
        {prop.title === "V" ? "Value" : prop.title === "P" ? "Param" : prop.title === "@" ? "Attribute" : null}
      </p>
    </div>
    
  );
};

export default Menu;
