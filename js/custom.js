(function($) {
  $(function() {
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

          const quote = data[0];
          let source = quote._qod_quote_source;
          let link = quote._qod_quote_source_url;

          // append content to DOM e.g. replace the quote content with rest api content
          $quote.append(quote.content.rendered);

          if (quote._qod_quote_source === '') {
            $author.append('&mdash; ' + quote.title.rendered);
          } else {
            $author.append('&mdash; ' + quote.title.rendered + '&#44; ');
            $ref.append(` <a href="${link}">${source}</a>`);
          }

          // figures out the post slug
          history.pushState(null, null, qod_vars.home_url + '/' + quote.slug);
        })
        .fail(function() {
          $quote.empty();
          $quote.append('Sorry there was an error. Please try again.');
          console.log('error');
        });
    } // end of getQuote fx

    $(window).on('popstate', function() {
      window.location.replace(lastPage);
      //can use this to reset PONG game
    });

    // Submit new quote
    $('#quote-submission-form').on('submit', function(event) {
      event.preventDefault();
      $(this).prop('disabled', true);
      postQuote();
    });

    function postQuote() {
      let quoteTitle = $('#quote-author').val();
      const quoteContent = $('#quote-content').val();
      const quoteSource = $('#quote-source').val();
      const quoteURL = $('#quote-source-url').val();
      if (quoteTitle == '' && quoteContent != '') {
        quoteTitle = 'Anonymous';
      }
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
          // 'X-WP-Nounce' is for authentication --> WP will look for the nonce
        }
      })
        .done(function() {
          console.log('sent!');
          $('.quote-submission-wrapper').slideUp(700);
          $('.quote-submission').append(
            '<p>Thanks, your quote submission was received!</p>'
          );
        })
        .fail(function() {
          console.log('something went wrong');
          $('html, body').animate({ scrollTop: 0 }, '');
          if (quoteContent === '') {
            $('#quote-author').focus();
            $('.entry-title').append(
              '<p class="fail-msg"><span>*</span> Please enter the fields to submit a quote.</p>'
            );
          }
        });
    } // end of postQuote fx
  }); // end of doc ready
})(jQuery);
