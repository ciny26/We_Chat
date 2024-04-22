import { createContext, useState, useEffect, useContext, useReducer } from "react";
import { AuthContext } from "../AuthContext";

//Reducer function for useReducer


export const ChatContext = createContext();
export const ChatContextProvider = ({ children }) => {
    const currentUser = useContext(AuthContext)
    const INITIAL_STATE = {
        chatId:"null",
        user:{}
    }
    
    const chatReducer = (state , action)=>{
        switch (action.type) {
            case "CHANGE_USER":
                return{
                    chatId:
                        currentUser.uid > action.payload.uid ?
                            currentUser.uid + action.payload.uid :
                            action.payload.uid + currentUser.uid ,
                    user: 
                        action.payload 
                }
                
            default:state
                break;
        }
    }

    const [state , dispatch] = useReducer(chatReducer , INITIAL_STATE)

    return (
      <ChatContext.Provider value={{data:state , dispatch}}>
        {children}
      </ChatContext.Provider>
    );
  };