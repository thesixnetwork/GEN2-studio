const DraftActionCard = () =>{
    return(
        <div className="border border-white w-64 h-24">
            <div className="flex">
                <p className="text-md">Name:&nbsp;</p>
                <span className="text-md underline">check_in</span>
            </div>
            <div className="flex">
                <p>Description:&nbsp;</p>
                <span>Check in aat event</span>
            </div>            
        </div>
    )
}

export default DraftActionCard;