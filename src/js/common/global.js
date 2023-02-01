// import Swiper, { Pagination, Navigation } from "swiper"

// export const initSimpleSwiper = ( selector, swiperPag, closest, settings ) => {
// 	const swiperEl = document.querySelector( selector )

// 	if( ! swiperEl ) return

// 	const pag = swiperEl.querySelector( swiperPag )
// 	const prev = swiperEl.closest( closest ).querySelector( '.swiper-prev' )
// 	const next = swiperEl.closest( closest ).querySelector( '.swiper-next' )

// 	const defaultSettings = {
// 		slidesPerGroup: 2,
// 		spaceBetween: 30,
// 		loop: true,
// 		modules: [Pagination, Navigation],

// 		pagination: {
// 			el: pag,
// 			clickable: true
// 		},

// 		navigation: {
// 			nextEl: next,
// 			prevEl: prev
// 		},
// 		...settings
// 	}

// 	const swiper = new Swiper( selector, defaultSettings )
// }