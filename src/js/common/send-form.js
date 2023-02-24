document.addEventListener( 'DOMContentLoaded', () => {
	'use strict'

	submitForm( '.form' )
} )

/**
 * Submit form.
 *
 * @param {String}	selector	Form CSS-selector.
 */
const submitForm = selector => {
	const forms	= document.querySelectorAll( selector )

	if( ! forms.length ) return

	forms.forEach( form => {
		form.addEventListener( 'submit', e => {
			e.preventDefault()

			const formResponse	= form.querySelector( '.form-response' ),
				request		= new XMLHttpRequest(),
				formData	= new FormData( form ),
				formType	= form.dataset.type,
				formTitle	= form.dataset.title,
				isRedirect	= form.dataset.thanksRedirect

			// Add request param for large or small form.
			formData.append( 'func', formType )
			formData.append( 'title', formTitle )
			request.open( 'post', 'send-form.php', true )
			request.responseType = 'json'

			formResponse.classList.remove( ['success', 'error'] )
			formResponse.textContent = 'Обработка...'

			request.addEventListener( 'load', () => {
				if( request.status === 200 ){
					// If success.
					if( request.response.success ){
						form.classList.add( 'success' )
						form.classList.remove( 'error' )
						form.innerHTML = request.response.message
						setTimeout(() => {
							window.location.href = 'thankyou.html'
						}, 1000);

						if( isRedirect ) location.href = 'thankyou-wa-rhino.html'
					}	else {	// If error.
						formResponse.classList.remove( 'success' )
						formResponse.classList.add( 'error' )
						formResponse.textContent = request.response.message
					}
				}	else {
					formResponse.classList.remove( 'success' )
					formResponse.classList.add( 'error' )
					formResponse.textContent = request.response
				}
			} )

			request.send( formData )
		} )
	} )
}