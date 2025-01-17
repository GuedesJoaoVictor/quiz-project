import React from 'react';
/**
 * @param children - Componente React que ficará dentro do modal
 * @param hide - Define a visibilidade do modal
 *
 */

type Props = {
    children: React.ReactNode | null,
    hide: boolean,
    setHide: React.Dispatch<React.SetStateAction<boolean>>
}

export function ModalContainer({children, hide, setHide}: Props) {

    if (hide || !children) return null;

    return (
        <div className="fixed top-0 left-0 w-screen h-screen bg-slate-500 flex justify-center items-center z-auto" onClick={() => {
            setHide((prevstate) => {
                return !prevstate
            })
        }}>
            <div className="rounded-md shadow-md z-auto" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>

    );
};

