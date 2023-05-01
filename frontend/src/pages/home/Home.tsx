import { useRecoilValue } from "recoil";
import { isLoggedInState } from "../../states/auth/atom";
import { useEffect } from "react";
import useGetUserData from "../../services/users/hooks/useGetUserData";
import ActionBar from "./components/ActionBar/ActionBar";
import Map from "../map/Map";

const Home = () => {
  const isLoggedIn = useRecoilValue(isLoggedInState);
  useEffect(() => {}, [isLoggedIn]);

  const {data: userData, isLoading, isFetching} = useGetUserData();

  while(isLoading || isFetching){return <></>};

  sessionStorage.setItem('userData', JSON.stringify(userData.data));

  return (
    <>
      <ActionBar />
      <Map />
    </>
  );
};

export default Home;
