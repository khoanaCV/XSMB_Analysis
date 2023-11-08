import axios from "axios";

const { URL_SERVER } = process.env;
const url = URL_SERVER + "/sparses";
class SparsesService {
  async lastAppearingLoto() {
    return await axios
      .post(
        url + "/last_appearing_loto",
        {},
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.data?.data) {
          const data = Object.entries(response.data?.data);
          data.sort((a, b) => b[1].count - a[1].count);
          return data.slice(0, 20);
        }
      });
  }
}

export default SparsesService();
