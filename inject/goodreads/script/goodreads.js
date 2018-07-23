window.browser = (function() {
  return window.msBrowser || window.browser || window.chrome;
})();
var patt = /[\u05D0-\u05EA]|[\u0620-\u063F]|[\u0641-\u064A]|[\u0675-\u06D3]|[\u0710-\u071C]|[\u071E-\u072F]|[\u074E-\u077F]|[\u08A0-\u08AC]|[\u08AE-\u08B4]|[\u07C1-\u07C9]|[\u07CC-\u07E9]/g;
var obsRun = false;
browser.storage.local.get('goodreads', function(items) {
  if (items.goodreads == true || items.goodreads == undefined) {
    let run_against_article = post_article => {
      if (!patt.test(post_article.innerText)) return;

      post_article.classList.add('fonttools-rtl');
    };

    let run_on_page = () => {
      let post_articles = document.querySelectorAll(
        'p,h1,h2,h3,h4,h5,h6,a,span,div,#description,#descriptionContainer, .reviewText, .expandableHtml, .xhr_comment_body, .aboutAuthorInfo, .quoteText, .bookAuthorProfile__about, .addBookTipDescription, .gr-newsfeedItem__userStatusText, .gr-book__description, .updateBodyAfterImage, .infoBoxRowItem, .readable, tr,.questionText'
      );
      if (!post_articles.length) return;

      let i = 0,
        len = post_articles.length;
      for (; i < len; i++) run_against_article(post_articles[i]);
    };
    obsRun = true;
    new MutationObserver(run_on_page).observe(document.body, {
      childList: true,
      subtree: true
    });
  }
});

browser.storage.onChanged.addListener(function(changes, namespace) {
  if (changes.goodreads != undefined) {
    browser.storage.local.get('goodreads', function(items) {
      if (items.goodreads == true || items.goodreads == undefined) {
        let run_against_article = post_article => {
          if (!patt.test(post_article.innerText)) return;

          post_article.classList.add('fonttools-rtl');
        };

        let run_on_page = () => {
          let post_articles = document.querySelectorAll(
            'p,h1,h2,h3,h4,h5,h6,a,span,#description,#descriptionContainer, .reviewText, .expandableHtml, .xhr_comment_body, .aboutAuthorInfo, .quoteText, .bookAuthorProfile__about, .addBookTipDescription, .gr-newsfeedItem__userStatusText, .gr-book__description, .updateBodyAfterImage, .infoBoxRowItem, .readable, tr,.questionText'
          );
          if (!post_articles.length) return;

          let i = 0,
            len = post_articles.length;
          for (; i < len; i++) run_against_article(post_articles[i]);
        };
        if (obsRun == false) {
          new MutationObserver(run_on_page).observe(document.body, {
            childList: true,
            subtree: true
          });
        } else {
          run_on_page();
        }
      }
    });
  }
});
