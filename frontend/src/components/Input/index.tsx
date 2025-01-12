interface InputProps {
    type: "text" | "button" | "email" | "password";
    label: string;
    name: string;
    value?: string;
    required?: boolean;
    onChange?: (element: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ type, label, required, value, name, onChange }: InputProps) {
    return(
        <div className={"flex items-center justify-center"}>
            <label htmlFor={label} className={"text-black"}>{label}</label>
            <input className={"bg-input p-1 rounded-xl ml-4"}
                   type={type}
                   required={!!required}
                   value={value}
                   name={name}
                   onChange={onChange}
                   id={label}/>
        </div>
    );
}