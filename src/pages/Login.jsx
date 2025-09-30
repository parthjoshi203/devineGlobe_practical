import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useCallback, useState } from "react";
import { loginValidationSchema } from "../utils/validationSchemas";
import LoginLeft from "./../assets/images/loginLeft.png";
import Img1 from "./../assets/images/first.png";
import Img2 from "./../assets/images/second.png";
import Img3 from "./../assets/images/third.png";
import Img4 from "./../assets/images/fourth.png";
import Img5 from "./../assets/images/fifth.png";
import Img6 from "./../assets/images/sixth.png";
import Logo from "./../assets/images/login.png";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { login } = useAuth();
  const [serverError, setServerError] = useState("");

  const handleSubmit = useCallback(
    async (values, { setSubmitting, resetForm }) => {
      try {
        setServerError("");
        await login(values);
      } catch (error) {
        const errorMessage = error.message || "Login failed. Please try again.";
        setServerError(errorMessage);
        resetForm();
      } finally {
        setSubmitting(false);
      }
    },
    [login]
  );

  const initialValues = {
    username: "",
    password: "",
  };

  return (
    <div className="min-h-screen w-full ">
      <div className="p-10 flex  w-full h-screen gap-10">
        <div
          id="leftWrapper"
          className="bg-[#96DAC5] flex rounded-[40px] overflow-hidden w-3/5"
        >
          <div
            id="leftContainer"
            className="bg-[#6B599C] flex-1 rounded-[40px]"
          >
            <div
              id="topWrapper"
              className="flex items-center justify-center flex-1 h-1/2 pt-5"
            >
              <img
                alt="login page girl img"
                src={LoginLeft}
                className="h-full w-auto"
              />
            </div>
            <div id="bottomWrapper" className="flex-1 p-8">
              <h2 className="font-bold text-3xl text-white mb-4 font-[Kalam]">
                Mets enfin Allah au centre de ta famille
              </h2>
              <p className="text-white">
                Apprends à ton enfant les indispensables de sa religion
                facilement et rapidement, même s'il débute
              </p>
            </div>
          </div>
          <div id="rightContainer" className="flex-1">
            <div className="h-2/7 w-auto flex items-center justify-center">
              <img src={Img1} className="h-full w-auto ml-16" alt="topImage" />
            </div>
            <div className="w-auto flex items-center justify-center">
              <div className="h-3/7 w-3/5 flex justify-center gap-9 mt-auto">
                <div
                  id="leftIcons"
                  className="min-h-full flex flex-col justify-center gap-6"
                >
                  <div className="flex items-center justify-center">
                    <img src={Img2} alt="vectors" className="w-full h-auto" />
                  </div>
                  <div className="flex items-center justify-center">
                    <img src={Img3} alt="vectors" className="w-full h-auto" />
                  </div>
                  <div className="flex items-center justify-center">
                    <img src={Img4} alt="vectors" className="w-full h-auto" />
                  </div>
                </div>
                <div
                  id="rightIcons"
                  className="min-h-full flex flex-col justify-center gap-6"
                >
                  <div className="flex items-center justify-center">
                    <img src={Img5} alt="vectors" className="w-full h-auto" />
                  </div>
                  <div className="flex items-center justify-center">
                    <img src={Img6} alt="vectors" className="w-full h-auto" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="rightWrapper" className=" w-2/5">
          <Formik
            initialValues={initialValues}
            validationSchema={loginValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form className="mt-8 space-y-6">
                <div className="bg-white p-8 rounded-2xl  space-y-6">
                  {serverError && (
                    <div className="rounded-2xl bg-red-50 p-4 border border-red-200">
                      <div className="flex">
                        <div className="flex-shrink-0"></div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-red-800">
                            {serverError}
                          </h3>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-center">
                    <img alt="right logo" src={Logo} className="block w-2/5" />
                  </div>
                  <h1 className="text-[#6B599C] font-bold text-xl text-center">
                    Log in into your account
                  </h1>

                  <div>
                    <Field
                      type="text"
                      id="username"
                      name="username"
                      className={`block w-full px-4 py-3 rounded-xl border ${
                        errors.username && touched.username
                          ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      } focus:outline-none focus:ring-2 transition-colors`}
                      placeholder="Enter your username"
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="mt-1 text-sm text-red-600"
                    />
                  </div>

                  <div>
                    <Field
                      type="password"
                      id="password"
                      name="password"
                      className={`block w-full px-4 py-3 rounded-xl border ${
                        errors.password && touched.password
                          ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      } focus:outline-none focus:ring-2 transition-colors`}
                      placeholder="Enter your password"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="mt-1 text-sm text-red-600"
                    />
                  </div>

                  <p className="text-[#ED741B] text-[14px] text-center">
                    Forgot Password?
                  </p>

                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-2xl text-white ${
                        isSubmitting
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-[#6B599C] hover:cursor-pointer focus:outline-none transition-colors"
                      }`}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">Signing in...</div>
                      ) : (
                        "Sign in"
                      )}
                    </button>
                  </div>

                  <div className="flex gap-2 justify-center">
                    <p
                      className="inline-block text-[background: #000000;
]"
                    >
                      Don’t have an account?
                    </p>
                    <p className="inline-block text-[#ED741B]">
                      Create Account
                    </p>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
