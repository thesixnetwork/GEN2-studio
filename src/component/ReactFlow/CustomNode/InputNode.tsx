import { useCallback, useEffect, useState } from 'react';
import { Handle, Position } from 'reactflow';
import addNode from './Add more object.png'
import DynamicNode from './DynamicNode';


function inputNode  ({ data }) {


  // useEffect(()=>{
  //   const test = async() =>{
  //     await new Promise((resolve) => setTimeout(resolve, 5000))
  //     setLabel('')
  //   }
  //   test()
  // })

  return (
    <div>
      {data.showType === "orNode" ? (
        <DynamicNode description='OR' />
      ) : data.showType === "andNode" ? (
        <DynamicNode description='AND' />
      ) : data.showType === "equalNode" ? (
        <DynamicNode description='=' />
      ) : data.showType === "notEqualNode" ? (
        <DynamicNode description='!=' />
      ) : data.showType === "moreThanNode" ? (
        <DynamicNode description='>' />
      ) : data.showType === "moreThanAndEqualNode" ? (
        <DynamicNode description='>=' />
      ) : data.showType === "lessThanNode" ? (
        <DynamicNode description='<' />
      ) : data.showType === "lessThanAndEqualNode" ? (
        <DynamicNode description='<=' />
      ) : data.showType === "valueNode" ? (
        <DynamicNode description='V' data={data}/>
      ) : data.showType === "attributeNode" ? (
        <DynamicNode description='@' data={data}/>
      ) : data.showType === "paramNode" ? (
        <DynamicNode description='P' data={data}/>
      ) :(
        <DynamicNode description='+'/>
      )}
       {/* <div  
                className="w-full p-2 rounded-full flex items-center justify-center border-2">
                <Handle type="target" position={Position.Top} />
                <div 
                >
                    V:&nbsp;
                    <input type="text" name="" id="" className='w-16 rounded-full' onChange={onChange} />
                    <p>{data.value}</p>
                    <button onClick={()=>console.log(data)}>test</button>
                    <button onClick={()=>data.countNum(data.num, console.log("counted"))}>test</button>
                </div>
                <Handle type="source" position={Position.Bottom} id="a" />
            </div> */}
    </div>  
  );
  
}

export default inputNode;