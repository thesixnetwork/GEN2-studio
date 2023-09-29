import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
interface MyComponentProps {
    name: string;
    job: string;
    emoji : string;
}
function CustomNode(props: MyComponentProps) {
  return (
    <div className="px-4 py-2 w-[40px] h-[40px] bg-gray-600 border-[3px] flex justify-center items-center shadow-md rounded-full bg-white  border-stone-400">
      
        <div>+</div>
      <Handle type="target" position={Position.Top} className="w-16 !bg-teal-500" />
      <Handle type="source" position={Position.Bottom} className="w-16 !bg-teal-500" />
    </div>
  );
}

export default memo(CustomNode);
