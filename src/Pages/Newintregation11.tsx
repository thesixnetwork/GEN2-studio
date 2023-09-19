import { useState, DragEvent } from 'react';
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
} from 'reactflow';

import Flowbar from '../component/Flowbar';

const initialNodes: Node[] = [
    {
        id: '1',
        type: 'input',
        data: { label: 'input node' },
        position: { x: 250, y: 5 },
    },
];

const onDragOver = (event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
};

let id = 0;
const getId = () => `dndnode_${id++}`;

const nodeOrigin: NodeOrigin = [0, 0];

const BasicFlow = () => {
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance>();
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const onConnect = (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds));
    const onInit = (rfi: ReactFlowInstance) => setReactFlowInstance(rfi);

    const onDrop = (event: DragEvent) => {
        event.preventDefault();

        if (reactFlowInstance) {
            const type = event.dataTransfer.getData('application/reactflow');
            const Name = event.dataTransfer.getData('application/reactflow2');
            const position = reactFlowInstance.project({
                x: event.clientX,
                y: event.clientY,
            });
            const newNode: Node = {
                id: getId(),
                type,
                position,
                data: { label: `${Name}` },

            };
            console.log(position)
            setNodes((nds) => nds.concat(newNode));
        }
    };

    return (
        <div style={{ height: 600 }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onEdgesChange={onEdgesChange}
                onNodesChange={onNodesChange}
                onConnect={onConnect}
                onInit={onInit}
                onDrop={onDrop}
                onDragOver={onDragOver}
                nodeOrigin={nodeOrigin}
            >
                <Background id="2" gap={100} offset={1} color="#ccc" variant={BackgroundVariant.Lines} />
                <Background variant={BackgroundVariant.Dots} />
                <Controls />
                <MiniMap></MiniMap>
            </ReactFlow>
        </div>

    );
};

export default function App() {
    return (
        <div className='w-full flex justify-center'>
            <div className='w-full h-full fixed  flex justify-center items-center bg-gradient-24 from-white to-[#7A8ED7]'>
                <div className='w-[1280px] h-[832px] bg-gradient-24 to-gray-700 from-gray-300 rounded-2xl flex justify-center items-center p-4 shadow-lg shadow-black/20 dark:shadow-black/40' >
                    <div className=' w-full h-full '>
                        <ReactFlowProvider>
                            <Flowbar></Flowbar>
                            <BasicFlow />
                        </ReactFlowProvider >
                    </div>
                </div>

            </div>

        </div>

    );
}
