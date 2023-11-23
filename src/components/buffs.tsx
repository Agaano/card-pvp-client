export default ({ buffs }: { buffs: any[] }) => {
	return (
		<div
			style={{
				width: '50%',
				display: 'flex',
				columnGap: '5px',
				marginBlock: '5px',
			}}
		>
			{buffs.length > 0 && buffs.map(buff => <div className='marker som' />)}
		</div>
	)
}
