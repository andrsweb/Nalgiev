import Swiper, { Pagination, Navigation } from "swiper"

document.addEventListener( 'DOMContentLoaded', () => {
	'use strict'

	initSwiper( '.main-swiper', 2, 2, '.swiper-next', '.swiper-prev', 2, '.main-pagination' )
	initVideoSwiper( '.video-swiper', 1, 1, '.swiper-next-video', '.swiper-prev-video', 1, '.video-pagination' )
} )

const initSwiper = (slider, num, group, next, prev, slides, pag ) => {

	const swiper = new Swiper(slider, {

		direction: 'horizontal',
		loop: true,
		slidesPerView: num,
		slidesPerGroup: group,
		breakpoints: {
			320: {
				slidesPerView: 1,
			},
			576: {
				slidesPerView: slides,
			}
		},

		modules: [Pagination, Navigation],

			pagination: {
				el: pag,
				clickable: true,
			},

			navigation: {
				nextEl: next,
				prevEl: prev
			}
		})
}

const initVideoSwiper = (slider, num, group, next, prev, slides, pag ) => {

	const swiper = new Swiper(slider, {

		direction: 'horizontal',
		loop: true,
		slidesPerView: num,
		slidesPerGroup: group,
		breakpoints: {
			320: {
				slidesPerView: 1,
			},
			576: {
				slidesPerView: slides,
			}
		},

		modules: [Pagination, Navigation],

			pagination: {
				el: pag,
				clickable: true,
				renderBullet: function (index, className) {
					return '<span class="' + className + '">' + (index + 1) + "</span>";
				},
			},

			navigation: {
				nextEl: next,
				prevEl: prev
			}
		})
}