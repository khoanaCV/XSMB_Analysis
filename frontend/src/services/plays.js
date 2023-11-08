import axios from "axios";
import authHeader from "./auth-header";

const { REACT_APP_URL_SERVER } = process.env;
const url = REACT_APP_URL_SERVER + "/plays";
class PlayService {
  async create(id, date, number, point) {
    return await axios.post(
      `${url}/${id}`,
      {
        date,
        number,
        point,
      },
      {
        headers: authHeader(),
      }
    );
  }
}

export default new PlayService();
