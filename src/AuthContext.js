import React, { createContext, useReducer } from 'react';

// Initial state for the authentication
const initialState = {
  user: null,
  isLoggedIn: false,
};

// Create the context
export const AuthContext = createContext(initialState);

// Reducer function to handle state changes
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload.user,
        isLoggedIn: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

// AuthProvider component to wrap the app and provide the context
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Actions to update the state
  const login = (user) => {
    dispatch({ type: 'LOGIN', payload: { user } });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
