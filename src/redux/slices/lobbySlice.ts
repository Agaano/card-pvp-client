import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type lobbySliceType = {
	lobby: LobbyType | null
}

type LobbyType = {
	id: string
	status: string
	players: PlayerType[]
	turn: number
	battle: any
}

type PlayerType = {
	id: string
	username: string
}

const initialState: lobbySliceType = {
	lobby: null,
}

const lobbySlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setLobby: (state, action: PayloadAction<LobbyType | null>) => {
			state.lobby = action.payload
		},
		addPlayer: (state, action: PayloadAction<PlayerType>) => {
			state.lobby?.players.push(action.payload)
		},
	},
})

export const { setLobby, addPlayer } = lobbySlice.actions
export default lobbySlice.reducer
