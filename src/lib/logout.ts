export default function logout() {
  localStorage.removeItem("__auth_token");
  localStorage.removeItem("__user_data");
}
