import React, { Fragment, useState } from "react";
import ProgressTimer from "./ProgressTimer";

const TodoModal = ({ setOpen, todo, isOpen }) => {
  const [isStarted, setStarted] = useState(false);

  const startTimer = () => {
    setStarted(true);
  };

  return (
    <Fragment>
      <div
        onClick={() => setOpen(false)}
        className="w-screen h-screen fixed z-[999] top-0 left-0 bg-[#020202de] flex justify-center items-center"
      >
        <div className={`${isOpen ? "active": ''} transition-all h-[600px] w-[600px] modal-bg bg-slate-800 rounded-md px-[100px] py-[50px]`}>
          <ProgressTimer />
          <span className="text-lg text-slate-500 text-center py-4 block">
            {todo.name}
          </span>
          <div className="flex justify-between">
            <span
              className="px-8 py-2 rounded-md cursor-pointer  hover:opacity-80 transition-all ring-2 ring-green-500 bg-green-200 font-semibold text-green-500"
              onClick={startTimer}
            >
              {isStarted ? "Paused" : "Start"}
            </span>
            <span className="px-8 py-2 rounded-md cursor-pointer hover:opacity-80 transition-all ring-2 ring-red-600 bg-red-200 font-semibold text-red-500">
              Stop
            </span>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default TodoModal;
