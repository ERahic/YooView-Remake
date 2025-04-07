//Need to create component for holding video cards in columns for main page
type Video = {
  id: number;
  title: string;
  thumbnail: string;
  views: string;
  category: string;
};

function VideoThumbnail(Videos: Video) {
  return (
    <div className="mt-4 rounded-lg p-2 bg-gray-400 caret-transparent">
      <img
        src={Videos.thumbnail}
        alt={Videos.title}
        className="w-full h-75 p-2 rounded-lg"
      />
      <div className="mt-4">{Videos.title}</div>
      <div>{Videos.views}</div>
    </div>
  );
}

export default VideoThumbnail;
