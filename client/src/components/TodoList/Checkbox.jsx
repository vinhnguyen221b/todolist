import React, { useState } from "react";
import { toast } from "react-toastify";
import todoService from "../../service/todoService";

function Checkbox({ id, done, setStatus }) {
  const [check, setCheck] = useState(done);
  const handleCheck = async () => {
    try {
      const { data } = await todoService.checkDone(id);
      if (data) {
        toast("🎉 Yeah Done");
      } else {
        toast("🥺 Why?");
      }
      setCheck(data);
      setStatus(!check);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <input
        type="checkbox"
        id="checkbox"
        className="css-checkbox"
        checked={check}
        onChange={handleCheck}
      />
    </>
  );
}

export default Checkbox;
