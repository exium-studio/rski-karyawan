export default function getUserDataCookie() {
  return JSON.parse(localStorage.getItem("userData") as string);
}
