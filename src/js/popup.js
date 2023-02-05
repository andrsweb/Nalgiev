import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { setTargetElement, getTargetElement } from './common/global'


document.addEventListener( 'DOMContentLoaded', () => {
	'use strict'

	setTimeout(() => {
		showPopup()
	}, 60000);
} )

const showPopup = () => {
	const popupWrapper    = document.querySelector( '.rhino .popup-wrapper' )
	const closeButton     = document.querySelector( '.popup-close' )
	const body            = document.querySelector( 'header')
	setTargetElement( document.querySelector( '#body-lock' ) )

	if( ! popupWrapper ) return

	if ( localStorage.getItem( 'showed' ) ) localStorage.removeItem( 'showed' )

	if(  ! localStorage.getItem( 'showed' ) && ! popupWrapper.classList.contains( 'showed' ) ) {
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