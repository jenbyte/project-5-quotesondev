(function($) {
  $(document).ready(function() {
    const $quote = $('.entry-content');
    const $author = $('.entry-title');
    const $ref = $('.source');

    let lastPage = '';

    //get a random post and append content to the dom
    $('#new-quote-button').on('click', function(event) {
      event.preventDefault();
      // ajax request
      getQuote();
    });

    function getQuote() {
      lastPage = document.URL;

      $.ajax({
        method: 'GET',
        url:
          qod_vars.rest_url +
          'wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=1'
      })
        .done(function(data) {
          $quote.empty();
          $author.empty();
          $ref.empty();

          let source = data[0]._qod_quote_source;
          let link = data[0]._qod_quote_source_url;

          // append content to DOM e.g. replace the quote content with rest api content
          $quote.append(data[0].content.rendered);
          $author.append('&mdash; ' + data[0].title.rendered);

          $ref.append(`, <a href="${link}">${source}</a>`);
          console.log(data[0]._qod_quote_source_url);

          const quote = data[0];
          // figure out the post slug
          history.pushState(null, null, qod_vars.home_url + '/' + quote.slug);
        })
        .fail(function(err) {
          // Append an error message or alert
          console.log('error');
        });
    } // end of getQuote fx

    $(window).on('popstate', function() {
      window.location.replace(lastPage);
      //can use this to reset PONG game
    });

    // submit the form and create a new quote post
    $('#quote-submission-form').on('submit', function(event) {
      event.preventDefault();
      postQuote();
    }); // end of #quote-submission-form

    function postQuote() {
      //get values of your form inputs
      //const quoteTitle = $('#form-id').val();

      $.ajax({
        method: 'POST',
        url: qod_vars.rest_url + 'wp/v2/posts',
        data: {
          // title: quoteTitle,
          // author: quoteAuthor,
        },
        beforeSend: function(xhr) {
          xhr.setRequestHeader('X-WP-Nonce', qod_vars.nonce);
          // 'X-WP-Nounce' is for authentication --> WP will lok
        }
      })
        .done(function(response) {
          // console.log(response);
          // slideUp the form
          // append a success message
        })
        .fail(function() {
          // console.log('something went wrong');
          //output message for user saying something went wrong
        });
    } // end of postQuote fx
  }); // end of doc ready
})(jQuery);
