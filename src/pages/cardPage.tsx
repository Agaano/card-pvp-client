import Card from '../components/card'

export default () => (
	<div style={{ display: 'flex', columnGap: '15px', padding: '25px' }}>
		<Card
			title='Обычная карта'
			description='Эта карточка наносит урон и накладывает небольшой щит'
			img='image2.jpg'
			rare={0}
			damage={30}
			shield={5}
		/>
		<Card
			title='Редкая карта'
			description='Эта карточка наносит урон и накладывает небольшой щит'
			img='image2.jpg'
			rare={1}
			damage={30}
			shield={5}
		/>
		<Card
			title='Эпическая карта'
			description='Эта карточка наносит урон и накладывает небольшой щит'
			img='image2.jpg'
			rare={2}
			damage={30}
			shield={5}
		/>
		<Card
			title='Легендарная карта'
			description='Эта карточка наносит урон и накладывает небольшой щит'
			img='image2.jpg'
			rare={3}
			damage={30}
			shield={5}
		/>
		<Card
			title='Карточка'
			description='Эта карточка наносит урон и накладывает небольшой щит'
			img='image2.jpg'
			rare={3}
			damage={30}
			shield={5}
			isRotated
		/>
	</div>
	// 0 - basic
	// 1 - rare
	// 2 - epic
	// 3 - legendary
)
