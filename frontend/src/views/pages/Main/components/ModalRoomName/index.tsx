import React from "react";
import { ModalContainer } from "../../../../../components/modals/ModalContainer";
import Input from "../../../../../components/Input";
import { Api } from "../../../../../config/api";
import ResponseRoomData from "../../../../../models/Main/ResponseRoomData";
import AxiosXHR = Axios.AxiosXHR;

interface ModalRoomNameProps {
  userId: number;
  roomName: string;
  setRoomName: (roomName: string) => void;
  modalIsVisible: boolean;
  setModalIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setRooms: React.Dispatch<React.SetStateAction<ResponseRoomData[] | null>>;
  rooms: ResponseRoomData[] | null;
}

export default function ModalRoomName({
  userId,
  roomName,
  setRoomName,
  modalIsVisible,
  setModalIsVisible,
  setRooms,
  rooms,
}: ModalRoomNameProps) {
  const handleConfirm = async () => {
    if (!roomName.trim()) {
      return;
    }

    setModalIsVisible(false);

    const response: AxiosXHR<ResponseRoomData> = await Api.use.post(
      "/rooms/create",
      {
        userId: userId,
        roomName: roomName,
      }
    );

    const newRoom = response.data;

    if (rooms != null) {
      setRooms([...rooms, newRoom]);

      return;
    }

    setRooms([newRoom]);
  };

  return (
    <ModalContainer hide={!modalIsVisible} setHide={setModalIsVisible}>
      <div className="bg-secondary-color p-4 rounded-md z-50 flex flex-col items-center">
        <p className="text-gray-800">Digite o nome da sala:</p>
        <Input
          label=""
          name="roomName"
          type="text"
          onChange={(e) => setRoomName(e.target.value)}
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
