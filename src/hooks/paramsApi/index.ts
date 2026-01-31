import { useSearchParams } from "react-router-dom";

const useSearchParamsHandler = () => {
  const [params, setParams] = useSearchParams();

  const getParam = (key: string): string | null => {
    return params.get(key);
  };

  const setParam = (param: Record<string, string>) => {
    setParams((prev) => ({
      ...Object.fromEntries(prev),
      ...param,
    }));
  };

  const deleteParam = (key: string) => {
    setParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.delete(key);
      return newParams;
    });
  };

  return { getParam, setParam, deleteParam };
};

export { useSearchParamsHandler };


