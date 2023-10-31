import React from 'react'

interface ComponentProps {
    Title: string
    Value :string
    isInputDisabledOriginChain : boolean
}

function DraftOrigindataInput(Props: ComponentProps) {
    return (
        <div className=' flex  justify-start items-end'>
            <p className="font-bold text-xl mr-2">{Props.Title} : </p>
            <input
                value={Props.Value}
                type="text"
                disabled={Props.isInputDisabledOriginChain}
                onChange={(e) => {
                    handleChangeValue(e, "schemacode");
                }}
                className={`bg-transparent text-[14px] border-[1px] ${isInputDisabledOriginChain ? 'border-none' : 'border-[#D9D9D9DD]'} placeholder-gray-300 border-dashed p-1 focus:outline-none focus:scale-105 duration-500 w-[140px]`}
            ></input>
        </div>
    )
}

export default DraftOrigindataInput