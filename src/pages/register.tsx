import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../styles/login.module.scss'

type registerFormType = {
	username: string
	email: string
	password: string
	confirmPassword: string
}

const initialRegisterForm: registerFormType = {
	username: '',
	email: '',
	password: '',
	confirmPassword: '',
}

export default () => {
	const [formData, setFormData] =
		useState<registerFormType>(initialRegisterForm)
	const [errorMessage, setErrorMessage] = useState('')
	const navigate = useNavigate()
	const serverUrl = import.meta.env.VITE_SERVER_URL

	const handleSubmit = async (e: any) => {
		e.preventDefault()
		const { username, email, password, confirmPassword } = formData
		if (password !== confirmPassword) {
			setErrorMessage('Пароли не совпадают')
			return
		}
		const response = await axios.post(`${serverUrl}/auth/register`, {
			username,
			email,
			password,
		})
		if (response.data.username) {
			setFormData(initialRegisterForm)
			navigate('/login')
		} else if (!!response.data.message) {
			setErrorMessage(response.data.message)
		}
	}

	const handleChange = (e: any) => {
		setFormData(prev => {
			return { ...prev, [e.target.name]: e.target.value }
		})
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<div>
				<p style={{ color: 'red' }}>{errorMessage}</p>
			</div>
			<div className={styles.flex_column}>
				<label>Имя пользователя</label>
			</div>
			<div className={styles.inputForm}>
				<input
					placeholder='Введите ваше имя пользователя'
					name='username'
					value={formData.username}
					className={styles.input}
					type='text'
					onChange={handleChange}
				/>
			</div>
			<div className={styles.flex_column}>
				<label>Еmail</label>
			</div>
			<div className={styles.inputForm}>
				<input
					name='email'
					placeholder='Введите почту'
					value={formData.email}
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
					value={formData.password}
					placeholder='Повторите пароль'
					className={styles.input}
					type='password'
					onChange={handleChange}
				/>
			</div>
			<div className={styles.flex_column}>
				<label>Пароль</label>
			</div>
			<div className={styles.inputForm}>
				<input
					name='confirmPassword'
					value={formData.confirmPassword}
					placeholder='Введите пароль'
					onChange={handleChange}
					className={styles.input}
					type='password'
				/>
			</div>
			<div className={styles.flex_row}>
				<span className={styles.span}>Упс... Забыли пароль?</span>
			</div>
			<button className={styles.button_submit}>Войти</button>
			<p className={styles.p}>
				Вы еще не с нами?????
				<span className={styles.span}>Зарегистрируйтесь!!</span>
			</p>
		</form>
	)
}
