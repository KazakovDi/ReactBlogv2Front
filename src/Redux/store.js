import {configureStore} from "@reduxjs/toolkit"

import { authReducer } from "./slices/authSlice"
import { postReducer } from "./slices/postSlice"
import { tagReducer } from "./slices/tagSlice"

const store = configureStore({
    reducer: {
        auth: authReducer,
        post:postReducer,
        tag: tagReducer
    }
})

export default store