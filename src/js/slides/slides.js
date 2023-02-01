import { initSwiper } from "../common/global"
import { initVideoSwiper } from "../common/global"
import { initGallerySwiper } from "../common/global"

document.addEventListener( 'DOMContentLoaded', () => {
	'use strict'

	initSwiper( '.main-swiper', 2, 2, '.swiper-next', '.swiper-prev', 2, '.main-pagination' )
	initVideoSwiper( '.video-swiper', 1, 1, '.swiper-next-video', '.swiper-prev-video', 1, '.video-pagination' )
	initGallerySwiper( '.gallery-swiper',  1, '.swiper-next-gallery', '.swiper-prev-gallery', 3)
} )