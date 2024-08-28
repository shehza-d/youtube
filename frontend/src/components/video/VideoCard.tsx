import { IVideoCard } from "../../types";
import notFoundImg from "../../../public/image-not-found.jpg";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";

export default function VideoCard({ data }: { data: IVideoCard }) {
  const { _id, createdAt, duration, thumbnail, title, views } = data;

  const videoPublishDate = formatDistanceToNow(createdAt, {
    addSuffix: true,
  });

  return (
    <a href={`/video/${_id}`} className="group">
      <div className="relative h-60 w-full overflow-hidden rounded-xl ">
        <img
          className="block aspect-video h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          src={thumbnail || notFoundImg}
          height={200}
          width={400}
          alt={title}
        />
        <span className="absolute bottom-2 right-2 rounded-lg bg-slate-800/50 px-1 py-0.5">
          {(duration / 60).toFixed(2)}
        </span>
      </div>
      <h2 className="text-2xl">{title}</h2>

      <span>
        {views} views • {videoPublishDate}
      </span>
    </a>
  );
}
