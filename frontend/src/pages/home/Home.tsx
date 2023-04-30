import { useRecoilValue } from "recoil";
import { isLoggedInState } from "../../states/auth/atom";
import { useEffect } from "react";
import useGetUserData from "../../services/users/hooks/useGetUserData";

const Home = () => {
  const isLoggedIn = useRecoilValue(isLoggedInState);
  useEffect(() => {}, [isLoggedIn]);

  const {data: userData, isLoading, isFetching} = useGetUserData();

  while(isLoading || isFetching){return <></>};

  sessionStorage.setItem('userData', JSON.stringify(userData.data));
  return (<> Home Component </>);
};

export default Home;
