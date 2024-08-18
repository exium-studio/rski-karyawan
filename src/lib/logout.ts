import { removeCookie } from "typescript-cookie";

export default function logout() {
  // TODO mungkin ada tambahan userData

  removeCookie("authToken");
}
