import axios from "axios";
import { toast } from "react-toastify";
import {
  SEND_OTP_REQUEST,
  SEND_OTP_SUCCESS,
  SEND_OTP_FAIL,
  VERIFY_OTP_REQUEST,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAIL,
  // REGISTER_VISITOR_REQUEST,
  // REGISTER_VISITOR_SUCCESS,
  // REGISTER_VISITOR_FAIL,

} from "../types/visitorTypes";

export const makeOtprequest = () => {
  return {
    type: SEND_OTP_REQUEST
  };
};

export const sendOtpSuccess = (data) => {
  return {
    type: SEND_OTP_SUCCESS,
    payload: data
  };
};

export const sendOtpFail = (error) => {
  return {
    type: SEND_OTP_FAIL,
    payload: error
  };
};

export const verifyOtprequest = () => {
  return {
    type: VERIFY_OTP_REQUEST
  };
};

export const verifyOtpSuccess = (data) => {
  return {
    type: VERIFY_OTP_SUCCESS,
    payload: data
  };
};

export const verifyOtpFail = (error) => {
  return {
    type: VERIFY_OTP_FAIL,
    payload: error
  };
};

export const sendOTPAction = (payload) => {
  return (dispatch) => {
    console.log("fff")
    dispatch(makeOtprequest());

    const webApiUrl =
      `${process.env.REACT_APP_API_URL}/api/VMS/sendOTP`;


    const headerObject = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    axios
      .post(webApiUrl, payload, headerObject)
      .then((result) => {
        const resdata = result.data;

        if (resdata.success) {

          toast.success(resdata.message, {
            position: "top-right",
            autoClose: 5000,
            theme: "colored"
          });

          dispatch(sendOtpSuccess(resdata));

        } else {

          toast.error(resdata.message, {
            position: "top-right",
            autoClose: 5000,
            theme: "colored"
          });

          dispatch(sendOtpFail(resdata.message));
        }

      })
      .catch((err) => {
        toast.error("Failed to send OTP", {
          position: "top-right",
          autoClose: 5000,
          theme: "colored"
        });
        dispatch(sendOtpFail(err.message));

      });

  };
};

export const verifyOTPAction = (payload) => {
  return (dispatch) => {
    // console.log("fff")
    dispatch(verifyOtprequest());

    const webApiUrl =
      `${process.env.REACT_APP_API_URL}/api/VMS/verifyOTP`;


    const headerObject = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    axios
      .post(webApiUrl, payload, headerObject)
      .then((result) => {
          // console.log("ffresultresultf",result)
        const resdata = result.data;
  console.log("resdataresdata",resdata)
        if (resdata.success) {

          toast.success(resdata.message, {
            position: "top-right",
            autoClose: 5000,
            theme: "colored"
          });
console.log("resdataresdata",resdata)
          dispatch(verifyOtpSuccess(resdata));

        } else {

          toast.error(resdata.message, {
            position: "top-right",
            autoClose: 5000,
            theme: "colored"
          });

          dispatch(verifyOtpFail(resdata.message));
        }

      })
      .catch((err) => {
        toast.error("Failed to send OTP", {
          position: "top-right",
          autoClose: 5000,
          theme: "colored"
        });
        dispatch(verifyOtpFail(err.message));

      });

  };
};