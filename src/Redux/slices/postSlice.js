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


const initialState = {
    data: null,
    currentPost: null,
    error: "",
    status: "loading",
    filter: {
        sortProps: "createdAt",
        searchProps: undefined
    }
}
const postSlice = createSlice({
    name: "post",
    error: null,
    initialState,
    reducers: {
        changeFilterProps: (state, action) => {
            if(action.payload.sortProps)
                state.filter.sortProps = action.payload?.sortProps
            if(action.payload.searchProps || action.payload.searchProps === "")
                state.filter.searchProps = action.payload.searchProps
        }
    },
    extraReducers: {
        [fetchSinglePost.pending]: state=> {
            state.data = null
            state.status = "loading"
        },
        [fetchSinglePost.fulfilled]: (state, action)=> {
            state.data = action.payload
            state.status = "loaded"
            state.error = null
        },
        [fetchSinglePost.rejected]: (state, action)=> {
            state.data = null
            state.status = "error"
            state.error = action.error.message
        },
        [fetchPosts.pending]: state=> {
            state.data = null
            state.status = "loading"
            state.error = null
        },
        [fetchPosts.fulfilled]: (state, action)=> {
            state.data = action.payload
            state.status = "loaded"
        },
        [fetchPosts.rejected]: (state,action)=> {
            state.data = null
            state.status = "error"
            state.error = action.error.message
        },
        [fetchDeletePost.fulfilled]: (state, action)=> {
            state.data = action.payload
            state.status = "loaded"
        }
    }})
export const {setPostError, clearErrors, changeFilterProps} = postSlice.actions
export const selectIsPostLoaded = state => Boolean(state.post.data)
export const selectPosts = state => state.post.data
export const postReducer = postSlice.reducer
