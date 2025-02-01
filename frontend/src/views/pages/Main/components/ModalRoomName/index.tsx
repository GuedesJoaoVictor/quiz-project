import { ModalContainer } from "../../../../../components/modals/ModalContainer";
import React from "react";

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
  if (modalIsVisible) {
    setRoomName("Guedes");
  }

  return (
    <ModalContainer hide={modalIsVisible} setHide={setModalIsVisible}>
      <div>
        <p>Oi né</p>
      </div>
    </ModalContainer>
  );
}
