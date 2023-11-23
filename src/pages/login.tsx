import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginReducer, validateReducer } from '../redux/slices/authSlice'
import store from '../redux/storage'
import styles from '../styles/login.module.scss'
type loginFormType = {
	username: string
	password: string
}

const initialLoginForm: loginFormType = {
	username: '',
	password: '',
}

export default () => {
	const [formData, setFormData] = useState<loginFormType>(initialLoginForm)
	const [errorMessage, setErrorMessage] = useState('')
	const navigate = useNavigate()

	const handleSubmit = (e: any) => {
		e.preventDefault()
		console.log('asdasd')
		if (!formData.password || !formData.username) return
		store.dispatch(loginReducer(formData)).then(action => {
			if (!action.payload.jwt) {
				setErrorMessage(action.payload.message)
				return
			}
			store.dispatch(validateReducer(action.payload.jwt)).then(action => {
				if (!action.payload) return
				console.log(action.payload)
				navigate('/')
			})
		})
	}

	const handleChange = (e: any) => {
		setFormData(prev => {
			return { ...prev, [e.target.name]: e.target.value }
		})
	}

	return (
		<main>
			<form className={styles.form} onSubmit={handleSubmit}>
				<div>
					<p>{errorMessage}</p>
				</div>
				<div className={styles.flex_column}>
					<label>Имя пользователя</label>
				</div>
				<div className={styles.inputForm}>
					<input
						placeholder='Введите ваше имя пользователя'
						name='username'
						className={styles.input}
						type='text'
						onChange={handleChange}
					/>
				</div>
				<div className={styles.flex_column}>
					<label>Пароль</label>
				</div>
				<div className={styles.inputForm}>
					<input
						name='password'
						placeholder='Введи'
						className={styles.input}
						type='password'
						onChange={handleChange}
					/>
				</div>
				<div className={styles.flex_row}>
					<span className={styles.span}>Упс... Забыли пароль?</span>
				</div>
				<button className={styles.button_submit} onClick={handleSubmit}>
					Войти
				</button>
				<p className={styles.p}>
					Вы еще не с нами?????
					<span className={styles.span} onClick={() => navigate('/register')}>
						Зарегистрируйтесь!!
					</span>
				</p>
			</form>
		</main>
	)
}
