import Input from "../../../components/Input";
import React, {useState} from "react";
import AxiosXHR = Axios.AxiosXHR;
import {Api} from "../../../config/api.ts";
import {useNavigate} from "react-router-dom";
import ResponseLoginData from "../../../models/Login/ResponseLoginData.ts";
import Button from "../../../components/Button/Button.tsx";

/**
 * Gerencia a view de Login
 * @constructor
*/

interface LoginDataProps {
    email: string;
    password: string;
}

export default function Login() {
    const [formData, setFormData] = useState<LoginDataProps>({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try {
            if(dataFormIsBlank()) {
                return;
            }

            const response: AxiosXHR<ResponseLoginData> = await Api.use.post("/login", {
                email: formData.email,
                password: formData.password
            }, {
                withCredentials: true
            });

            if(response.data.success) {
                navigate("/");
                return;
            }

            console.error("Error in login", response.data.message);

            clearInputs();

            console.log(response);
        }
        catch (error) {
            console.log(error);
        }
    } ;

    function dataFormIsBlank() {
        return formData.email == "" || formData.password == "" || formData.email == " " || formData.password == " "
    }

    function clearInputs() {
        document.querySelectorAll("input").forEach((input) => {
            input.value = ""
        });

        setFormData({
            email: "",
            password: ""
        });
    }

    return (
        <div className="flex items-center justify-center w-screen h-screen">
            <div className="bg-secondary-color p-16 rounded-2xl shadow-lg">
                <h1 className="text-center text-3xl font-light mb-4">Login</h1>
                <form className="flex flex-col gap-4" method={"POST"}>
                    <Input type="email" label="Email:"
                           name="email"
                           value={formData.email}
                           onChange={handleChange}/>
                    <Input type="password" label="Password:"
                           name="password"
                           value={formData.password}
                           onChange={handleChange}/>
                    <Button color="blue" 
                            content="Sign in" 
                            contentColor="white" 
                            size="very-small" 
                            onClickEvent={handleSubmit}/>
                    <p>You already have an account?
                        <a className={"text-blue-400"} href={"/register"}> Register </a>
                    </p>
                </form>
            </div>
        </div>
    );
}