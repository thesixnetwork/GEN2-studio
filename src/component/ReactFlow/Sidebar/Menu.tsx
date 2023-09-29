import { DragEvent, useState } from "react";

const onDragStart = (event: DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
    console.log(event)
  };

interface MenuProps {
    nodeName: string;
    title: string
    backgroundColor?: string
}

const Menu = (prop: MenuProps) =>{
    return(

    <div
        className="w-10 h-10 rounded-full flex items-center justify-center border-2"
        onDragStart={(event: DragEvent) => onDragStart(event, prop.nodeName)}
        draggable
    >
        <p className="text-base">
            {prop.title}    
        </p>
  </div>
      )
}

export default Menu 