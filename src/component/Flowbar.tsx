import { DragEvent } from 'react';
import Conectwalet from './Connectwallet';
import Node1 from './Node1';
import Node2 from './Node2';

const onDragStart = (event: DragEvent, nodeType: string, NameShow: string) => {
  event.dataTransfer.setData('application/reactflow', nodeType);
  event.dataTransfer.setData('application/reactflow2', NameShow);
  event.dataTransfer.effectAllowed = 'move';
};


export default function Flowbar() {
  return (
    <div className='w-full h-[124px]  bg-[#D9D9D980] rounded-2xl flex justify-between px-[50px] items-center text-3xl'>
      <div className='flex justify-center items-center '>
      <div className=' grid-cols-5 grid'>
        <div onDragStart={(event: DragEvent) => onDragStart(event, 'output', "V")} draggable>
          <Node2 TextTitle='V'></Node2>
        </div>
        <div onDragStart={(event: DragEvent) => onDragStart(event, 'output', "@")} draggable>
          <Node2 TextTitle='@'></Node2>
        </div>
        <div onDragStart={(event: DragEvent) => onDragStart(event, 'output', "P")} draggable>
          <Node2 TextTitle='P'></Node2>
        </div>
        <div onDragStart={(event: DragEvent) => onDragStart(event, 'output', "=")} draggable>
          <Node2 TextTitle='='></Node2>
        </div>
        <div onDragStart={(event: DragEvent) => onDragStart(event, 'output', "")} draggable>
            <Node2 TextTitle='!='></Node2>
        </div>
        <div onDragStart={(event: DragEvent) => onDragStart(event, 'output', "")} draggable>
            <Node2 TextTitle='<'></Node2>
        </div>
        <div onDragStart={(event: DragEvent) => onDragStart(event, 'output', "")} draggable>
            <Node2 TextTitle='<='></Node2>
        </div>
        <div onDragStart={(event: DragEvent) => onDragStart(event, 'output', "")} draggable>
            <Node2 TextTitle='>='></Node2>
        </div>
        <div onDragStart={(event: DragEvent) => onDragStart(event, 'output', "")} draggable>
            <Node2 TextTitle='>'></Node2>
        </div>
      </div>
        
        <div  onDragStart={(event: DragEvent) => onDragStart(event, 'input', "OR")} draggable>
          <Node1  TextTitle='OR'></Node1>
        </div>
        <div  onDragStart={(event: DragEvent) => onDragStart(event, 'input', "OR")} draggable>
          <Node1  TextTitle='AND'></Node1>
        </div>
       
      </div>


    </div>
  )
}