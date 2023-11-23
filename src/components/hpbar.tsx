export default ({ hp }: { hp: number }) => {
	return (
		<div
			style={{
				overflow: 'hidden',
				width: '50%',
				background: '#290003',
				border: '1px solid #4d0005',
				height: '25px',
				borderRadius: '6px',
			}}
		>
			<div
				style={{
					width: `${hp ?? 0}%`,
					background: '#4d0005',
					border: '1px solid #f00',
					height: '100%',
					borderRadius: '6px 0 0 6px ',
					transition: 'width 0.3s ease',
				}}
			/>
		</div>
	)
}
