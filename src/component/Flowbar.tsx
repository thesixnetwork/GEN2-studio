import { DragEvent } from 'react';

const onDragStart = (event: DragEvent, nodeType: string,NameShow :string) => {
  event.dataTransfer.setData('application/reactflow', nodeType);
  event.dataTransfer.setData('application/reactflow2', NameShow);
  event.dataTransfer.effectAllowed = 'move';
};


export default function Flowbar() {
  return (
    <div className='w-full bg-transparent flex justify-between text-3xl'>
    <div className='flex '>
      <div className="react-flow__node-input" onDragStart={(event: DragEvent) => onDragStart(event, 'input',"OR")} draggable>
        OR
      </div>
      <div className="react-flow__node-input" onDragStart={(event: DragEvent) => onDragStart(event, 'input',"AND")} draggable>
        AND
      </div>
    </div>

    <div className=' grid-cols-4 grid'>
      <div className="react-flow__node-output text-3xl" onDragStart={(event: DragEvent) => onDragStart(event, 'output',"V")} draggable>
        V
      </div>
      <div className="react-flow__node-output" onDragStart={(event: DragEvent) => onDragStart(event, 'output',"@")} draggable>
        @
      </div>
      <div className="react-flow__node-output" onDragStart={(event: DragEvent) => onDragStart(event, 'output',"P")} draggable>
        P
      </div>
      <div className="react-flow__node-output" onDragStart={(event: DragEvent) => onDragStart(event, 'output',"=")} draggable>
        =
      </div>
      <div className="react-flow__node-output" onDragStart={(event: DragEvent) => onDragStart(event, 'output',"")} draggable>
        !=
      </div>
      <div className="react-flow__node-output" onDragStart={(event: DragEvent) => onDragStart(event, 'output',"")} draggable>
        !=
      </div>
      <div className="react-flow__node-output" onDragStart={(event: DragEvent) => onDragStart(event, 'output',"")} draggable>
        !=
      </div>
      <div className="react-flow__node-output" onDragStart={(event: DragEvent) => onDragStart(event, 'output',"")} draggable>
        !=
      </div>
    </div>
  
  </div>
  )
}