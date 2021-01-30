module.exports.modifyReviews = function (reviews, page, count, sort) {
  if (!page) {
    page = 1;
  }
  if (sort === 'newest') {
    reviews.sort(function (b, a) {
      return (a.date < b.date) ? -1 : ((a.date > b.date) ? 1 : 0);
    });
  } else if (sort === 'helpful') {
    reviews.sort(function (a, b) {
      return b.helpfulness - a.helpfulness;
    })
  } else if (sort === 'relevance') {
    reviews.sort(function (a, b) {
      return (
        (parseInt(b.review_id) + b.helpfulness) - (parseInt(a.review_id) + a.helpfulness)
      );
    })
  }

  let lastIndex = page*count + 1;
  (lastIndex < reviews.length) && (lastIndex = reviews.length);
  let firstIndex;
  lastIndex - count < 0 ? firstIndex = 0 : firstIndex = lastIndex - count;
  reviews.slice(lastIndex - count, lastIndex);

  return reviews;
}