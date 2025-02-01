export default interface ResponseLoginData {
  success: boolean;
  user: {
    id: number;
    username: string;
    email: string;
  };
  message: string;
}
