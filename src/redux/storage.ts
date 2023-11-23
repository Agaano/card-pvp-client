import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import callSlice from './slices/callSlice'
import lobbySlice from './slices/lobbySlice'
import socketSlice from './slices/socketSlice'

const rootReducer = combineReducers({
	auth: authSlice,
	socket: socketSlice,
	call: callSlice,
	lobby: lobbySlice,
})
export type RootState = ReturnType<typeof rootReducer>

const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware => {
		return getDefaultMiddleware({
			serializableCheck: false,
		})
	},
})

export default store
