import Image from "next/image";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";

//Need to create component for holding video cards in columns for main page
export type VideoType = {
  id: string;
  title: string;
  thumbnail: string;
  views: string;
  likes: string;
  comments: string;
  category: string;
};

type Props = {
  video: VideoType;
};

function VideoThumbnail({ video }: Props) {
  return (
    <div className="mt-4 rounded-lg p-2 bg-gray-600 caret-transparent h-[380px] flex flex-col">
      <Image
        src={video.thumbnail}
        alt={video.title}
        width={300}
        height={200}
        className="w-full h-75 p-2 rounded-lg"
      />
      <div className="mt-2 line-clamp-2">{video.title}</div>

      <div className="flex justify-between items-center mt-1">
        <span>{video.views}</span>
        <div className="flex items-center mt-1 gap-2">
          <ThumbUpIcon />
          <span>{video.likes}</span>
          <CommentIcon />
          <span>{video.comments}</span>
        </div>
      </div>
    </div>
  );
}

export default VideoThumbnail;
