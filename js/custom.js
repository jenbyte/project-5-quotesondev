(function($) {
  $(document).ready(function() {
    //get a random post and append content to the dom
    $('#new-quote-button').on('click', function(event) {
      event.preventDefault();
      // ajax request
      getQuote();
    });

    function getQuote() {
      $.ajax({
        method: 'GET',
        url:
          qod_vars.rest_url +
          'wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=1',
        //can add filter with query string (?)
        data: {
          action: 'qod_scripts',
          security: qod_vars.comment_nonce,
          the_post_id: qod_vars.post_id
        }
      })
        .done(function(data) {
          // append content to DOM e.g. replace the quote content with rest api content
          $('.post').append(qod_vars.data);
          console.log(qod_vars.rest_url.data);
        })
        .fail(function(err) {
          // Append an error message or alert
          // console.log(err);
        });
    }
  });
})(jQuery);
