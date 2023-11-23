import { createSlice } from '@reduxjs/toolkit'
import { io } from 'socket.io-client'

type SocketClientType = ReturnType<typeof io>

type socketSliceType = {
	socket: SocketClientType | null
}

const initialState: socketSliceType = {
	socket: null,
}

const socketSlice = createSlice({
	name: 'socket',
	initialState,
	reducers: {
		connect: state => {
			const serverUrl = import.meta.env.VITE_SERVER_URL
			//@ts-ignore
			state.socket = io(serverUrl)
		},
		disconnect: state => {
			state.socket?.disconnect()
			state.socket = null
		},
	},
})

export const { connect, disconnect } = socketSlice.actions
export default socketSlice.reducer
