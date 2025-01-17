interface TitleProps {
    content: string;
    bold?: boolean;
    large?: "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
    underline?: boolean
}

export default function Title({ content, bold, large, underline }: TitleProps) {
    return (
        <h1 className={`${large ? `text-${large}xl` : "text-xl"} ${bold ? "font-bold" : "font-light"} ${underline ? "underline" : " "}`}>
            {content}
        </h1>
    );
}