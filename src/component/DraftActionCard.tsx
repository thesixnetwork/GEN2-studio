const DraftActionCard = ({data}) =>{
    
    return(
        <div className="border border-white max-w-64 h-24 cursor-pointer hover:bg-opacity-20 hover:bg-white p-2">
            <div className="flex">
                <p className="text-md">Name:&nbsp;</p>
                <span className="text-md underline text-gray-300 decoration-gray-300">{data.name}</span>
            </div>
            <div className="flex">
                <p className="text-md">Description:&nbsp;</p>
                <span className="text-md underline text-gray-300 decoration-gray-300">{data.desc}t</span>
            </div>            
        </div>
    )
}

export default DraftActionCard;