import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { setTargetElement, getTargetElement } from './common/global'


document.addEventListener( 'DOMContentLoaded', () => {
	'use strict'

	setTimeout(() => {
		showPopup()
	}, 5000);
} )

const showPopup = () => {
	const popupWrapper    = document.querySelector( '.rhino .popup-wrapper' )
	const addPopupWrapper = document.querySelector( '.add-popup-wrapper' )
	const closeButton     = document.querySelector( '.popup-close' )
	const addCloseButton  = document.querySelector( '.add-popup-close' )
	const popButton       = document.querySelector( '.popup-btn' )
	const body            = document.querySelector( 'header')
	const benBtn          = document.querySelectorAll( '.whatsapp-button' )
	setTargetElement( document.querySelector( '#body-lock' ) )

	if( ! popupWrapper ) return

	if ( localStorage.getItem( 'showed' ) ) localStorage.removeItem( 'showed' )

	body.addEventListener( 'mouseleave', e => {
		const mouseY = e.clientY

		if(  mouseY <= 0 ) {

			if(  ! localStorage.getItem( 'showed' ) && ! popupWrapper.classList.contains( 'showed' ) ) {
				localStorage.setItem( 'showed', 1 )
				popupWrapper.classList.add( 'showed' )
				disableBodyScroll( getTargetElement(), { reserveScrollBarGap: true } )
			}
		}
	} )

	closeButton.addEventListener( 'click', () => {
		popupWrapper.classList.remove( 'showed' )
		enableBodyScroll( getTargetElement() )
	} )

	addCloseButton.addEventListener( 'click', () => {
		addPopupWrapper.classList.remove( 'showed' )
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

	popButton.addEventListener( 'click', () => {
		addPopupWrapper.classList.add( 'showed' )
	})

	benBtn.forEach( button => {
		button.addEventListener( 'click', ( e ) => {
			e.preventDefault()
			setTimeout( () => location.href = 'https://api.whatsapp.com/send/?phone=79776378446&text=РИНО', 2000 )
		} )
	} )
}