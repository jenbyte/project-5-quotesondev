<?php
/**
 * The main template file.
 *
 * @package QOD_Starter_Theme
 */

get_header(); ?>

	<div id="primary" class="content-area">
		
	<i class="fas fa-quote-left"></i>
		
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
			
	<i class="fas fa-quote-right"></i>
	
	</div><!-- #primary -->

<?php get_footer(); ?>
