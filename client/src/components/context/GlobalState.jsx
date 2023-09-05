import React, { createContext,useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';
const initial={
 transactions : [],
 error: null,
 loading: true
};

export const GlobalContext=createContext(initial);

export const GlobalProvider=({children})=>{
    const [state,dispatch]=useReducer(AppReducer,initial);
    
    async function getTransactions(){
        try{
            const res= await axios.get('/api/v1/transactions');
            
            dispatch({
                type: 'GET_TRANSACTIONS',
                payload: res.data.data
            });
        }catch(err){
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
            });
        }
    }
    async function del(id){
        try{
            await axios.delete(`/api/v1/transactions/${id}`);
        dispatch({
            type:'DEFAULT_TRANSACTION',
            payload:id
        });
    }catch(err){
        dispatch({
            type:'TRANSACTION_ERROR',
            payload:err.response.data.error
        });
    }
    }
    async function addtrans(transaction){
        const config = {
            headers: {
              'Content-Type': 'application/json'
            }
          }
      
          try {
            const res = await axios.post('/api/v1/transactions', transaction, config);
      
            dispatch({
              type: 'ADD_TRANSACTION',
              payload: res.data.data
            });
          } catch (err) {
            dispatch({
              type: 'TRANSACTION_ERROR',
              payload: err.response.data.error
            });
          }
    }

    return(<GlobalContext.Provider value={{
        transactions:state.transactions,
        error: state.error,
        loading: state.loading,
        getTransactions,
        del,
        addtrans
    }}>
        {children}
    </GlobalContext.Provider>);
}
