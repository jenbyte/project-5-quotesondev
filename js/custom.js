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
          const quote = data[0];

          // append content to DOM e.g. replace the quote content with rest api content
          $quote.append(data[0].content.rendered);

          if (quote._qod_quote_source === '') {
            $author.append('&mdash; ' + data[0].title.rendered);
          } else {
            $author.append('&mdash; ' + data[0].title.rendered + '&#44; ');
            $ref.append(` <a href="${link}">${source}</a>`);
          }

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
      const quoteTitle = $('#quote-author').val();
      const quoteContent = $('#quote-content').val();
      const quoteSource = $('#quote-source').val();
      const quoteURL = $('#quote-source-url').val();

      $.ajax({
        method: 'POST',
        url: qod_vars.rest_url + 'wp/v2/posts',
        data: {
          title: quoteTitle,
          content: quoteContent,
          _qod_quote_source: quoteSource,
          _qod_quote_source_url: quoteURL
        },
        beforeSend: function(xhr) {
          xhr.setRequestHeader('X-WP-Nonce', qod_vars.nonce);
          // 'X-WP-Nounce' is for authentication --> WP will lok
        }
      })
        .done(function(response) {
          console.log('sent!');
          // slideUp the form
          // append a success message
          $('.quote-submission-wrapper').slideUp(700);
          $('.quote-submission').append(
            '<p>Thanks, your quote submission was received!</p>'
          );
        })
        .fail(function() {
          console.log('something went wrong');
          alert('Please enter required fields.');

          //output message for user saying something went wrong
        });
    } // end of postQuote fx
  }); // end of doc ready
})(jQuery);
