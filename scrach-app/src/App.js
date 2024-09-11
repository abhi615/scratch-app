import React, { useState, useCallback } from "react";
import Header from "./Components/Header";
import Sidebar from "./Components/SideBar";
import EditorArea from "./Components/EditorArea";
import Previewarea from "./Components/PreviewArea";
import Spirites from "./Components/Sprites";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import defaultImage from "../src/assets/images/cat-sprite.svg";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCharcter, setSelectedCharcter] = useState([defaultImage]);
  const [spriteRotation, setSpriteRotation] = useState(0);
  const [spriteIndex, setSpriteIndex] = useState(0);
  const [coords, setCoords] = useState({ xPos: 0, yPos: 0 });

  const onDragUpdate = useCallback((event, dragData) => {
    setCoords({ xPos: dragData.x, yPos: dragData.y });
  }, []);

  const playRotation = useCallback(
    (direction, inputValue, stepSize = 10) => {
      setSpriteRotation((prevRotation) => {
        const adjustmentDirection = direction === "left" ? -1 : 1;
        return prevRotation + adjustmentDirection * inputValue * stepSize;
      });

      setSpriteIndex((prevIndex) => {
        if (selectedCharcter.length === 0) return prevIndex;
        const newIndex =
          direction === "right"
            ? (prevIndex + stepSize) % selectedCharcter.length
            : (prevIndex - stepSize + selectedCharcter.length) %
              selectedCharcter.length;
        return newIndex;
      });
    },
    [selectedCharcter]
  );

  return (
    <div className="App min-h-screen flex flex-col">
      <Header />

      <div className="flex flex-1 flex-row p-2">
        <DndProvider backend={HTML5Backend}>
          <div className="basis-1/5 text-gray-100 shadow-lg rounded-l-lg p-5">
            <Sidebar />
          </div>
          <div className="flex-grow bg-white border border-slate-300 rounded-md mx-3 p-6 shadow-sm">
            <EditorArea
              playRotation={playRotation}
              coords={coords}
              setCoords={setCoords}
            />
          </div>
        </DndProvider>

        <div className="flex flex-col h-screen p-4 space-y-4 w-1/3">
          <div className="flex-grow border border-gray-400 rounded-lg p-4 shadow-md">
            <Previewarea
              selectedCharcter={selectedCharcter}
              spriteRotation={spriteRotation}
              spriteIndex={spriteIndex}
              onDragUpdate={onDragUpdate}
              coords={coords}
            />
          </div>

          <div className="flex-grow border border-gray-400 rounded-lg p-4 shadow-md">
            <Spirites
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              selectedCharcter={selectedCharcter}
              setSelectedCharcter={setSelectedCharcter}
              coords={coords}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
