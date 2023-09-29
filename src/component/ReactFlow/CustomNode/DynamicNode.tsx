import { useState } from 'react';
import { Handle, Position } from 'reactflow';

interface CircleNodeProps {
    description: string;
    data: object;
}

const DynamicNode = (props: CircleNodeProps) => {
    const [hovered, setHovered] = useState(false);

    const handleDragEnter = () => {
        setHovered(true);
    }
    
    const handleDragLeave = () => {
        setHovered(false);
    }
    
    const handleDrop = () => {
        setHovered(false);
    }

    const onChange = ((evt) => {
        // data.value.push(evt.target.value)
        props.data.value = evt.target.value
    });


    const handleSelect = (evt) => {
        const selectedOption = JSON.parse(evt.target.value);
        props.data.value = selectedOption.name
        props.data.dataType = selectedOption.dataType
    }


    return (
        props.description === "V" ? (
            <div  
                className={`w-full p-2 rounded-full flex items-center justify-center border-2
                ${props.description === "V" ? 'bg-[#E8EFFF]' 
                : props.description === "@" ? 'bg-[#D298DD]' 
                : props.description === "P" ? 'bg-[#FFCE74]'
                : 'bg-white'}
                ${hovered ? 'border-indigo-600 opacity-80' : 'border-gray-600'}`}
                onDragOver={handleDragEnter} 
                onDragLeave={handleDragLeave} 
                onDrop={handleDrop}
            >
                <Handle type="target" position={Position.Top} />
                <div className='flex items-center justify-center'>
                    <p className={`${hovered ? 'text-indigo-600' : 'text-gray-600'}`}> {props.description}:&nbsp; </p>
                    <input type="text" name="" id="" className='w-16 rounded-full' onChange={(e)=>{onChange(e,props.description)}} />
                </div>
                <Handle type="source" position={Position.Bottom} id="a" />
            </div>
        ) : props.description === "@" || props.description === "P" ?(
            <div  
                className={`w-full p-2 rounded-full flex items-center justify-center border-2
                ${ props.description === "@" ? 'bg-[#D298DD]' 
                : props.description === "P" ? 'bg-[#FFCE74]'
                : 'bg-white'}
                ${hovered ? 'border-indigo-600 opacity-80' : 'border-gray-600'}`}
                onDragOver={handleDragEnter} 
                onDragLeave={handleDragLeave} 
                onDrop={handleDrop}
            >
                <Handle type="target" position={Position.Top} />
                <div className = 'flex items-center justify-center'>
                    <p className={`${hovered ? 'text-indigo-600 ' : 'text-gray-600'}`}> {props.description}:&nbsp; </p>
                    <select id="" name="" form="" className='rounded-full' onChange={handleSelect}>
                        <option value={JSON.stringify({ name: "point", dataType: "number" })}>point</option>
                        <option value={JSON.stringify({ name: "check_in", dataType: "boolean" })}>check_in</option>
                        <option value={JSON.stringify({ name: "score", dataType: "number" })}>score</option>
                        <option value={JSON.stringify({ name: "tier", dataType: "string" })}>tier</option>
                        <option value={JSON.stringify({ name: "caption", dataType: "string" })}>caption</option>
                        <option  value={JSON.stringify({ name: "after_party_claim", dataType: "boolean" })}>after_party_claim</option>
                        <option  value={JSON.stringify({ name: "stage_count", dataType: "number" })}>stage_count</option>
                        <option  value={JSON.stringify({ name: "minor_count", dataType: "number" })}>minor_count</option>
                    </select>
                </div>
                <Handle type="source" position={Position.Bottom} id="a" />
            </div>
        ) : (
            <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2
                ${props.description === "OR" ? 'bg-[#ff6700]' 
                : props.description === "AND" ? 'bg-[#6865A5]' 
                : props.description === '=' ? 'bg-[#0041d0]'
                : props.description === '!=' ? 'bg-[#ff0072]'
                : props.description === '>' ? 'bg-[#00d7ca]'
                : props.description === '>=' ? 'bg-[#6ede87]'
                : props.description === '<' ? 'bg-[#9ca8b3]'
                : props.description === '<=' ? 'bg-[#FF99C3]'
                : props.description === '+' ? 'bg-[#ffc800]'
                : 'bg-white'}
                ${hovered ? 'border-indigo-600 opacity-80	' : 'border-gray-600'}`}
                
                onDragOver={handleDragEnter} 
                onDragLeave={handleDragLeave} 
                onDrop={handleDrop}
             >
                <Handle type="target" position={Position.Top} />
                <p
                    className={`${hovered ? 'text-indigo-600' : 'text-gray-600'}`}
                >
                    {props.description}
                </p>
                <Handle type="source" position={Position.Bottom} id="a" />
            </div>
        )
    )
}

export default DynamicNode;
