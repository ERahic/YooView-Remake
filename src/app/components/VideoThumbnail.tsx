//Need to create component for holding video cards in columns for main page
export type VideoType = {
  id: number;
  title: string;
  thumbnail: string;
  views: string;
  category: string;
};

type Props = {
  video: VideoType;
};

function VideoThumbnail({ video }: Props) {
  return (
    <div className="mt-4 rounded-lg p-2 bg-gray-600 caret-transparent">
      <img
        src={video.thumbnail}
        alt={video.title}
        className="w-full h-75 p-2 rounded-lg"
      />
      <div className="mt-4">{video.title}</div>
      <div>{video.views}</div>
    </div>
  );
}

export default VideoThumbnail;
