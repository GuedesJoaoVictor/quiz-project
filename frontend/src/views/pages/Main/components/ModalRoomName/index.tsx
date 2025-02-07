import React, { useState } from "react";
import { ModalContainer } from "../../../../../components/modals/ModalContainer";
import Input from "../../../../../components/Input";
import { Api } from "../../../../../config/api";

interface ModalRoomNameProps {
  userId: number;
  setRoomName: (roomName: string) => void;
  modalIsVisible: boolean;
  setModalIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ModalRoomName({
  userId,
  setRoomName,
  modalIsVisible,
  setModalIsVisible,
}: ModalRoomNameProps) {
  const [inputValue, setInputValue] = useState("");

  const handleConfirm = async () => {
    setRoomName(inputValue);
    setModalIsVisible(false);

    const response = await Api.use.post("/rooms/create", {
      userId: userId,
      roomName: inputValue,
    });

    console.log(response);
  };

  return (
    <ModalContainer hide={!modalIsVisible} setHide={setModalIsVisible}>
      <div className="bg-secondary-color p-4 rounded-md z-50 flex flex-col items-center">
        <p className="text-gray-800">Digite o nome da sala:</p>
        <Input
          label=""
          name="roomName"
          type="text"
          onChange={(e) => setInputValue(e.target.value)}
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
