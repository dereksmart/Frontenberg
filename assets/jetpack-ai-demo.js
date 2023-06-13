wp.domReady( () => {
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
		// Hack the welcome modal.
		var picture = document.querySelector('.edit-post-welcome-guide__image');
		if( picture ) {
			var source = picture.querySelector( 'source' );
			var img = picture.querySelector( 'img' );
			source.setAttribute( 'srcset', 'https://jetpackme.files.wordpress.com/2023/06/jetpack-ai-assistant.jpg?w=1680' );
			img.setAttribute( 'src', 'https://jetpackme.files.wordpress.com/2023/06/jetpack-ai-assistant.jpg?w=1680' );
		}

		// Change text
		var heading = document.querySelector( '.edit-post-welcome-guide__heading' );
		var text = document.querySelector( '.edit-post-welcome-guide__text' );
		if ( heading ) {
			heading.innerText = 'Welcome to the Jetpack AI Assistant!';
		}
		if ( text ) {
			text.innerText = 'Where you can try out the new Jetpack AI Assistant in a sandbox space.\n\n' +
				'Make this post your own!\n\n';
		}

		// Hijack the publish button to open to the Jetpack AI checkout page
		const buyButton = jQuery( '.editor-post-publish-button' );
		if ( buyButton.length ) {
			buyButton.text('Buy for your site' );
			buyButton.on( 'click', function( event ) {
				event.preventDefault();
				window.location.href = 'https://wordpress.com/checkout/jetpack/jetpack_ai_monthly';
			} );
		}

		// Hijack the switch to draft button to open the Jetpack plugin page.
		const downloadJetpack = jQuery( '.editor-post-switch-to-draft' );
		if ( downloadJetpack.length ) {
			downloadJetpack.text('Download Jetpack' );
			downloadJetpack.on( 'click mousedown', function( event ) {
				event.preventDefault();
				window.location.href = 'https://wordpress.org/plugins/jetpack';
			} );
		}
	}, 1000 );
} );
