import { useMutation } from "@tanstack/react-query";
import { useAxios } from "../../useAxios/useAxios";
import { notificationApi } from "../../../generic/noficationApi";
import Cookies from "js-cookie"
import { useReduxDispatch } from "../../useRedux";
import { setAuthorizationModalVisiblity } from "../../../redux/modol-store";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
export const useLoginMutation = () => {
    const notify = notificationApi()
    const axios = useAxios();
    const dispatch = useReduxDispatch()
    return useMutation({
        mutationKey: ["login"],
        mutationFn: (data: object) => axios({ url: "user/sign-in", method: "POST", body: data }),
        onSuccess: (data) => {
            notify("login")
            const { token, user } = data
            Cookies.set("token" , token)
            Cookies.set("user", JSON.stringify(user))
            dispatch(setAuthorizationModalVisiblity())
        },
     onError: (error) => {
  const axiosError = error as AxiosError<{ message: string }>;
  const message = axiosError.response?.data?.message || "Noma'lum xatolik yuz berdi";

  if (axiosError.response?.status === 409) {
    toast.error(`Xatolik: ${message}`); 
  } else {
    toast.error(message);
  }
}

    });
};

export const useRegisterMutation = () => {
    const axios = useAxios();
    return useMutation({
        mutationKey: ["register"],
        mutationFn: (data: object) => axios({ url: "user/sign-up", method: "POST", body: data }),
        onSuccess: (data) => {
            console.log("Registration successful:", data);
        },
        onError: (error) => {
            console.error("Registration error:", error);
        },
    });
};