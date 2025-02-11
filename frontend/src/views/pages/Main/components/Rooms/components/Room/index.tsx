interface RoomProps {
  children: React.ReactNode;
}

export default function Room({ children }: RoomProps) {
  return (
    <div className="border-b border-black">
      <div className="mx-2 mt-1 p-1">{children}</div>
    </div>
  );
}
