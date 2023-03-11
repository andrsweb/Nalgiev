import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { setTargetElement, getTargetElement } from './common/global'


document.addEventListener( 'DOMContentLoaded', () => {
	'use strict'

	setTimeout( showPopup, 60000 )

	if ( ! header ) return

	header.addEventListener( 'mouseleave', e => {
		const mouseY = e.clientY

		
		setTimeout(() => {
			if(  mouseY <= 0 ) {} showPopup()
		}, 10000)
		
	} )
} )

let popupWrapper = document.querySelector( '.rhino .popup-wrapper' )
let closeButton  = document.querySelector( '.popup-close' )
const header     = document.querySelector( 'header')

if ( localStorage.getItem( 'showed' ) ) localStorage.removeItem( 'showed' )

const showPopup = () => {

	if( ! popupWrapper ) return

	setTargetElement( document.querySelector( '#body-lock' ) )

	if( ! localStorage.getItem( 'showed' ) && ! popupWrapper.classList.contains( 'showed' ) ) {
		localStorage.setItem( 'showed', 1 )
		popupWrapper.classList.add( 'showed' )
		disableBodyScroll( getTargetElement(), { reserveScrollBarGap: true } )
	}

	closeButton.addEventListener( 'click', () => {
		popupWrapper.classList.remove( 'showed' )
		enableBodyScroll( getTargetElement() )
	} )

	popupWrapper.addEventListener( 'click', e => {
		e.stopPropagation()

		const target = e.target

		if ( target.className && target.classList.contains( 'popup-wrapper' ) ) {
			popupWrapper.classList.remove( 'showed' )
			enableBodyScroll( getTargetElement() )
		}
	} )
}