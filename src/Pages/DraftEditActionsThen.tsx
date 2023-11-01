import ActionTypeCard from "../component/ActionTypeCard";

const DraftEditActionsThen = () => {
    return (
        <div className="w-full flex justify-center ">
      <div className="w-full h-full fixed  flex justify-center items-center bg-gradient-24  from-white to-[#7A8ED7]">
        <div className="w-[1280px] h-[832px] bg-gradient-24 to-gray-700 from-gray-300 rounded-2xl flex justify-between p-4 shadow-lg shadow-black/20 dark:shadow-black/40">
        <div className=" w-full flex flex-col items-center justify-center gap-20 min-h-[89.1%]">
              <div className="flex gap-x-20">
                <ActionTypeCard type="update" draft={true} />
                <ActionTypeCard type="transfer" draft={true} />
              </div>
              <div>
                <ActionTypeCard type="transform" draft={true} />
              </div>
            </div>
        </div>
      </div>
    </div>
    )
}

export default DraftEditActionsThen;