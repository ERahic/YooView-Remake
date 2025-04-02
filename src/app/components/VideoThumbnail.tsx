//Need to create component for holding video cards in columns for main page
interface VideoThumbnailProps {
  video: {
    id: number;
    title: string;
    thumbnail: string;
    views: string;
  };
}

function VideoThumbnail(props: VideoThumbnailProps) {
  const { video } = props;

  return (
    <div className="mt-4 rounded-lg p-2 bg-gray-400 caret-transparent">
      <img
        src={video.thumbnail}
        alt={video.title}
        className="w-full h-100 p-2 rounded-lg"
      />
      <div className="mt-4">{video.title}</div>
      <div>{video.views}</div>
    </div>
  );
}

export default VideoThumbnail;
