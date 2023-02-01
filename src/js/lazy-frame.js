import lazyframe from "lazyframe"

document.addEventListener( 'DOMContentLoaded', () => {
	'use strict'

	lazy()
	removePlayButton()
} )

const lazy = () => {
	let elements = document.querySelectorAll( '.frame' )

	lazyframe(elements, {
		debounce: 1000,
		lazyload: true,
		autoplay: true
	})
}

const removePlayButton = () => {
	const wrapper = document.querySelectorAll( '.frame-wrapper')

	if( ! wrapper ) return

	wrapper.forEach( item => {

		item.addEventListener( 'click', () => {
			if( ! item.classList.contains( 'played' ) ) {
				item.classList.add( 'played' )
			}
		} )
	} )
}