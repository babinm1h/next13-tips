import { URLSearchParamsInit, useSearchParams } from "react-router-dom";

type CustomParamsData = [
  { [k: string]: string },
  (nextInit: URLSearchParamsInit, navigateOptions?: { replace?: boolean | undefined; state?: any } | undefined) => void,
];

export const useCustomSearchParams = (): CustomParamsData => {
  const [search, setSearch] = useSearchParams();
  const searchAsObject = Object.fromEntries(new URLSearchParams(search));

  return [searchAsObject, setSearch];
};
