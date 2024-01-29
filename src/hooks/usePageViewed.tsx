import { useCookies } from "react-cookie";

import { AlwaysAnim } from "@/util";

export const usePageViewed = (): [
  pageViewed: boolean,
  setPageViewed: () => void
] => {
  const [cookies, setCookie] = useCookies(["pageViewed"]);
  const pageViewed = !AlwaysAnim && cookies.pageViewed == 1;
  const setPageViewed = () => setCookie("pageViewed", 1);
  return [pageViewed, setPageViewed];
};
