import {
  PRODUCT_START,
  PRODUCT_SUCCESS,
  PRODUCT_FAIL,
  GET_PRODUCT_START,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAIL,
  GET_DRAFTS_START,
  GET_DRAFTS_SUCCESS,
  GET_DRAFTS_FAIL,
  GET_DETAILARTICLE_START,
  GET_DETAILARTICLE_SUCCESS,
  GET_DETAILARTICLE_FAIL,
  NETWORK
} from "../types";
import { createError, createMessage } from "./alertAction";
import axios from "axios";

export const postProduct = data => dispatch => {
  dispatch({
    type: PRODUCT_START
  });
  const token = localStorage.getItem("token");
  token !== null
    ? (axios.defaults.headers = {
        "Content-Type": "application/json",
        "x-access-token": `${token}`
      })
    : (axios.defaults.headers = {
        "Content-Type": "application/json"
      });
  axios
    .post(`${NETWORK}/list`, data)
    .then(res => {
      // console.log(res.data);

      dispatch({
        type: PRODUCT_SUCCESS
        // message: res.data
      });
      dispatch(createMessage({ message: res.data.message }));
    })
    .catch(error => {
      dispatch({
        type: PRODUCT_FAIL,
        error: error.response.data.error
      });
      dispatch(createError({ error: error.response.data.error }));
    });
};

export const putProduct = (data, PID) => dispatch => {
  dispatch({
    type: PRODUCT_START
  });
  const token = localStorage.getItem("token");
  token !== null
    ? (axios.defaults.headers = {
        "Content-Type": "application/json",
        "x-access-token": `${token}`
      })
    : (axios.defaults.headers = {
        "Content-Type": "application/json"
      });
  axios
    .put(`${NETWORK}/detail/${PID}/`, data)
    .then(res => {
      // console.log(res.data);

      dispatch({
        type: PRODUCT_SUCCESS
        // message: res.data
      });
      dispatch(createMessage({ message: res.data.message }));
    })
    .catch(error => {
      dispatch({
        type: PRODUCT_FAIL,
        error: error.response.data.error
      });
      dispatch(createError({ error: error.response.data.error }));
    });
};

export const publishProduct = PID => dispatch => {
  dispatch({
    type: PRODUCT_START
  });
  const token = localStorage.getItem("token");
  token !== null
    ? (axios.defaults.headers = {
        "Content-Type": "application/json",
        "x-access-token": `${token}`
      })
    : (axios.defaults.headers = {
        "Content-Type": "application/json"
      });
  axios
    .post(`${NETWORK}/detail/${PID}/`)
    .then(res => {
      // console.log(res.data);

      dispatch({
        type: PRODUCT_SUCCESS
        // message: res.data
      });
      dispatch(getAdminArticles());
      dispatch(createMessage({ message: res.data.message }));
    })
    .catch(error => {
      dispatch({
        type: PRODUCT_FAIL,
        error: error.response.data.error
      });
      dispatch(createError({ error: error.response.data.error }));
    });
};

export const getProduct = () => dispatch => {
  // application/octet-stream
  dispatch({
    type: GET_PRODUCT_START
  });
  axios
    .get(`${NETWORK}/list`)
    .then(response => {
      // console.log(response.data);

      dispatch({
        type: GET_PRODUCT_SUCCESS,
        payload: response.data.list
      });
    })
    .catch(error => {
      dispatch({
        type: GET_PRODUCT_FAIL,
        error: error.response.data.error
      });
      dispatch(createError({ error: error.response.data.error }));
    });
};

// export const postProduct = data => dispatch => {
//   dispatch({
//     type: PRODUCT_START
//   });
//   const token = localStorage.getItem("token");
//   token !== null
//     ? (axios.defaults.headers = {
//         "Content-Type": "application/json",
//         "x-access-token": `${token}`
//       })
//     : (axios.defaults.headers = {
//         "Content-Type": "application/json"
//       });
//   axios
//     .post(`${NETWORK}/product`, data)
//     .then(res => {
//       dispatch({
//         type: PRODUCT_SUCCESS,
//         message: res.data
//       });
//     })
//     .catch(error => {
//       dispatch({
//         type: PRODUCT_FAIL,
//         error: error.response.data.error
//       });
//       dispatch(createError({ error: error.response.data.error }));
//     });
// };

export const getAdminArticles = () => dispatch => {
  // application/octet-stream
  dispatch({
    type: GET_DRAFTS_START
  });
  const token = localStorage.getItem("token");
  token !== null
    ? (axios.defaults.headers = {
        "Content-Type": "application/json",
        "x-access-token": `${token}`
      })
    : (axios.defaults.headers = {
        "Content-Type": "application/json"
      });
  axios
    .get(`${NETWORK}/list`)
    .then(response => {
      // console.log(response.data);

      dispatch({
        type: GET_DRAFTS_SUCCESS,
        payload: response.data.list
      });
    })
    .catch(error => {
      dispatch({
        type: GET_DRAFTS_FAIL,
        error: error.response.data.error
      });
      dispatch(createError({ error: error.response.data.error }));
    });
};

export const getDetailArticle = PID => dispatch => {
  // application/octet-stream
  dispatch({
    type: GET_DETAILARTICLE_START
  });
  axios
    .get(`${NETWORK}/detail/${PID}/`)
    .then(response => {
      // console.log(response.data);

      dispatch({
        type: GET_DETAILARTICLE_SUCCESS,
        payload: response.data.article
      });
    })
    .catch(error => {
      if (typeof error.response.data.error === "undefined") {
        dispatch({
          type: GET_DETAILARTICLE_FAIL,
          error: error.response.data
        });
        return dispatch(createError({ error: error.response.data }));
      }
      dispatch({
        type: GET_DETAILARTICLE_FAIL,
        error: error.response.data.error
      });
      dispatch(createError({ error: error.response.data.error }));
    });
};
