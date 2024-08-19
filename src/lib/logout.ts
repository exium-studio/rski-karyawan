import { removeCookie } from "typescript-cookie";

export default function logout() {
  removeCookie("__auth_token");
  localStorage.removeItem("__user_data");
}
