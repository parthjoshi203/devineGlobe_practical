import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  loginSuccess,
  logout,
  selectIsAuthenticated,
} from "../store/slices/authSlice";
import { useCallback } from "react";
import { FAKE_LOGIN_CREDENTIALS } from "../constants";

export const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const login = useCallback(
    (credentials) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (
            credentials.username === FAKE_LOGIN_CREDENTIALS.username &&
            credentials.password === FAKE_LOGIN_CREDENTIALS.password
          ) {
            const token = `fake-jwt-tkn-${Date.now()}`;
            dispatch(loginSuccess(token));
            resolve({ success: true, token });
          } else {
            reject(new Error("invalid username or password"));
          }
        }, 1000);
      });
    },
    [dispatch]
  );

  const handleLogout = useCallback(() => {
    dispatch(logout());
    navigate("/login");
  }, [dispatch, navigate]);

  return {
    login,
    logout: handleLogout,
    isAuthenticated,
  };
};
