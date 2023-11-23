import Card, { CardType } from './card'

export default ({
	cards,
	rotated = false,
	isLeft = false,
}: {
	cards?: CardType[]
	rotated?: boolean
	isLeft?: boolean
}) => {
	return (
		<ul style={{ display: 'flex', padding: '0', justifyContent: 'center' }}>
			{cards &&
				cards.length > 0 &&
				cards.map((card, index) => (
					<Card
						key={index}
						isRotated={rotated}
						{...card}
						style={
							card.isRotated
								? {
										translate: `${
											(isLeft ? cards.length - index - 1 : index) * -40
										}px`,
								  }
								: {
										transform: `translateX(${
											(isLeft ? cards.length - index - 1 : index) * -40
										}px)`,
								  }
						}
					/>
				))}
		</ul>
	)
}
