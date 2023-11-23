import { useSelector } from 'react-redux'
import { RootState } from '../redux/storage'

export function useAuth() {
	const { user } = useSelector((state: RootState) => state.auth)
	if (!user) return
	return user
}
