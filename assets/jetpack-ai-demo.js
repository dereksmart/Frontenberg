wp.domReady( () => {
	// Prevents the "changes you made may not be saved" message.
	window.addEventListener( 'beforeunload', function( event) {
		event.stopImmediatePropagation();
	} );

	// wp.data &&
	// wp.data.select( 'core/edit-post' ).isFeatureActive( 'welcomeGuide' ) &&
	// wp.data.dispatch( 'core/edit-post' ).toggleFeature( 'welcomeGuide' );

	wp.data.dispatch( 'core/edit-post' ).removeEditorPanel( 'post-status' );
	wp.data.dispatch( 'core/edit-post' ).removeEditorPanel( 'last-revision' );
	wp.data.dispatch( 'core/edit-post' ).removeEditorPanel( 'featured-image' );
	wp.data.dispatch( 'core/edit-post' ).removeEditorPanel( 'post-excerpt' );
	wp.data.dispatch( 'core/edit-post' ).removeEditorPanel( 'taxonomy-panel-category' );
	wp.data.dispatch( 'core/edit-post' ).removeEditorPanel( 'taxonomy-panel-post_tag' );
	wp.data.dispatch( 'core/edit-post' ).removeEditorPanel( 'discussion-panel' );

	wp.data.dispatch( 'core/edit-post' ).openGeneralSidebar( 'edit-post/block' );
	wp.data.dispatch( 'core/edit-post' ).closeGeneralSidebar();

	// Setting this stuff behind a timeout is mega hack.
	setTimeout(function() {
		/* Hack the welcome modal. */
		var picture = document.querySelector('.edit-post-welcome-guide__image');
		if( picture ) {
			var source = picture.querySelector( 'source' );
			var img = picture.querySelector( 'img' );
			source.setAttribute( 'srcset', 'https://jetpackme.files.wordpress.com/2023/06/jetpack-ai-assistant-1899402515-e1686745515327.jpg' );
			img.setAttribute( 'src', 'https://jetpackme.files.wordpress.com/2023/06/jetpack-ai-assistant-1899402515-e1686745515327.jpg' );
		}
		var modalNext = document.querySelector( '.components-guide__forward-button' );
		if ( modalNext ) {
			modalNext.innerText = 'Get started';
			modalNext.onclick = function() {
				wp.data.dispatch( 'core/edit-post' ).toggleFeature( 'welcomeGuide' );
			}
		}
		var heading = document.querySelector( '.edit-post-welcome-guide__heading' );
		var text = document.querySelector( '.edit-post-welcome-guide__text' );
		if ( heading ) {
			heading.innerText = 'Welcome to the Jetpack AI Assistant!';
		}
		if ( text ) {
			text.innerText = 'Where you can try out the new Jetpack AI Assistant in a sandbox space.\n\n' +
				'Make this post your own!\n\n';
		}
		/* End welcome modal hack */

		// Hide things.
		jQuery( '.components-guide__page-control' ).hide();
		jQuery( '.block-editor-post-preview__dropdown' ).hide();

		// Hijack the publish button to open to the Jetpack AI checkout page
		const buyButton = jQuery( '.editor-post-publish-button' );
		if ( buyButton.length ) {
			buyButton.text( 'Buy Jetpack AI' );
			buyButton.on( 'click', function( event ) {
				event.preventDefault();
				window.location.href = 'https://wordpress.com/checkout/jetpack/jetpack_ai_monthly';
			} );
		}

		// Inject a link to download Jetpack.
		var downloadDiv = jQuery('<div>', {
			class: 'components-dropdown components-dropdown-menu block-editor-post-preview__dropdown',
			tabindex: '-1'
		});
		var downloadButton = jQuery( '<button>', {
			type: 'button',
			class: 'components-button block-editor-post-preview__button-toggle components-dropdown-menu__toggle is-tertiary',
			text: 'Download Jetpack',
			click: function() {
				window.location.href = 'https://wordpress.org/plugins/jetpack';
			}
		});
		downloadDiv.append( downloadButton );

		function copyPostContent() {
			var text = wp.data.select( 'core/editor' ).getEditedPostAttribute( 'content' );
			navigator.clipboard.writeText( text ).then( function() {
				wp.data.dispatch('core/notices').createNotice( 'info', 'Copied!', {
					isDismissible: true,
					type: 'snackbar',
				} );
			} );
		}

		var copyDiv = jQuery('<div>', {
			class: 'components-dropdown components-dropdown-menu block-editor-post-preview__dropdown',
			tabindex: '-1'
		});
		var copyButton = jQuery( '<button>', {
			type: 'button',
			class: 'components-button block-editor-post-preview__button-toggle components-dropdown-menu__toggle is-tertiary',
			text: 'Copy post to clipboard',
			click: function( event ) {
				copyPostContent();
				event.preventDefault();
				setTimeout(function() {
					window.location.href = 'https://wordpress.com/checkout/jetpack/jetpack_ai_monthly';
				}, 2000 );
			}
		});
		copyDiv.append( copyButton );

		// Append the custom links/buttons.
		buyButton.before( copyDiv );
		buyButton.before( downloadDiv );

	}, 1000 );
} );