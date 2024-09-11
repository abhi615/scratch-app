import React from "react";
import { FaArrowRotateRight, FaArrowRotateLeft } from "react-icons/fa6";
import DraggableItem from "./DraggableItem";

const Sidebar = () => {
  return (
    <div>
      <h2 className="font-bold text-black">Motion</h2>

      {/* Move Steps */}
      <DraggableItem id="move-steps">
        <span className="text-white mr-2">move</span>
        <span className=" bg-white w-8 h-6 rounded-full border-gray-200 border text-center text-black">
          10
        </span>
        <span className="ml-2">steps</span>
      </DraggableItem>

      <DraggableItem id="turn-right">
        <span className="text-white mr-1">turn</span>
        <FaArrowRotateRight className="text-xl text-white" />
        <span className="bg-white w-8 h-6 rounded-full border-gray-200 border text-center text-black">
          15
        </span>
        <span className="ml-2">degrees</span>
      </DraggableItem>

      <DraggableItem id="turn-left">
        <span className="text-white mr-1">turn</span>
        <FaArrowRotateLeft className="text-xl text-white" />
        <span className="bg-white w-8 h-6 rounded-full border-gray-200 border text-center text-black">
          15
        </span>
        <span className="ml-2">degrees</span>
      </DraggableItem>

      {/* Go to X and Y */}
      <DraggableItem id="go-to">
        <span className="text-white mr-2">go to :</span>
        x:
        <span className="bg-white w-8 h-6 rounded-full border-gray-200 border text-center text-black">
          50
        </span>
        <span className="ml-2">y:</span>
        <span className="bg-white w-8 h-6 rounded-full border-gray-200 border text-center text-black">
          50
        </span>
      </DraggableItem>
      <DraggableItem id="repeat">
        <span className="text-white mr-2">repeat</span>
      </DraggableItem>
    </div>
  );
};

export default Sidebar;
