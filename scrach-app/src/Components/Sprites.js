import React from "react";
import { FaTrash } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import Modal from "react-modal";
import baseball from "../assets/images/baseball.svg";
import soccer from "../assets/images/soccer-ball.svg";
import apple from "../assets/images/apple.svg";
import beachBall from "../assets/images/beach-ball.svg";
import ball from "../assets/images/ball.svg";
import ballon from "../assets/images/ballon.svg";
import { IoClose } from "react-icons/io5";

const Sprites = ({
  isModalOpen,
  setIsModalOpen,
  selectedCharcter,
  setSelectedCharcter,
  coords,
}) => {
  const character = [baseball, soccer, apple, ball, ballon, beachBall];

  const handleAddSpriteBtnClick = () => {
    setIsModalOpen(true);
  };

  const handleCharacterSelect = (characters) => {
    setSelectedCharcter([...selectedCharcter, characters]);
    setIsModalOpen(false);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };
  const handleDelete = (indexToDelete) => {
    setSelectedCharcter((prev) =>
      prev.filter((_, idx) => idx !== indexToDelete)
    );
  };

  return (
    <>
      <span className="mr-5">sprites</span>
      <label className="mr-2">
        x:
        <input
          type="number"
          className="w-12 h-6 rounded-full border-gray-200 border text-center"
          value={coords.xPos}
          px
        />
      </label>
      <label className="ml-2">
        y:
        <input
          type="number"
          className="w-12 h-6 rounded-full border-gray-200 border text-center"
          value={coords.yPos}
          px
        />
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-8">
        {selectedCharcter.map((img, index) => (
          <div
            key={index}
            className="relative w-30 h-30 bg-white border border-gray-200 hover:boder-blue-500 flex flex-col items-center justify-between p-2"
          >
            <div className="flex items-center justify-center w-full h-3/2">
              <img
                key={index}
                src={img}
                alt="cat-spite"
                className="w-full h-full object-fill"
              />
            </div>
            <span className="w-full text-center text-sm font-semibold">{`sprite${index}`}</span>
            {selectedCharcter && (
              <button
                style={{ top: "-11px", right: "-11px" }}
                className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
                onClick={() => handleDelete(index)}
              >
                <FaTrash className="text-white text-xs" />
              </button>
            )}
          </div>
        ))}

        <div className="relative w-30 h-30 bg-white border border-gray-200 hover:boder-blue-500 flex flex-col items-center justify-center p-2">
          <div className="flex items-center justify-center w-full h-3/2 ">
            <button onClick={handleAddSpriteBtnClick} className="bg-none">
              <FaPlus className="text-2xl cursor-pointer" />
            </button>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Select an character"
        className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50"
      >
        <div className="bg-white p-4 rounded shadow-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-lg mb-4">Select an character</h2>
            <button
              className="bg-white border-gray-300 border rounded-full"
              onClick={handleClose}
            >
              <IoClose className="2xl cursor-pointer" />
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {character.map((characters, index) => (
              <img
                key={index}
                src={characters}
                alt={`image-${index}`}
                onClick={() => handleCharacterSelect(characters)}
                className="w-24 h-24 object-fill cursor-pointer border-2 border-gray-300 hover:border-blue-500"
              />
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
};
export default Sprites;
