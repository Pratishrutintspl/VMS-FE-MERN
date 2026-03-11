import {
    SEND_OTP_REQUEST,
    SEND_OTP_SUCCESS,
    SEND_OTP_FAIL,
    VERIFY_OTP_REQUEST,
    VERIFY_OTP_SUCCESS,
    VERIFY_OTP_FAIL,
    //   REGISTER_VISITOR_REQUEST,
    //   REGISTER_VISITOR_SUCCESS,
    //   REGISTER_VISITOR_FAIL,

} from "../types/visitorTypes";

const initialState = {
    loading: false,
    otpSent: false,
    otpVerified: false,
    visitorRegistered: false,
    error: null,

};



const visitorReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_OTP_REQUEST:
            return {
                ...state,
                loading: true
            };

        case SEND_OTP_SUCCESS:
            return {
                ...state,
                loading: false,
                otpSent: true
            };

        case SEND_OTP_FAIL:
            return {
                ...state,
                loading: false,
                otpSent: false,
                error: action.payload
            }

             case VERIFY_OTP_REQUEST:
            return {
                ...state,
                loading: true
            };

        // case VERIFY_OTP_SUCCESS:
        //     return {
        //         ...state,
        //         loading: false,
        //         otpVerified: true
        //     };

        case VERIFY_OTP_FAIL:
            return {
                ...state,
                loading: false,
                otpVerified: false,
                error: action.payload
            }
case VERIFY_OTP_SUCCESS:
   console.log("OTP VERIFIED REDUCER HIT");
  return {
    ...state,
    loading: false,
    otpVerified: true,
    verifyData: action.payload
  };
        default:
            return state;
    }
}
export default visitorReducer;