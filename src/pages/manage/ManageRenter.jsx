import { useDispatch, useSelector } from "react-redux";
import Renter from "./renter/Renter";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function ManageRenter() {
    const [loading, setLoading] = useState(true);
    const isAuthenticated = useSelector((state) => !!state.auth.accessToken);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
      if (!isAuthenticated) {
        navigate("/login");
      }
    }, [navigate, dispatch, isAuthenticated]);
    return ( 
        <>
        <Renter/>
        </>
     );
}

export default ManageRenter;