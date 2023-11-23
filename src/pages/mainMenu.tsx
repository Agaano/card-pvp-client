import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { SpinnerCircularFixed } from 'spinners-react'
import { useAuth } from '../hooks/useAuth'
import { logout } from '../redux/slices/authSlice'
import { setLobby } from '../redux/slices/lobbySlice'
import { RootState } from '../redux/storage'
import styles from '../styles/mainMenu.module.scss'
export default () => {
	const user = useAuth()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { socket } = useSelector((state: RootState) => state.socket)
	const { callModal, callAlert, callEventTitle } = useSelector(
		(state: RootState) => state.call
	)
	const handleLogout = () => {
		dispatch(logout())
	}

	const findLobby = () => {
		console.log(callModal)
		if (callModal) {
			socket?.emit('find-lobby')
			const closeModal = callModal(
				<SpinnerCircularFixed
					size={63}
					thickness={180}
					speed={98}
					color='rgba(172, 120, 57, 1)'
					secondaryColor='rgba(172, 97, 57, 0)'
				/>
			)
			socket?.on('lobby-not-found', () => {
				socket.removeListener('lobby-found')
				socket.removeListener('lobby-not-found')
				closeModal()
			})
			socket?.on('lobby-found', lobby => {
				socket.removeListener('lobby-found')
				socket.removeListener('lobby-not-found')
				closeModal()
				dispatch(setLobby(lobby))
				navigate('/lobby')
			})
		}
	}
	const createLobby = () => {
		if (!socket) return
		socket.emit('create-lobby')
		socket.on('lobby-not-created', () => {
			callAlert?.(
				'Что то пошло не так во время попытки создать лобби... Попробуйте снова'
			)
			socket.removeListener('lobby-created')
			socket.removeListener('lobby-not-created')
			return
		})
		socket.on('lobby-created', lobby => {
			socket.removeListener('lobby-created')
			socket.removeListener('lobby-not-created')
			dispatch(setLobby(lobby))
			navigate('/lobby')
		})
	}

	return (
		<main className={styles.main}>
			{!!user && (
				<div className={`container ${styles.container}`}>
					<p>{user.username}</p>
					{!!socket || !!user ? (
						<div className='marker basic' />
					) : (
						<div className='marker legendary' />
					)}
				</div>
			)}
			<div className={styles.buttons}>
				{!user && (
					<button onClick={() => navigate('/login')}>Войти в аккаунт</button>
				)}
				<button disabled={!user} onClick={findLobby}>
					Присоединиться к игре
				</button>
				<button disabled={!user} onClick={createLobby}>
					Создать игру
				</button>
				<button>Настройки</button>
				{!!user && <button onClick={handleLogout}>Выйти из аккаунта</button>}
				<button>Выход</button>
			</div>
		</main>
	)
}
