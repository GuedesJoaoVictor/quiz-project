import React, { useState } from "react";
import { ModalContainer } from "../../../../../components/modals/ModalContainer";

interface ModalRoomNameProps {
  setRoomName: (roomName: string) => void;
  modalIsVisible: boolean;
  setModalIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ModalRoomName({
  setRoomName,
  modalIsVisible,
  setModalIsVisible,
}: ModalRoomNameProps) {
  const [inputValue, setInputValue] = useState("");

  const handleConfirm = () => {
    setRoomName(inputValue);
    setModalIsVisible(false);
  };

  return (
    <ModalContainer hide={!modalIsVisible} setHide={setModalIsVisible}>
      <div className="bg-white p-4 rounded-md">
        <p>Digite o nome da sala:</p>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="border border-gray-300 p-2 rounded-md w-full mt-2"
        />
        <div className="flex justify-end mt-4">
          <button
            onClick={handleConfirm}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Confirmar
          </button>
        </div>
      </div>
    </ModalContainer>
  );
}
