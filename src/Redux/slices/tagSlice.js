import { createSlice,  createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../axios"
export const fetchTags = createAsyncThunk("post/fetchTags", async ()=> {
    try {
        const {data} = await axios.get(`/tags`)
        return data
    } catch(err) {
        return Promise.reject(err.response.data)
    }
    
})
const initialState = {
    data: null,
    error: "",
    status: "loading"
}
const tagSlice = createSlice({
    name: "tag",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchTags.pending]: state=> {
            state.data = null
            state.status = "loading"
        },
        [fetchTags.fulfilled]: (state, action)=> {
            state.data = action.payload
            state.status = "loaded"
            state.error = null
        },
        [fetchTags.rejected]: (state, action)=> {
            state.data = null
            state.status = "error"
            state.error = action.error.message
        }
    }})
export const selectIsTagsLoaded = state => Boolean(state.tag.data)
export const selectTags = state => state.tag.data
export const tagReducer = tagSlice.reducer
