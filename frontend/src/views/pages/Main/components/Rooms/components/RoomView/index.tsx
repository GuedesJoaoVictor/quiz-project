import ResponseRoomData from "../../../../../../../models/Main/ResponseRoomData";
import Room from "../Room";

interface RoomViewProps {
  rooms: ResponseRoomData[] | null;
}

export default function RoomView({ rooms }: RoomViewProps) {
  if (rooms === null || rooms.length === 0) {
    return <p>Não existem salas no momento.</p>;
  }

  return (
    <>
      {rooms.map((room) => (
        <Room key={room.id}>
          {room.room_name} Owner - {room.owner_name}
        </Room>
      ))}
    </>
  );
}
