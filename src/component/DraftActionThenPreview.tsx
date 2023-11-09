const DraftActionThenPreview = (actions) => {
    console.log(">>>>",actions.actions)
    const convertStringIfTooLong = (str, length) => {
        if (str.length > length) {
          return str.substring(0, length) + "...";
        } else {
          return str;
        }
      };
  return (
    <div className="w-80 h-36 border-2 border-white justify-center flex flex-col p-4">
      <p>Action Name: {actions.actions[0].name}  </p>
      <p>Description: {convertStringIfTooLong(actions.actions[0].desc,34)} </p>
      <p>When: {actions.actions[0].when} </p>
    </div>
  );
};

export default DraftActionThenPreview;
