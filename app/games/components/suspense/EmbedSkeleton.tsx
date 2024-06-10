import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function MainSkeleton({ height }: { height: number }) {
  return (
    <Skeleton
      className={`h-${height} w-full mx-auto`}
      style={{ borderRadius: "12px" }}
    />
  );
}
