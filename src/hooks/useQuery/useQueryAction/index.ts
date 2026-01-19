import { useMutation } from "@tanstack/react-query";
import { useAxios } from "../../useAxios/useAxios";

export const useLoginMutation = () => {
    const axios = useAxios();
    return useMutation({
        mutationKey: ["login"],
        mutationFn: (data: object) => axios({ url: "user/sign-in", method: "POST", body: data }),
        onSuccess: (data) => {
            console.log(data);
        },
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
