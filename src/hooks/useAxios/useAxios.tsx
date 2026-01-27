import axios from "axios";

interface AxiosType {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: object;
  param?: object;
}

export const useAxios = () => {
  const baseUrl = import.meta.env.VITE_API_URL;
  if (!baseUrl) {
    console.error(
      "API bazaviy URL aniqlanmadi! Iltimos, .env faylda VITE_API_URL ni to'g'ri sozlang."
    );
  }

  const request = ({ url, method = "GET", param, body }: AxiosType) => {
    return axios({
      url: `${baseUrl}/${url}`, // API URL ni to'g'ri qo'shamiz
      method,
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
      params: {
        access_token: "64eecf3b54abde61153d1fd3", // doimiy token, agar kerak bo'lsa dinamik qilinishi mumkin
        ...param,
      },
    })
      .then((res) => res.data.data) // serverdan faqat data maydonini qaytaramiz
      .catch((error) => {
  if (error.response) {
    console.error("Serverdan xatolik:", error.response.data);
  } else if (error.request) {
    console.error("So‘rov yuborildi, javob kelmadi:", error.request);
  } else {
    console.error("Xato so‘rovni yaratishda:", error.message);
  }
  throw error;
});
  };

  return request;
};
