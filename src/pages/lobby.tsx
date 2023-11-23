import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { SpinnerCircularFixed } from 'spinners-react'
import { setLobby } from '../redux/slices/lobbySlice'
import { RootState } from '../redux/storage'
import styles from '../styles/lobby.module.scss'

export default () => {
	const { lobby } = useSelector((state: RootState) => state.lobby)
	const { socket } = useSelector((state: RootState) => state.socket)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleLeaveLobby = () => {
		socket?.emit('leave-lobby')
		socket?.removeAllListeners()
		dispatch(setLobby(null))
		navigate('/')
	}

	useEffect(() => {
		if (!lobby) navigate('/')
	}, [lobby])

	useEffect(() => {
		if (!lobby?.battle) return
		if (lobby?.battle.firstTeam || lobby?.battle.secondTeam) {
			navigate('/game')
		}
	}, [lobby?.battle])

	useEffect(() => {
		if (!socket || socket.listeners('reload-lobby-info').length > 0) return
		socket.on('reload-lobby-info', lobby => {
			if (lobby.players.length === 4 && !lobby.battle) {
				socket.emit('start-battle', lobby)
			}
			dispatch(setLobby(lobby))
		})
	}, [socket])

	if (!lobby) {
		return (
			<main>
				<SpinnerCircularFixed />
			</main>
		)
	}

	return (
		<main className={styles.main}>
			<div className='container'>
				<p className='lobby_id'>ID лобби: {lobby.id}</p>
				<ul className='lobby_players'>
					{lobby.players.map(player => (
						<li key={player.id} className='lobby_player'>
							{player.username}
						</li>
					))}
				</ul>
				<button onClick={() => handleLeaveLobby()} className='lobby_leave'>
					Покинуть лобби
				</button>
			</div>
		</main>
	)
}
