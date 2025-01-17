import Input from "../../../components/Input/index.tsx"
import React, {useState} from "react";
import { Api } from "../../../config/api.ts";
import AxiosXHR = Axios.AxiosXHR;
import Button from "../../../components/Button/Button.tsx";
import Title from "../../../components/Title/index.tsx";

/**
 * Gerencia a view de Registro
 * @constructor
 */

interface FormDataProps {
    username: string;
    email: string;
    password: string;
}

export default function Register() {

    const [formData, setFormData] = useState<FormDataProps>({
        username: "",
        email: "",
        password: ""
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try {
            if(formDataIsBlank()) {
                return;
            }

            const response: AxiosXHR<string> = await Api.use.post("/register", {
                username: formData.username,
                email: formData.email,
                password: formData.password
            });

            //Reinicia os valores.
            document.querySelectorAll("input").forEach((input) => {
                input.value = ""
            });

            setFormData({
                email: "",
                password: "",
                username: ""
            });

            console.log(response);
        } catch (err) {
            console.log(err);
        }
    }

    function formDataIsBlank() {
        return formData.username == "" || formData.email == "" || formData.password == "";
    }

    return (
        <div className="flex items-center justify-center w-screen h-screen">
            <div className="bg-secondary-color p-16 rounded-2xl shadow-lg">
                <div className="text-center mb-5">
                    <Title content="Register" large="3"/>
                </div>
                <form className="flex flex-col gap-4" method={"POST"}>
                    <Input type="text" label="Username:"
                           name="username"
                           value={formData.username}
                           onChange={handleChange}/>
                    <Input type="email" label="Email:"
                           name="email"
                           value={formData.email}
                           onChange={handleChange}/>
                    <Input type="password" label="Password:"
                           name="password"
                           value={formData.password}
                           onChange={handleChange}/>
                    <Button color="blue" 
                            content="Sign up" 
                            contentColor="white" 
                            size="very-small" 
                            onClickEvent={handleSubmit}/>
                    <p>You already have an account?
                        <a className={"text-blue-400"} href={"/login"}> Log In </a>
                    </p>
                </form>
            </div>
        </div>
    );
}