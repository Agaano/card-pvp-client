import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type CallSliceType = {
	callModal: CallModalFunctionType | null
	callAlert: CallAlertFunctionType | null
	callConfirm: CallConfirmFunctionType | null
	callEventTitle: CallEventTitleFunctionType | null
}

type CallConfirmFunctionType = (
	elem: React.ReactNode | string
) => Promise<boolean>
type CallAlertFunctionType = (elem: React.ReactNode | string) => void
type CallModalFunctionType = (elem: React.ReactNode | string) => () => void
type CallEventTitleFunctionType = (elem: string, delay?: number) => void

const initialState: CallSliceType = {
	callModal: null,
	callAlert: null,
	callConfirm: null,
	callEventTitle: null,
}

const callSlice = createSlice({
	name: 'call',
	initialState,
	reducers: {
		setUnclosable: (state, action: PayloadAction<CallModalFunctionType>) => {
			state.callModal = action.payload
		},
		setAlert: (state, action: PayloadAction<CallAlertFunctionType>) => {
			state.callAlert = action.payload
		},
		setConfirm: (state, action: PayloadAction<CallConfirmFunctionType>) => {
			state.callConfirm = action.payload
		},
		setEventTitle: (
			state,
			action: PayloadAction<CallEventTitleFunctionType>
		) => {
			state.callEventTitle = action.payload
		},
	},
})

export const { setUnclosable, setAlert, setConfirm, setEventTitle } =
	callSlice.actions
export default callSlice.reducer
