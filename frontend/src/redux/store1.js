import {create} from 'zustand'; 
//library to create a custom hook 

export const useAuthStore = create((set) => ({               //set function is used to update the state managed by the hook.
    auth : {
        username : '',
        active : false
    },
    setUsername : (name) => set((state) => ({ auth : { ...state.auth, username : name }})) 
}))