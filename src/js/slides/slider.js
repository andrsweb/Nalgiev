import Swiper, { Pagination, Navigation } from "swiper"

document.addEventListener( 'DOMContentLoaded', () => {
	'use strict'

	initSimpleSwiper()
} )

const initSimpleSwiper = () => {

	const swiper = new Swiper( '.main-swiper', {

		direction: 'horizontal',
		loop: true,
		slidesPerView: 1,

		breakpoints: {
			320: {
				slidesPerView: 1,
			},
			576: {
				slidesPerView: 1,
			}
		},

		modules: [Pagination, Navigation],

			pagination: {
				el: '.swiper-pagination',
				clickable: true
			},

			navigation: {
				nextEl: '.swiper-next',
				prevEl: '.swiper-prev'
			}
		})
}