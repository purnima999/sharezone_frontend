import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import 'slick-carousel/slick/slick.css';
import AllRoutes from "./routes";
import './sass/index.scss';

export default function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthUser } = useSelector((state) => state?.registerSlice);


  console.log("isAuthUserisAuthUser", isAuthUser)
  // useEffect(() => {
  // return () => {
  // dispatch(setNonAuthSessionIdReuqest(""))
  // }
  // }, [])

  return (
    <AllRoutes
      authenticated={isAuthUser}
    />
  );
}
