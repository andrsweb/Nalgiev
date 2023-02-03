//is InScope function for show map when it in scope

let windowHeight = window.innerHeight
export const getWindowHeight = () => windowHeight
export const isInScope = ( elementSelector, st, offset = 0 ) => {
	const element  = document.querySelector( elementSelector )
	if ( ! element) return
	let bodyRect  = document.body.getBoundingClientRect(),
		elemRect  = element.getBoundingClientRect(),
		elemTop    = elemRect.top - bodyRect.top

	if( ! element ) return

	return st >= (elemTop - getWindowHeight() + offset) && st <= (elemTop + element.clientHeight - offset)
}

// variables for body lock

let targetElement

export const getTargetElement = () => targetElement
export const setTargetElement = element => targetElement = element