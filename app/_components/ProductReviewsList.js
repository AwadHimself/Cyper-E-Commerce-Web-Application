"use client";

import { useState } from "react";
import ReviewItem from "./ReviewItem";
import { Button } from "../../components/ui/button";

function ProductReviewsList({ ProductReviews, appUsers }) {
  const [visibleCount, setVisibleCount] = useState(2);

  const visibleReviews = ProductReviews.slice(0, visibleCount);

  const handleViewMore = () => {
    setVisibleCount((prev) => Math.min(prev + 2, ProductReviews.length));
  };

  return (
    <div className="w-full max-w-[80%] my-10">
      <h2 className="text-3xl font-bold mb-5">Customer Reviews</h2>

      <div className="flex flex-col gap-5">
        {visibleReviews.length > 0 ? (
          visibleReviews.map((review) => (
            <ReviewItem key={review.id} review={review} appUsers={appUsers} />
          ))
        ) : (
          <p className="text-muted-foreground">No reviews yet.</p>
        )}
      </div>

      {visibleCount < ProductReviews.length && (
        <div className="flex justify-center mt-5">
          <Button onClick={handleViewMore}>View More</Button>
        </div>
      )}
    </div>
  );
}

export default ProductReviewsList;
