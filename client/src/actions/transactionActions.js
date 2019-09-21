import {
  GET_TRANSACTIONS,
  ADD_TRANSACTION,
  DELETE_TRANSACTION,
  ITEMS_LOADING
} from "./types";
import axios from "axios";
import { tokenConfig } from "./authActions";

export const getTransactions = () => dispatch => {
  dispatch(setItemsLoading());
  axios.get("/api/transactions").then(res =>
    dispatch({
      type: GET_TRANSACTIONS,
      payload: res.data
    })
  );
};

export const addTransaction = transaction => (dispatch, getState) => {
  axios
    .post("/api/transactions", transaction, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_TRANSACTION,
        payload: res.data
      })
    );
};

export const deleteTransaction = id => (dispatch, getState) => {
  axios.delete(`/api/transactions/${id}`, tokenConfig(getState)).then(res =>
    dispatch({
      type: DELETE_TRANSACTION,
      payload: id
    })
  );
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};
