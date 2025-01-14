import useAuth from "../../../hooks/useAuth.ts";
import { Api } from "../../../config/api.ts";
import { useNavigate } from "react-router-dom";
import AxiosXHR = Axios.AxiosXHR;
import ResponseUserData from "../../../models/Main/ResponseUserData.ts";

export default function Main() {
    const { user, setUser } = useAuth(); // Use o setter aqui
    const navigate = useNavigate();

    const OnClickLogOut = async () => {
        try {
            const response: AxiosXHR<ResponseUserData> = await Api.use.get("/logout", { withCredentials: true });
            console.log(response);

            if (response.status === 200) {
                setUser(null); // Atualiza o estado para null após logout
                navigate("/login");
            }
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    if (!user) {
        navigate("/login"); // Redireciona para login se o usuário for null
        return null;
    }

    return (
        <div className="w-screen h-screen flex justify-center relative">
            <div className="absolute top-5 right-5">
                <button className="bg-red-900 text-white py-3 px-16 rounded-3xl" onClick={OnClickLogOut}>
                    Exit
                </button>
            </div>
            <div className="flex-grow flex justify-center mt-32">
                <h1 className="text-3xl font-light underline text-center m-7">
                    Hello {user.username}
                </h1>
            </div>
        </div>
    );
}
