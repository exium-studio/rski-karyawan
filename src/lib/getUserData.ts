export default function getUserData() {
  return JSON.parse(localStorage.getItem("userData") as string);
}
