import { createSlice,  createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../axios"
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
    error: null,
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
        },
        [fetchTags.rejected]: state=> {
            state.data = null
            state.status = "error"
        }
    }})
export const selectIsTagsLoaded = state => Boolean(state.tag.data)
export const selectTags = state => state.tag.data
export const tagReducer = tagSlice.reducer
