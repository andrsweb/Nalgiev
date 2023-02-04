
import Swiper, { Pagination, Navigation } from "swiper"

export const initSwiper = (slider, num, group, next, prev, slides, pag ) => {

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

export const initGallerySwiper = (slider, num, next, prev, slides ) => {

	const swiper = new Swiper(slider, {

		direction: 'horizontal',
		loop: true,
		slidesPerView: num,
		spaceBetween: 26,
		breakpoints: {
			320: {
				slidesPerView: 1,
			},
			992: {
				slidesPerView: slides,
			}
		},

		modules: [Navigation],

			navigation: {
				nextEl: next,
				prevEl: prev
			}
		})
}

export const initVideoSwiper = (slider, num, group, next, prev, slides, pag ) => {

	const swiper = new Swiper(slider, {

		direction: 'horizontal',
		loop: false,
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
