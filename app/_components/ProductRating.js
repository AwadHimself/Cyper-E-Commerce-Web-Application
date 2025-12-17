import RatingProgress from "./RatingProgress";
import RatingStars from "./RatingStars";

function ProductRating({ productRatingSummary, ProductReviews }) {
  const { average_rating = 0, reviews_count = 0 } = productRatingSummary || {};

  const ratingCount = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

  ProductReviews.forEach((review) => {
    const r = review.rating;
    ratingCount[r] += 1;
  });

  const ratingPercent = {};
  for (let i = 1; i <= 5; i++) {
    ratingPercent[i] = reviews_count
      ? (ratingCount[i] / reviews_count) * 100
      : 0;
  }

  return (
    <div className="w-full max-w-[80%]  flex flex-col gap-15 items-center py-10">
      <p className="self-start text-5xl font-bold">Rating</p>

      <div className="flex w-full justify-between">
        <div className="flex flex-col items-center gap-3 bg-muted px-10 py-15 rounded-2xl">
          <h1 className="text-3xl font-bold">{average_rating}</h1>
          <p className="text-xs text-muted-foreground">
            of {reviews_count} reviews
          </p>
          <RatingStars average_rating={average_rating} />
        </div>

        <div className="flex flex-col gap-3 justify-center w-[70%]">
          {[5, 4, 3, 2, 1].map((star) => (
            <RatingProgress
              key={star}
              star={star}
              percent={ratingPercent[star]}
              count={ratingCount[star]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductRating;
