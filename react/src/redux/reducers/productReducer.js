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
  GET_DETAILARTICLE_FAIL
} from "../types";

const initialState = {
  message: "",
  error: "",
  products: [],
  drafts: [],
  loading_get: false,
  loading_product: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    // POST ARTICLE
    case PRODUCT_START:
      return { ...state, loading_product: true };
    case PRODUCT_SUCCESS:
      return {
        ...state,
        message: action.message,
        loading_product: false
      };
    case PRODUCT_FAIL:
      return {
        ...state,
        error: action.error,
        loading_product: false
      };
    // GET ARTICLE
    case GET_PRODUCT_START:
      return { ...state, loading_get: true };
    case GET_PRODUCT_SUCCESS:
      return {
        ...state,
        products: action.payload,
        loading_get: false
      };
    case GET_PRODUCT_FAIL:
      return {
        ...state,
        error: action.error,
        loading_get: false
      };
    // GET DRAFTS
    case GET_DRAFTS_START:
      return { ...state, loading_get: true };
    case GET_DRAFTS_SUCCESS:
      return {
        ...state,
        drafts: action.payload,
        loading_get: false
      };
    case GET_DRAFTS_FAIL:
      return {
        ...state,
        error: action.error,
        loading_get: false
      };
    // GET DETAIL ARTICLE
    case GET_DETAILARTICLE_START:
      return { ...state, loading_get: true };
    case GET_DETAILARTICLE_SUCCESS:
      return {
        ...state,
        products: action.payload,
        loading_get: false
      };
    case GET_DETAILARTICLE_FAIL:
      return {
        ...state,
        error: action.error,
        loading_get: false
      };
    default:
      return state;
  }
};
