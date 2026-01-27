import { useQuery } from "@tanstack/react-query";
import { useAxios } from "../useAxios/useAxios";

interface QueryHandlerType {
  url: string;
  pathname: string;
  param?: object;
}

export const useQueryHandler = <T,>({
  url,
  pathname,
  param,
}: QueryHandlerType) => {
  const axios = useAxios();

  return useQuery<T>({
    queryKey: [pathname, param],
    queryFn: () => axios({ url, param }),
  });
};
