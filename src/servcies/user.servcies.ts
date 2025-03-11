import axios from "axios";

export async function getUsers(page: number, search?: string): Promise<any> {
  try {
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://api.github.com/users?per_page=5&page=${page}`,
    };

    let response = await axios(config);
    console.log(response);
    if (response.status === 200) return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}
