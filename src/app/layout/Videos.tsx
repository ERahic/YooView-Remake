//This is where the videos will be palced and take up most of the screen
//VideoThumbnail component will be imported to help display video cards onto this component
import VideoThumbnail, { VideoType } from "../components/VideoThumbnail";
import { useState, useEffect } from "react";
import { placeholderVideos } from "@/VideoPlaceholders";

// Defining what type YoutubeVideoData props will be in order to avoid using "any" when using data thats fetched from API
type YoutubeVideoData = {
  id: string;
  snippet: {
    title: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
  };
  statistics: {
    viewCount: string;
  };
};

function Videos() {
  // will create useState for both videotype and for checking if the user is logged in, fetched video data will only appear when user logs in
  const [videos, setVideos] = useState<VideoType[]>([]);

  // useEffect will immediately fetch video data and display when user logs in
  useEffect(() => {
    fetch("api/lib/session")
      .then((res) => res.json())
      .then((data) => {
        if (data.accessToken) {
          // when there is an accesstoken, it will fetch the data for videos, else it would use placeholders
          fetchYoutubeVideos(data.accessToken);
        } else {
          setVideos(placeholderVideos);
        }
      });
  }, []);

  // Will fetch data for youtube videos
  const fetchYoutubeVideos = async (accessToken: string) => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&&chart=mostPopular&maxResults=12&regionCode=CA",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();

      const formattedVideos: VideoType[] = (
        data.items as YoutubeVideoData[]
      ).map((item) => ({
        id: item.id,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
        views: `${Number(item.statistics.viewCount).toLocaleString()} views`,
        category: "N/A",
      }));

      setVideos(formattedVideos);
    } catch (error) {
      console.error("Failed to fetch Youtube data!", error);
      setVideos(placeholderVideos);
    }
  };

  // {...} spread used to display each video held in the placeholder Videos variable
  return (
    <>
      <div className="ml-20 mt-5 p-4 w-full h-full max-h-200px max-w-300px bg-blue-950 grid grid-cols-4 gap-5">
        {videos.map((video) => (
          <VideoThumbnail key={video.id} video={video} />
        ))}
      </div>
    </>
  );
}

export default Videos;
