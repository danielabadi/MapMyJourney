import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "./pages/auth/Auth";
import { isLoggedInState } from "./states/auth/atom";
import { useRecoilValue } from "recoil";

function App() {
  const isLoggedIn = useRecoilValue(isLoggedInState);

  return (
    <Routes>
      <Route path='/' element={<Auth />} />
      {isLoggedIn && <Route path='/home' element={<>Home</>} />}
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  );
}

export default App;
