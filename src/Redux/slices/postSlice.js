import { createSlice,  createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../axios"
export const fetchSinglePost = createAsyncThunk("post/fetchSinglePost", async (id, thunkAPI)=> {
    try {
        const {data} = await axios.get(`/posts/${id}`)
        return data
    } catch(err) {
        return Promise.reject(err.response.data)
    }
    
})
export const fetchPosts = createAsyncThunk("post/fetchPosts", async (params, thunkAPI)=> {
    try {
        const {data} = await axios.get(`/posts/?sortProps=${params.sortProps}&searchProps=${params.searchProps}`)
        return data
    } catch(err) {
        return Promise.reject(err.response.data)
    }
    
})
export const fetchDeletePost = createAsyncThunk("post/fetchDeletePost", async params => {
    try {
        const {data} = await axios.delete(`/posts/${params.id}/?sortProps=${params.sortProps}&searchProps=${params.searchProps}`)
        return data
    } catch(err) {
        return Promise.reject(err.response)
    }
    
})
export const fetchTags = createAsyncThunk("post/fetchTags", async ()=> {
    try {
        const {data} = await axios.get(`/tags`)
        return data
    } catch(err) {
        return Promise.reject(err.response)
    }
    
})

const initialState = {
    data: null,
    currentPost: null,
    error: "",
    status: "loading"
}
const postSlice = createSlice({
    name: "post",
    error: null,
    initialState,
    reducers: {
        setPostError: (state, action)=> {
            state.error = action.payload
        },
        clearErrors: (state, action)=> {
            state.error = null
        }
    },
    extraReducers: {
        [fetchSinglePost.pending]: state=> {
            state.currentPost = null
            state.status = "loading"
        },
        [fetchSinglePost.fulfilled]: (state, action)=> {
            state.currentPost = action.payload
            state.status = "loaded"
        },
        [fetchSinglePost.rejected]: (state, action)=> {
            state.currentPost = null
            state.status = "error"
        },
        [fetchPosts.pending]: state=> {
            state.data = null
            state.status = "loading"
        },
        [fetchPosts.fulfilled]: (state, action)=> {
            state.data = action.payload
            state.status = "loaded"
        },
        [fetchPosts.rejected]: (state,action)=> {
            state.data = null
            state.status = "error"
        },
        [fetchDeletePost.fulfilled]: (state, action)=> {
            state.data = action.payload
            state.status = "loaded"
        }
    }})
export const {setPostError, clearErrors} = postSlice.actions
export const selectIsPostLoaded = state => Boolean(state.post.data)
export const selectPosts = state => state.post.data
export const postReducer = postSlice.reducer
