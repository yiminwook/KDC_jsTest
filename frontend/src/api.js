const API_ENDPOINT = "http://localhost:4001";

const REQUEST_ERROR = {
  500: { message: "500, 서버에러" },
  400: { message: "400, 통신에러" },
  unknown: { message: "unknown, 에러" },
};

const request = async (url) => {
  try {
    const response = await fetch(url);
    const status = response.status;
    if (status >= 200 && status < 300) return response.json();
    else throw REQUEST_ERROR[status] || REQUEST_ERROR[unknown];
  } catch (error) {
    alert(error.message);
  }
};

const api = {
  fetchCats: async (keyword) => {
    return await request(`${API_ENDPOINT}/api/cats/search?q=${keyword}`);
  },
  fetchCatsWithPage: async ({ keyword, page }) => {
    return await request(
      `${API_ENDPOINT}/api/cats/search?q=${keyword}&page=${page}`
    );
  },
  fetchRandomCats: async () => {
    return await request(`${API_ENDPOINT}/api/cats/random50`);
  },
  fetchCatsById: async (id) => {
    return await request(`${API_ENDPOINT}/api/cats/${id}`);
  },
};
