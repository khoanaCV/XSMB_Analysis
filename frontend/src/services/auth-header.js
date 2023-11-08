export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.token) {
    console.log("Bearer " + user.token);
    return {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      token: "Bearer " + user.token,
    };
  } else {
    return {};
  }
}
