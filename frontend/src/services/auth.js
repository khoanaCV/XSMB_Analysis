import axios from "axios";

const { URL_SERVER } = process.env;
const url = URL_SERVER + "/auth";
class AuthService {
  login(email, password) {
    return axios
      .post(
        url + "/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.data.accessToken) {
          //TODO accesstoken barasse
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  forgotPassword(email) {
    return axios.post(url + "/forgot_password", email, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  resetPassword(token, password) {
    return axios.post(url + "/reset-password", {
      token,
      password,
    });
  }

  async logout() {
    localStorage.removeItem("user");
    return await axios.post(`${url}/logout`);
  }

  async register(name, email, password) {
    return await axios.post(
      `${url}/register`,
      {
        name: name,
        email: email,
        password: password,
      },
      {
        withCredentials: true,
      }
    );
  }

  async editUser(firstName, lastName, username, phone, email, address) {
    //! Khoong thayas code
    return await axios.post(URL_SERVER + "edit_user", {
      firstName,
      lastName,
      username,
      phone,
      email,
      address,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
