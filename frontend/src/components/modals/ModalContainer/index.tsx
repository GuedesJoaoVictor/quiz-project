import React from "react";

type Props = {
  children: React.ReactNode;
  hide: boolean;
  setHide: React.Dispatch<React.SetStateAction<boolean>>;
};

export function ModalContainer({ children, hide, setHide }: Props) {
  if (hide) return null;

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen bg-slate-500 bg-opacity-50 flex justify-center items-center z-50"
      onClick={() => setHide(true)}
    >
      <div
        className="rounded-md shadow-md bg-white p-4 z-50"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
