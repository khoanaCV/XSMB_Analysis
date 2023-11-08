import axios from "axios";
import authHeader from "./auth-header";
const { REACT_APP_URL_SERVER } = process.env;
const url = REACT_APP_URL_SERVER + "/admin";

class AdminService {
  getUserList() {
    return axios.get(url + "/userList", { headers: authHeader() });
  }

  deleteUser(id) {
    return axios.post(
      url + "/deleteUser",
      {
        id,
      },
      {
        headers: authHeader(),
      }
    );
  }
}

export default new AdminService();
