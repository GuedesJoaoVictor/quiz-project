interface ButtonProps {
    content: string;
    color: "red" | "blue" | "cyan";
    size: "very-small" | "small" | "medium" | "large";
    contentColor: "black" | "white";
    onClickEvent?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onClick?: () => void;
}

function variantButtonColor(color: string) {
    switch (color) {
        case "blue":
            return "bg-slate-700";
        case "cyan":
            return "bg-cyan-400"
        case "red":
            return "bg-red-900"
        default:
            return "bg-slate-700";
    }
}

function variantButtonSize(size: string) {
    switch (size) {
        case "very-small":
            return "py-2 px-4"
        case "small":
            return "py-3 px-8";
        case "medium":
            return "py-3 px-12"
        case "large":
            return "py-3 px-16"
        default:
            return "py-3 px-8";
    }
}

export default function Button({ color, size, onClickEvent, onClick, content, contentColor }: ButtonProps) {
    const buttonColor = variantButtonColor(color);
    const buttonSize = variantButtonSize(size);

    return(
        <button className={`${buttonColor} ${buttonSize} text-${contentColor} rounded-3xl`}
                onClick={onClickEvent ? onClickEvent : onClick}>
            {content}
        </button>
    );
}