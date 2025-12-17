"use client";

import { Star } from "lucide-react";

function ReviewItem({ review, appUsers }) {
  const { rating, title, body, created_at, user_id } = review;

  const user = appUsers.find((u) => u.id === user_id);

  const date = new Date(created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="border rounded-2xl p-5 bg-muted/40 hover:bg-muted transition flex gap-4">
      {user && (
        <img
          src={user.avatar_url}
          alt={user.full_name}
          className="w-12 h-12 rounded-full object-cover"
        />
      )}

      <div className="flex-1">
        {user && <p className="font-semibold text-sm">{user.full_name}</p>}

        <div className="flex items-center justify-between mb-2">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={10}
                className={
                  i < rating
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-gray-300"
                }
              />
            ))}
          </div>

          <p className="text-xs text-muted-foreground">{date}</p>
        </div>

        <p className="font-bold text-lg">{title}</p>
        <p className="text-muted-foreground text-sm mt-1">{body}</p>
      </div>
    </div>
  );
}

export default ReviewItem;
