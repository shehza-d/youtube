import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../lib/api";
import Loading from "../components/ui/LoadingPage";
import { IVideoCard } from "../types";
import VideoCard from "../components/video/VideoCard";

export default function AllVideosHome() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["allHomeVideos"],
    queryFn: fetcher("/api/v1/videos"),
  });
  // console.log("🚀 ~ AllVideosHome ~ data:", data);

  if (isLoading) return <Loading />;

  if (!data || error) return <div>Error: {error?.message}</div>;

  if (!data.length)
    return <div className="center h-full text-2xl">No videos found</div>;

  return (
    <div className="grid grid-cols-3 gap-6 p-6">
      {data?.map((video: IVideoCard) => (
        <VideoCard key={video._id} data={video} />
      ))}
    </div>
  );
}
