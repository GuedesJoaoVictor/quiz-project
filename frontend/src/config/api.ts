import axios from "axios";

class Api {
    static use = axios.create({
        baseURL: "http://localhost:8080"
    });
}
export { Api };
