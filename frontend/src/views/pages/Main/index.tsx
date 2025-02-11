import useAuth from "../../../hooks/useAuth.ts";
import { Api } from "../../../config/api.ts";
import { useNavigate } from "react-router-dom";
import AxiosXHR = Axios.AxiosXHR;
import ResponseUserData from "../../../models/Main/ResponseUserData.ts";
import Button from "../../../components/Button/Button.tsx";
import { useState } from "react";
import Title from "../../../components/Title/index.tsx";
import ModalRoomName from "./components/ModalRoomName/index.tsx";
import Rooms from "./components/Rooms/index.tsx";
import ResponseRoomData from "../../../models/Main/ResponseRoomData.ts";

export default function Main() {
  const { user, setUser } = useAuth(); // Use o setter aqui
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState<string>("");
  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);
  const [rooms, setRooms] = useState<ResponseRoomData[] | null>(null);

  const OnClickLogOut = async () => {
    try {
      const response: AxiosXHR<ResponseUserData> = await Api.use.get(
        "/logout",
        { withCredentials: true }
      );
      console.log(response);

      if (response.status === 200) {
        setUser(null); // Atualiza o estado para null após logout
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const onClickModalVisible = () => {
    setModalIsVisible((prev) => !prev);
  };

  if (!user) {
    navigate("/login"); // Redireciona para login se o usuário for null
    return null;
  }

  return (
    <div className="w-screen h-screen block justify-center relative">
      <div className="flex justify-end mt-4 mr-4">
        <Button
          content={"Exit"}
          contentColor={"white"}
          color={"red"}
          size={"large"}
          onClickEvent={OnClickLogOut}
        />
      </div>
      <div className="flex justify-end mt-10 mr-24">
        <Button
          content={"Create your room"}
          color={"cyan"}
          size={"medium"}
          contentColor={"white"}
          onClickEvent={() => onClickModalVisible()}
        />
      </div>
      <div className="flex-grow flex justify-center mt-4">
        <Title
          content={"Hello " + user.username}
          large="3"
          bold={false}
          underline={true}
        />
      </div>
      <Rooms rooms={rooms} setRooms={setRooms} />
      <ModalRoomName
        userId={user.id}
        roomName={roomName}
        setRoomName={setRoomName}
        modalIsVisible={modalIsVisible}
        setModalIsVisible={setModalIsVisible}
        setRooms={setRooms}
        rooms={rooms}
      />
    </div>
  );
}
