import React, { useCallback, useEffect, useRef } from 'react'
import Conectwalet from '../component/Connectwallet'
import Stepper2 from '../component/Stepper2';
import Darkbg from '../component/Alert/Darkbg';
import Box from '../component/Box';
import { useState, DragEvent } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    ReactFlowInstance,
    Connection,
    Edge,
    Node,
    useNodesState,
    useEdgesState,
    Controls,
    NodeOrigin,
    Background,
    BackgroundVariant,
    MiniMap,
    useStoreApi
} from 'reactflow';
import 'reactflow/dist/base.css';
import Flowbar from '../component/Flowbar';
import Customnode from '../component/node/Customnode';
const nodeTypes = {
    custom: Customnode,
};



const onDragOver = (event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
};

const initialNodes = [
    {
      id: '1',
      type: 'input',
      data: { label: 'input node' },
      position: { x: 250, y: 5 },
    },
  ];
  
let id = 0;
const getId = () => `dndnode_${id++}`;

const nodeOrigin: NodeOrigin = [0.5, 0.5];

const BasicFlow = () => {

    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
            const type = event.dataTransfer.getData('application/reactflow');

            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
                return;
            }

            const position = reactFlowInstance.project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            });
            const newNode = {
                id: getId(),
                type,
                position,
                data: { label: `${type} node` },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance]
    );

    return (
        <div className="dndflow" style={{width:200 , height:200}}>
            <ReactFlowProvider>
                <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        onInit={setReactFlowInstance}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        fitView
                    >
                        <Controls />
                        <MiniMap></MiniMap>
                    </ReactFlow>
                </div>
            </ReactFlowProvider>
        </div>
    );
};

export default function Newintregationb1() {
    const [isShow, setIsShow] = React.useState(false);
    return (
        <div className='w-full flex justify-center ' >
            <div className='w-full h-full fixed  flex justify-center items-center bg-gradient-24  from-white to-[#7A8ED7]'>
                <div className='w-[1280px] h-[832px] bg-gradient-24 to-gray-700 from-gray-300 rounded-2xl flex justify-between p-4 shadow-lg shadow-black/20 dark:shadow-black/40'>
                    <div className='w-full h-full px-[20px]'>
                        <div>
                            <Stepper2 ActiveStep={6}></Stepper2>
                            <div className='w-[931px] h-[1px] bg-[#D9D9D9]'></div>
                        </div>
                        <div className='mt-[20px]'>
                            <ReactFlowProvider>
                                <Flowbar></Flowbar>
                                <BasicFlow />
                                <button>PLUS</button>
                            </ReactFlowProvider >
                        </div>
                    </div>
                    <div className='w-2/6 h-5/6 flex flex-col items-end  '>
                        <Conectwalet></Conectwalet>
                        <Box Title='Action Name' DeTail='Name of action must be unique. And will call action by its name when we want to perform it'></Box>
                        <Box Title='Description' DeTail='To clarify what is the action mean'></Box>
                        <Box Title='Parameters' DeTail='Some action might require parameter to perform it'></Box>
                        <Box Title='Condition and Action' DeTail='Action can be perform while condition is met. When condition is unmet tx will be error'></Box>
                        <div onClick={() => { setIsShow(!isShow) }} className='absolute text-[50px] mt-[750px] ml-[1150px] cursor-pointer hover:scale-150 hover:text-[#262f50] duration-500'>?</div>
                    </div>
                </div>
                {isShow &&
                    <div className='absolute duration-500' onClick={() => { setIsShow(!isShow) }}>
                        <Darkbg ></Darkbg>
                    </div>
                }
            </div>
        </div>

    )
}