import axios from "axios";
import { toast } from "react-toastify";
import {
  GET_DEPARTMENTS_FAIL,
  GET_DEPARTMENTS_SUCCESS,
  GET_DEPARTMENTS_REQUEST,
  GET_DEPARTMENT_EMPLOYEES_REQUEST,
  GET_DEPARTMENT_EMPLOYEES_SUCCESS,
  GET_DEPARTMENT_EMPLOYEES_FAIL
} from "../types/visitorTypes";



export const getDepartmentRequest = () => {
  return {
    type: GET_DEPARTMENTS_REQUEST,
  }
}
export const getDepartmentSuccess = (data) => {
  return {
    type: GET_DEPARTMENTS_SUCCESS,
    payload: data
  }
}
export const getDepartmentFail = (error) => {
  return {
    type: GET_DEPARTMENTS_FAIL,
    payload: error
  }
}

export const getDepartmentEmployeeRequest = () => {
  return {
    type: GET_DEPARTMENT_EMPLOYEES_REQUEST,
  }
}
export const getDepartmenEmployeeSuccess = (data) => {
  return {
    type: GET_DEPARTMENT_EMPLOYEES_SUCCESS,
    payload: data
  }
}
export const getDepartmentEmployeeFail = (error) => {
  return {
    type: GET_DEPARTMENT_EMPLOYEES_FAIL,
    payload: error
  }
}


export const getDepartment = () => {
     console.log("oooooooook")
  return (dispatch) => {
    dispatch(getDepartmentRequest())
    const webApiUrl = `${process.env.REACT_APP_API_URL}/api/VMS/department`
console.log("webApiUrl",webApiUrl)
    console.log("here")
    axios
    .get(webApiUrl)
    .then((result)=>{
      console.log("oooooooook222")
        console.log("result",result)
      const resData = result.data;
      console.log(resData)
               
    console.log("here1")
      if(result){
         toast.success(resData.message, {
            position: "top-right",
            autoClose: 5000,
            theme: "colored"
          });
          dispatch(getDepartmentSuccess(resData.data))
          
    console.log("here2")
      }else{
        
          toast.error(resData.message, {
            position: "top-right",
            autoClose: 5000,
            theme: "colored"
          });
          dispatch(getDepartmentFail(resData.message))
      }


    })
     .catch((err) => {
        toast.error("Failed to send OTP", {
          position: "top-right",
          autoClose: 5000,
          theme: "colored"
        });
        dispatch(getDepartmentFail(err.message));

      });

  }
}

export const getDepartmentwiseEmployee = (deptId)=>{
    return(dispatch)=>{
        dispatch(getDepartmentEmployeeRequest)

        const webApiUrl = `${process.env.REACT_APP_API_URL}/api/VMS/getEmployees/${deptId}`
    axios
    .get(webApiUrl)
    .then((result)=>{
        console.log(result)
        const resData = result.data;
        console.log(resData)
 if(result.status==200){
         toast.success(resData.message, {
            position: "top-right",
            autoClose: 5000,
            theme: "colored"
          });
          dispatch(getDepartmenEmployeeSuccess(resData.data))
          
    console.log("here2")
      }else{
        
          toast.error(resData.message, {
            position: "top-right",
            autoClose: 5000,
            theme: "colored"
          });
          dispatch(getDepartmentEmployeeFail(resData.message))
      }


    })
     .catch((err) => {
        toast.error("Failed to send OTP", {
          position: "top-right",
          autoClose: 5000,
          theme: "colored"
        });
        dispatch(getDepartmentEmployeeFail(err.message));

      });

  }
}