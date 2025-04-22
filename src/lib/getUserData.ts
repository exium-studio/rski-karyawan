export default function getUserData() {
  const storedData = localStorage.getItem("__user_data") as string;
  // console.log(storedData);

  let data = null;
  try {
    if (storedData) {
      data = JSON.parse(storedData);
    }
  } catch (error) {
    localStorage.removeItem("__auth_token");
    localStorage.removeItem("__user_data");
  }

  return data;

  // return JSON.parse(storedData);
}
