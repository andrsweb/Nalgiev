import { isInScope } from "./common/global"

document.addEventListener( 'DOMContentLoaded', () => {
	'use strict'

	showMap()
} )

const showMap = () => {

	const map = document.querySelector( '.iframe' )

	if( ! map ) return

	document.addEventListener( 'scroll', () => {
			if ( isInScope( '.contacts-map', window.scrollY ) ) {
				if( ! map.classList.contains( 'loaded' ) ) {
					map.src= 'https://yandex.ru/map-widget/v1/?um=constructor%3Adf9954187b026a9566f730122635c3da1778dcd385845d729195a961ec86eedd&amp;source=constructor'
					map.classList.add( 'loaded' )
				}
			}
		}
	)
}

