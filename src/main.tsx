import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.scss'
import CardPage from './pages/cardPage.tsx'
import Game from './pages/game.tsx'
import Lobby from './pages/lobby.tsx'
import Login from './pages/login.tsx'
import MainMenu from './pages/mainMenu.tsx'
import Register from './pages/register.tsx'
import store from './redux/storage.ts'
import Root from './Root.tsx'

const router = createBrowserRouter([
	{
		path: '/',
		element: <MainMenu />,
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/lobby',
		element: <Lobby />,
	},
	{
		path: '/register',
		element: <Register />,
	},
	{
		path: '/card',
		element: <CardPage />,
	},
	{
		path: '/game',
		element: <Game />,
	},
])

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<Root>
				<RouterProvider router={router} />
			</Root>
		</Provider>
	</React.StrictMode>
)
