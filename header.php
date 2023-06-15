<!DOCTYPE html>
<html class="block-editor-editor-skeleton__html-container">
	<head>
		<meta charset="<?php bloginfo( 'charset' ); ?>">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="profile" href="http://gmpg.org/xfn/11">
		<?php wp_head(); ?>
	</head>
	<body class="wp-admin wp-core-ui js post-php admin-bar post-type-post branch-5-8 version-5-8-3 admin-color-fresh locale-en-us block-editor-page wp-embed-responsive customize-support svg">
	<header class="header js-header">
		<nav class="header__content">
			<a href="https://jetpack.com/" aria-label="Jetpack home" class="home-link header__home-link">
				<img alt="jetpack-sandbox-logo" src="https://ai.jetpacksandbox.com/wp-content/uploads/2023/06/jetpack-sandbox-logo.jpg" height="38px">
			</a>
		</nav>
	</header>
		<div id="wpwrap">
			<div id="adminmenumain" role="navigation" aria-label="Main menu">
				<a href="#wpbody-content" class="screen-reader-shortcut">Skip to main content</a>
				<a href="#wp-toolbar" class="screen-reader-shortcut">Skip to toolbar</a>
				<div id="adminmenuback"></div>
				<div id="adminmenuwrap">
					<ul id="adminmenu">
						<li class="menu-item menu-icon-performance" id="menu-comments">
							<a href="#" class="menu-icon-info">
								<div class="wp-menu-arrow">
									<div></div>
								</div>
								<div class="wp-menu-image dashicons-before dashicons-info"><br></div>
								<div class="wp-menu-name"><?php echo esc_html( frontenberg_get_block_editor_version() ); ?></div>
							</a>
						</li>
						<?php
							if ( has_nav_menu( 'sidebar' ) ) {
								wp_nav_menu( [
									'menu' => 'sidebar',
									'container' => '',
									'items_wrap' => '%3$s',
									'link_before' => '<div class="wp-menu-arrow"><div></div></div><div class="wp-menu-image dashicons-before dashicons-admin-site"><br></div><div class="wp-menu-name">',
									'link_after' => '</div>'
								] );
							}
						?>
					</ul>
				</div>
			</div>
			<div id="wpcontent">
				<div id="wpbody" role="main">
					<div id="wpbody-content">
						<div class="block-editor">
