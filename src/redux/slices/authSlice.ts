import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import Cookies from 'js-cookie'

const serverUrl = import.meta.env.VITE_SERVER_URL

type authType = {
	user: UserType | null
	status: string
	token: string | null
}

type UserType = {
	uuid: string
	email: string
	username: string
}

const initialState: authType = {
	user: null,
	status: '',
	token: null,
}
export const loginReducer = createAsyncThunk(
	`userLogin`,
	async ({ username, password }: { username: string; password: string }) => {
		try {
			const response = await axios.post(`${serverUrl}/auth/login`, {
				username,
				password,
			})
			if (response.data.jwt) {
				Cookies.set('token', response.data.jwt)
			}
			return response.data
		} catch (err: any) {
			console.log(err)
		}
	}
)

export const validateReducer = createAsyncThunk(
	'userValidate',
	async (token: string | null) => {
		try {
			const jwt = token ?? Cookies.get('token')
			const response = await axios.post(`${serverUrl}/auth/validate`, { jwt })
			if (response.data.token) {
				Cookies.set('token', response.data.token)
			}
			return response.data
		} catch (err) {
			console.log(err)
		}
	}
)

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: state => {
			Cookies.remove('token')
			;(state.status = 'unauthorized'), (state.token = null)
			state.user = null
		},
	},
	extraReducers: builder => {
		builder.addCase(loginReducer.fulfilled, (state, action) => {
			const { jwt } = action.payload
			if (!jwt) {
				state.status = 'unauthorized'
				state.token = null
				return
			}
			state.status = 'authorized'
			state.token = action.payload.jwt
		})
		builder.addCase(validateReducer.fulfilled, (state, action) => {
			const { username, email, id } = action.payload
			if (!username || !email || !id) return
			state.user = { username, email, uuid: id }
			state.status = 'authorized'
		})
	},
})

export const { logout } = authSlice.actions
export default authSlice.reducer
