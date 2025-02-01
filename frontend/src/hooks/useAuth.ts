import { useEffect, useState } from "react";
import ResponseUserData from "../models/Main/ResponseUserData.ts";
import AxiosXHR = Axios.AxiosXHR;
import { Api } from "../config/api.ts";
import { useNavigate } from "react-router-dom";

interface ResponseData {
  success: boolean;
  message: string;
  user: ResponseUserData;
}

const useAuth = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<ResponseUserData | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response: AxiosXHR<ResponseData> = await Api.use.get("/", {
          withCredentials: true,
        });

        if (response.data.success) {
          setUser(response.data.user);
        } else {
          console.error(response.data.message);
          setUser(null); // Limpa o usuário caso a autenticação falhe
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
        setUser(null); // Limpa o usuário em caso de erro
        navigate("/login");
      }
    };
    checkAuth();
  }, [navigate]);

  return { user, setUser }; // Retorna o estado e o setter
};

export default useAuth;
