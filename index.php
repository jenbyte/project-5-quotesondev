<?php
/**
 * The main template file.
 *
 * @package QOD_Starter_Theme
 */

get_header(); ?>

	<div id="primary" class="content-area">
		
		<div class="quote-left"></div>
		<!-- <img src="<?= get_template_directory_uri() . '/images/quote-left-solid.svg'?>" class="quote" /> -->
		
			<main id="main" class="site-main" role="main">						
				<?php

				if ( have_posts() ) : 

					while( have_posts() ): the_post();

						get_template_part( 'template-parts/content' );

					endwhile;
				
				else:

					get_template_part( 'template-parts/content', 'none' );

				endif; 
				
				?>			
			</main><!-- #main -->

		<!-- <img src="<?= get_template_directory_uri() . '/images/quote-right-solid.svg'?>" class="quote" /> -->
		<div class="quote-right"></div>
	
	</div><!-- #primary -->

<?php get_footer(); ?>
