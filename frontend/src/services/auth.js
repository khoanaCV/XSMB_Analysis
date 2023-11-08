import axios from "axios";

const { REACT_APP_URL_SERVER } = process.env;
const url = REACT_APP_URL_SERVER + "/auth";
class AuthService {
  async login(email, password) {
    return await axios
      .post(url + "/login", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.token) {
          console.log(response.data);
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  async forgotPassword(email) {
    return await axios.post(url + "/forgot_password", email, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  async resetPassword(token, password) {
    return await axios.post(url + "/reset-password", {
      token,
      password,
    });
  }

  async logout() {
    localStorage.removeItem("user");
    return await axios.post(`${url}/logout`);
  }

  async register(name, email, password) {
    return await axios.post(`${url}/register`, {
      name: name,
      email: email,
      password: password,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
