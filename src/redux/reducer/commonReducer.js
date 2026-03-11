import {

    GET_DEPARTMENTS_FAIL,
    GET_DEPARTMENTS_SUCCESS,
     GET_DEPARTMENT_EMPLOYEES_REQUEST,
  GET_DEPARTMENT_EMPLOYEES_SUCCESS,
  GET_DEPARTMENT_EMPLOYEES_FAIL,
    GET_DEPARTMENTS_REQUEST,
} from "../types/visitorTypes";

const initialState = {
    loading: false,

    error: null,
    departments: [],
    employees: [],
};



const commonReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_DEPARTMENTS_FAIL:
            return {
                ...state,
                loading: false,
                departments: [],
                error: action.payload
            }
        case GET_DEPARTMENTS_SUCCESS:
            console.log("Departments API Payload:", action.payload);
            return {
                ...state,
                loading: false,
                departments: action.payload
            };
        case GET_DEPARTMENTS_REQUEST:
            return {
                ...state,
                loading: true
            };

             case GET_DEPARTMENT_EMPLOYEES_FAIL:
            return {
                ...state,
                loading: false,
                employees: [],
                error: action.payload
            }
        case GET_DEPARTMENT_EMPLOYEES_SUCCESS:
            console.log("Departments API Payload:", action.payload);
            return {
                ...state,
                loading: false,
                employees: action.payload
            };
        case GET_DEPARTMENT_EMPLOYEES_REQUEST:
            return {
                ...state,
                loading: true
            };

        default:
            return state;
    }
}
export default commonReducer;