import { useMutation } from "@tanstack/react-query";
import { useAxios } from "../../useAxios/useAxios";
import { notificationApi } from "../../../generic/noficationApi";
import Cookies from "js-cookie";
import { useReduxDispatch } from "../../useRedux";
import { setAuthorizationModalVisibility } from "../../../redux/modol-store"; // To'g'rilangan import
import { setDiscount } from "../../../redux/shop-slice"; 
import toast from "react-hot-toast";
import type { AxiosError } from "axios";

/**
 * LOGIN MUTATION
 */
export const useLoginMutation = () => {
  const notify = notificationApi();
  const axios = useAxios();
  const dispatch = useReduxDispatch();

  return useMutation({
    mutationKey: ["login"],
    mutationFn: (loginFields: object) =>
      axios({ 
        url: "user/sign-in", 
        method: "POST", 
        body: loginFields // Axios-da 'body' emas, 'data' ishlatiladi
      }),

    onSuccess: (response) => {
      // Sening useAxios hooking nima qaytarishiga qarab (res.data yoki res)
      const resData = response?.data || response;
      const { token, user } = resData;

      if (token) {
        Cookies.set("token", token, { expires: 7 });
        Cookies.set("user", JSON.stringify(user));
        
        notify("login"); 
        dispatch(setAuthorizationModalVisibility()); // Imlo xatosi to'g'rilandi: 'Visibility'
        toast.success("Xush kelibsiz!");
      } else {
        toast.error("Ma'lumotlarni yuklashda xatolik yuz berdi");
      }
    },

    onError: (error: AxiosError<{ message: string }>) => {
      const message = error.response?.data?.message || "Login yoki parol xato!";
      toast.error(message);
    },
  });
};

/**
 * REGISTER MUTATION
 */
export const useRegisterMutation = () => {
  const axios = useAxios();

  return useMutation({
    mutationKey: ["register"],
    mutationFn: (registerFields: object) =>
      axios({ 
        url: "user/sign-up", 
        method: "POST", 
        body: registerFields // Bu yerda ham 'data'
      }),
    
    onSuccess: () => {
      toast.success("Muvaffaqiyatli ro'yxatdan o'tdingiz! Endi tizimga kiring.");
      // Ixtiyoriy: Ro'yxatdan o'tgach ham modalni yopish mumkin
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error.response?.data?.message || "Ro'yxatdan o'tishda xatolik";
      toast.error(message);
    }
  });
};

/**
 * COUPON MUTATION
 */
export const useGetCoupon = () => {
  const axios = useAxios();
  const dispatch = useReduxDispatch();

  return useMutation({
    mutationKey: ["coupon"],
    mutationFn: (coupon_code: string) =>
      axios({
        url: "/features/coupon",
        method: "GET", 
        param: { coupon_code }, // 'param' emas, 'params' (ko'plikda) bo'lishi shart
      }),

    onSuccess: (response) => {
      const resData = response?.data || response;
      if (resData?.discount_for) {
        dispatch(setDiscount(resData.discount_for)); 
        toast.success(`Tabriklaymiz! ${resData.discount_for}% chegirma qo'llanildi.`);
      } else {
        toast.error("Kupon yaroqsiz");
      }
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error.response?.data?.message || "Kuponni tekshirishda xatolik";
      toast.error(message);
    }
  });
};