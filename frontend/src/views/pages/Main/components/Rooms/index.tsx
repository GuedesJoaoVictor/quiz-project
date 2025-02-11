import { useEffect } from "react";
import ResponseRoomData from "../../../../../models/Main/ResponseRoomData";
import RoomView from "./components/RoomView";
import AxiosXHR = Axios.AxiosXHR;
import { Api } from "../../../../../config/api";

interface RoomsProps {
  rooms: ResponseRoomData[] | null;
  setRooms: React.Dispatch<React.SetStateAction<ResponseRoomData[] | null>>;
  actualRoomName?: string;
}

export default function Rooms({ rooms, setRooms }: RoomsProps) {
  useEffect(() => {
    const getRoomsOnline = async () => {
      const response: AxiosXHR<ResponseRoomData[]> = await Api.use.get(
        "/rooms/all"
      );

      setRooms(response.data);
    };

    getRoomsOnline();
  }, []);
  return (
    <div className="container mx-auto py-2 flex justify-center mt-4">
      <div className="w-2/3 flex items-center justify-center rounded flex-col border-md overflow-hidden">
        <h1 className="text-white text-2xl bg-header-rooms w-full text-center p-4">
          Rooms Online
        </h1>
        <div className="bg-rooms-color w-full grid grid-cols-2 relative border border-black rounded-b-md items-center justify-center">
          <div className="absolute h-full w-full flex justify-center">
            <div className="after:'' bg-black w-1"></div>
          </div>
          <RoomView rooms={rooms} />
        </div>
      </div>
    </div>
  );
}
