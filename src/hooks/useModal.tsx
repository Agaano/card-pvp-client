import React, { useRef, useState } from 'react'
export function useModalConfirm(): [
	() => React.ReactNode,
	(elem: React.ReactNode) => Promise<boolean>
] {
	const [windows, setWindows] = useState<React.ReactNode[]>([])
	const call = (elem: React.ReactNode) => {
		let index: number
		setWindows(prev => {
			index = prev.length ?? 0
			const element = outerElement(elem, index)
			return [...prev, element]
		})
		return new Promise<boolean>(resolve => {
			let yesButtonListenerSettedUp = false
			const id = setInterval(() => {
				const yesButton = document.getElementById(`yesButton${index}`)
				const noButton = document.getElementById(`noButton${index}`)
				if (!yesButton || !noButton || yesButtonListenerSettedUp) return
				yesButton.onclick = () => {
					resolve(true)
					setWindows(prev => {
						return removeByIndex(prev, index)
					})
					clearInterval(id)
				}
				noButton.onclick = () => {
					resolve(false)
					setWindows(prev => {
						return removeByIndex(prev, index)
					})
					yesButton.removeEventListener('click', () => {})
					noButton.removeEventListener('click', () => {})
					clearInterval(id)
				}
			}, 100)
		})
	}

	const outerElement = (innerElement: React.ReactNode, index: number) => {
		return (
			<>
				<div className='modal'>
					<div className='modal-content'>
						<p className='question'>{innerElement}</p>
						<div className='buttons'>
							<button
								className='yesButton'
								id={`yesButton${index}`}
								onClick={e => {}}
							>
								Да
							</button>
							<button className='noButton' id={`noButton${index}`}>
								Нет
							</button>
						</div>
					</div>
				</div>
			</>
		)
	}

	const windowsElem = () => (
		<>{windows.length > 0 && windows.map(Window => <>{Window}</>)}</>
	)
	return [windowsElem, call]
}

function removeByIndex(array: Array<any>, index: number) {
	if (index < 0 || index >= array.length) {
		return array
	}

	const newArray = new Array(array.length - 1)
	for (let i = 0; i < index; i++) {
		newArray[i] = array[i]
	}
	for (let i = index + 1; i < array.length; i++) {
		newArray[i - 1] = array[i]
	}

	return newArray
}

export function useModalAlert(): [
	() => React.ReactNode,
	(elem: React.ReactNode | string) => void,
	() => void
] {
	const [windows, setWindows] = useState<React.ReactNode[]>([])
	const ref = useRef<HTMLDivElement | null>(null)

	const call = (elemToPaste: React.ReactNode | string) => {
		setWindows(prev => [...prev, elemToPaste])
	}

	const windowsElement = () => {
		return (
			<>
				{windows.length > 0 &&
					windows.map((window, index) => {
						return (
							<div
								className='modal'
								onClick={(e: any) => {
									if (!ref.current?.contains(e.target)) {
										setWindows(prev => removeByIndex(prev, index))
									}
								}}
							>
								<div ref={ref} className='modal-content'>
									{window}
								</div>
							</div>
						)
					})}
			</>
		)
	}

	const closeAllWindows = () => {
		setWindows([])
	}

	return [windowsElement, call, closeAllWindows]
}

export function useModal(): [
	() => React.ReactNode,
	(elem: React.ReactNode | string) => () => void
] {
	const [windows, setWindows] = useState<React.ReactNode[]>([])
	const ref = useRef<HTMLDivElement | null>(null)

	const call = (elemToPaste: React.ReactNode | string) => {
		let index: number
		setWindows(prev => {
			const curr = [...prev, elemToPaste]
			index = curr.length - 1
			return curr
		})
		return () => {
			setWindows(prev => removeByIndex(prev, index))
		}
	}

	const windowsElement = () => {
		return (
			<>
				{windows.length > 0 &&
					windows.map((window, index) => {
						return (
							<div className='modal' key={index}>
								<div ref={ref} className='modal-content'>
									{window}
								</div>
							</div>
						)
					})}
			</>
		)
	}
	return [windowsElement, call]
}

export function useEventTitle(): [
	() => React.ReactNode,
	(text: string, delay?: number) => void
] {
	const [titles, setTitles] = useState<{ elem: string; delay: number }[]>([])
	const call = (elemToPaste: string, delay?: number) => {
		let index: number
		setTitles(prev => {
			const curr = [...prev, { elem: elemToPaste, delay: delay ?? 3000 }]
			index = curr.length - 1
			return curr
		})
		setTimeout(() => {
			setTitles(prev => removeByIndex(prev, index))
		}, delay ?? 3000)
	}

	const windowsElement = () => {
		return (
			<>
				{titles.length > 0 &&
					titles.map(({ elem, delay }, index) => {
						return (
							<div className='outer-title' key={index}>
								<div
									className='inner-title'
									style={{
										animation: `disappear ${delay + 1}ms `,
										animationIterationCount: 1,
									}}
								>
									{elem}
								</div>
							</div>
						)
					})}
			</>
		)
	}
	return [windowsElement, call]
}
