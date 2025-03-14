import axios from "axios";

export async function getUsers(page: number, search?: string): Promise<any> {
  try {
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://api.github.com${
        search ? "/search/" : "/"
      }users?per_page=5&page=${page}${search ? `&q=${search}` : ""}`,
    };

    let response: any = await axios(config);
    return search ? response.data.items : response.data;
  } catch (error) {
    return error;
  }
}
