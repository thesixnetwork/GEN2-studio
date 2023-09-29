import React, { useEffect } from 'react'
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
const initialNodes: Node[] = [
    {
        id: '1',
        type: 'custom',
        data: { name: 'Jane Doe', job: 'CEO', emoji: '😎' },
        position: { x: 0, y: 0 },
        
        
    },
];


const onDragOver = (event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
};

let id = 0;
const getId = () => `dndnode_${id++}`;

const nodeOrigin: NodeOrigin = [0.5, 0.5];

const BasicFlow = () => {

    const store = useStoreApi();
    const {
        height,
        width,
        transform: [transformX, transformY, zoomLevel]
    } = store.getState();

    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance>();


    

    
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const onConnect = (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds));
    const onInit = (rfi: ReactFlowInstance) => setReactFlowInstance(rfi);

    const onDrop = (event: DragEvent) => {
        event.preventDefault();

        if (reactFlowInstance) {
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;
            const outerWidth = window.outerWidth;
            const outerHeight = window.outerHeight
            const type = event.dataTransfer.getData('application/reactflow');
            const Name = event.dataTransfer.getData('application/reactflow2');
            const position = reactFlowInstance.project({
                x: event.clientX-300,
                y: event.clientY-340,
            });
            const newNode: Node = {
                id: getId(),
                type,
                position,
                data: { label: `${Name}` },

            };
            console.log(position)

            console.log({ height, width, transformX, transformY, zoomLevel })
            console.log( "screenWidth :",screenWidth,"screenHeight:",)
            setNodes((nds) => nds.concat(newNode));
        }
    };

    useEffect(() => {
        console.log(transformX,transformY)
      }, [transformX]);
    

    return (
        <div style={{ height: 500, width: 931 }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onEdgesChange={onEdgesChange}
                onNodesChange={onNodesChange}
                onConnect={onConnect}
                onInit={onInit}
                onDrop={onDrop}
                onDragOver={onDragOver}
                nodeOrigin={nodeOrigin}
            >
                <Background id="2" gap={15} offset={1} color="#ccc" variant={BackgroundVariant.Lines} />
                <Background variant={BackgroundVariant.Dots} />
                <Controls />
                <MiniMap></MiniMap>
            </ReactFlow>
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