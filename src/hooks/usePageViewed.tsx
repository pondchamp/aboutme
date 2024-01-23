import { useCookies } from "react-cookie";

export const usePageViewed = (): [
  pageViewed: boolean,
  setPageViewed: () => void
] => {
  const [cookies, setCookie] = useCookies(["pageViewed"]);
  const pageViewed = cookies.pageViewed == 1;
  const setPageViewed = () => setCookie("pageViewed", 1);
  return [pageViewed, setPageViewed];
};
