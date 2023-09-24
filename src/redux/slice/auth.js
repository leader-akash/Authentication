import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SignupApi, loginApi } from "../../apis/apis";
import { toast } from "react-toastify";


const initialState = {
    status: 'idle',
    user: (localStorage.getItem('userinfo') && JSON.parse(localStorage.getItem('userinfo')))|| {},
    error: "",
    token: localStorage.getItem("token") || "",
}

export const login = createAsyncThunk('auth/login', async(data, {rejectWithValue}) => {
    try {
        const res = await loginApi(data);
        return res?.data;
    }
    catch (err) {
        console.log('eee', err)
        return rejectWithValue(err)
    }
})

export const signup = createAsyncThunk('auth/signup', (data) => {
    return SignupApi(data).then((res) => {
        return res?.data
    }).catch(err => console.log('userrr-err', err))
})


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        logoutHandler: () => {
            localStorage.clear();
            return {
                user: null,
                token: null,
            }
        }
    },
    extraReducers: (builder) =>  {
        //login 

        builder.addCase(login.pending, (state, action) => {
            state.loading = 'pending'
        })

        builder.addCase(login.fulfilled, (state,action)=>{
            state.token = action.payload?.encodedToken;
                localStorage.setItem("token", state?.token)
                state.user = action.payload?.foundUser;
                localStorage.setItem("userinfo", JSON.stringify(state.user));

                toast.success(`LoggedIn successfully`);
                state.loading = "success";
                state.error = "";
        })

        builder.addCase(login.rejected, (state, action) => {
            state.loading = "rejected";
                state.user = {}
                state.error = action.error.message;
                toast.error("user not found");
        })



        //signup

        builder.addCase(signup.pending, (state,action)=> {
            state.loading = 'pending'
        })

        builder.addCase(signup.fulfilled, (state, action) => {
            state.token = action.payload?.encodedToken;
            localStorage.setItem("token", action.payload.encodedToken);

            state.user = action.payload?.createdUser;
            localStorage.setItem("userinfo", JSON.stringify(state.user));
            toast.success("Loggedin Successfully");
            state.loading = 'success';
            state.error = "";
        })

        builder.addCase(signup.rejected, (state, action) => {
            state.loading = "rejected";
            toast.error("user not found");
            state.user = {};
            state.error = action.error.message
        })

    }
})

export const { logoutHandler } = authSlice.actions;

export default authSlice.reducer


