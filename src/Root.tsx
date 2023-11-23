import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	useEventTitle,
	useModal,
	useModalAlert,
	useModalConfirm,
} from './hooks/useModal'
import { validateReducer } from './redux/slices/authSlice'
import {
	setAlert,
	setConfirm,
	setEventTitle,
	setUnclosable,
} from './redux/slices/callSlice'
import { connect, disconnect } from './redux/slices/socketSlice'
import store, { RootState } from './redux/storage'
export default ({ children }: { children: React.ReactNode }) => {
	const { token, user } = useSelector((state: RootState) => state.auth)
	const { socket } = useSelector((state: RootState) => state.socket)
	const [WindowsModalElement, callModal] = useModal()
	const [WindowsAlertElement, callAlert] = useModalAlert()
	const [WindowsConfirmElement, callConfirm] = useModalConfirm()
	const [WindowsEventTitleElement, callEventTitle] = useEventTitle()
	const dispatch = useDispatch()
	useEffect(() => {
		store.dispatch(validateReducer(token))
	}, [])

	useEffect(() => {
		if (!socket) return
		socket.emit('online', { id: user?.uuid })
	}, [socket])

	useEffect(() => {
		if (!user) {
			dispatch(disconnect())
			return
		}
		dispatch(connect())
	}, [user])

	useEffect(() => {
		dispatch(setUnclosable(callModal))
		dispatch(setAlert(callAlert))
		dispatch(setConfirm(callConfirm))
		dispatch(setEventTitle(callEventTitle))
	}, [callModal])

	return (
		<>
			<WindowsModalElement />
			<WindowsAlertElement />
			<WindowsConfirmElement />
			<WindowsEventTitleElement />
			{children}
		</>
	)
}
