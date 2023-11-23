import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Hand from '../components/hand'
import Hpbar from '../components/hpbar'
import { useAuth } from '../hooks/useAuth'
import { setLobby } from '../redux/slices/lobbySlice'
import { RootState } from '../redux/storage'
import styles from '../styles/game.module.scss'

export default () => {
	const user = useAuth()
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { lobby } = useSelector((state: RootState) => state.lobby)
	const { socket } = useSelector((state: RootState) => state.socket)
	const { firstTeam, secondTeam } = useMemo(() => {
		const playerIndex = lobby?.battle.players.findIndex(
			(player: any) => player.id === user?.uuid
		)
		const obj: { [key: number]: number } = {
			0: 1,
			1: 0,
			2: 3,
			3: 2,
		}
		const anObj: { [key: number]: number[] } = {
			0: [2, 3],
			1: [2, 3],
			2: [0, 1],
			3: [0, 1],
		}
		return {
			firstTeam: [
				lobby?.battle.players[playerIndex],
				lobby?.battle.players[obj[playerIndex]],
			],
			secondTeam: [
				lobby?.battle.players[anObj[playerIndex][0]],
				lobby?.battle.players[anObj[playerIndex][1]],
			],
		}
	}, [lobby])
	const turn = useMemo(() => {
		if (
			!lobby?.battle ||
			!lobby.battle.players ||
			lobby.battle.players.length === 0
		)
			return false
		return lobby.battle.players.reduce(
			(acc: boolean, cond: any, index: number) => {
				return acc || (cond.id === user?.uuid && lobby?.turn === index)
			},
			false
		)
	}, [lobby])

	useEffect(() => {
		if (!lobby?.battle) {
			navigate('/')
			return
		}
		if (!socket || socket.listeners('').length > 0) {
			return
		}
		socket.on('refresh-battle-state', battle => {
			dispatch(setLobby({ ...lobby, battle: battle }))
		})
	}, [lobby, socket])

	return (
		<main className={styles.main}>
			<section className={styles.team}>
				<PlayerElement player={secondTeam[0]} rotated />
				<PlayerElement player={secondTeam[1]} rotated />
			</section>
			{turn && <button>Завершить ход</button>}
			<section className={styles.team}>
				<PlayerElement player={firstTeam[0]} />
				<PlayerElement player={firstTeam[1]} />
			</section>
		</main>
	)
}

const PlayerElement = ({
	player,
	rotated = false,
}: {
	player: any
	rotated?: boolean
}) => {
	if (rotated)
		return (
			<section>
				<Hand isLeft rotated cards={player.hand} />
				{/* <Buffs buffs={[0, 0, 0]} /> */}
				{player.hp && <Hpbar hp={player.hp} />}
				<span>{player.username}</span>
			</section>
		)
	return (
		<section>
			<span>{player.username}</span>
			<Hpbar hp={player.hp} />
			{/* <Buffs buffs={[0, 0, 0]} /> */}
			{player.hp && <Hand cards={player.hand} />}
		</section>
	)
}
