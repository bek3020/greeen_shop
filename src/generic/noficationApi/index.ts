import { toast } from "react-hot-toast";
type NotificationType = "login" | "409";
export const notificationApi = () => {
  const notify = (type: NotificationType) => {
    switch (type) {
      case "login":
        return toast.success("Xush kelibsiz !!");
      case "409":
        return toast.error("Xatolik !!");
      default:
        return;
    }
  };
  return notify;
};
