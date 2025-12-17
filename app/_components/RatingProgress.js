"use client";

import { Star } from "lucide-react";
import { Progress } from "../../components/ui/progress";

function RatingProgress({ star, percent, count }) {
  return (
    <div className="flex gap-10 items-center">
      <p className="flex gap-1 items-center  w-10">
        {star} <Star className="text-yellow-500" size={14} />
      </p>

      <Progress value={percent} className="w-[60%] flex-1" />

      <p className="text-muted-foreground text-xs w-10 text-right">{count}</p>
    </div>
  );
}

export default RatingProgress;
