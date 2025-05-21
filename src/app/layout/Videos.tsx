//This is where the videos will be palced and take up most of the screen
//VideoThumbnail component will be imported to help display video cards onto this component
import VideoThumbnail, { VideoType } from "../components/VideoThumbnail";
import { useState, useEffect } from "react";
import { placeholderVideos } from "@/VideoPlaceholders";
import VideoModal from "../components/VideoModal";

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
    likeCount: string;
    commentCount: string;
  };
};

// Type for YoutubeSearch in order to avoid the "any" error
type YouTubeSearch = {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
  };
};

// Defing what type searchQuery will be in order for it to be passed into main function below
// type Props = {
//   searchQuery: string;
// };

function Videos({ searchQuery }: { searchQuery: string }) {
  // will create useState for both videotype and for checking if the user is logged in, fetched video data will only appear when user logs in
  const [videos, setVideos] = useState<VideoType[]>([]);

  // Another useState for video selection and for video window to open and play content
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [showVideo, setShowVideo] = useState<boolean>(false);

  // Function to have video open based on which video was clicked on by user
  const openVideo = (video: string) => {
    setSelectedVideo(video);
    setShowVideo(true);
  };

  // Function to have video close when user no longer wishes to continue watching, will have "X" on top right corner of video modal to close it
  const closeVideo = () => {
    setSelectedVideo(null);
    setShowVideo(false);
  };

  // useEffect will immediately fetch video data and display when user logs in
  useEffect(() => {
    fetch("api/lib/session")
      .then((res) => res.json())
      .then((data) => {
        if (data.accessToken) {
          // when there is an accesstoken, it will fetch the data for videos, else it would use placeholders
          fetchYoutubePopularVideos(data.accessToken);
        } else {
          setVideos(placeholderVideos);
        }
      });
  }, []);

  // Will fetch data for popular youtube videos on first render after login
  const fetchYoutubePopularVideos = async (accessToken: string) => {
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
        views: `${Number(item.statistics.viewCount).toLocaleString()} Views`,
        likes: `${Number(item.statistics.likeCount).toLocaleString()} Likes`,
        comments: item.statistics.commentCount
          ? `${Number(item.statistics.commentCount).toLocaleString()} Comments`
          : "Comments Disabled",
        category: "N/A",
      }));

      setVideos(formattedVideos);
    } catch (error) {
      console.error("Failed to fetch Youtube data!", error);
      setVideos(placeholderVideos);
    }
  };

  // Another useEffect but this time for when user inputs whatever it is they want to watch and this function will call the youtube api to fetch the data

  // OLD WAY
  // useEffect(() => {
  //   if (!searchQuery || !searchQuery.trim()) return; //If there is nothing inside of the search bar, dont do anything.
  //   fetchVideosBySearchQuery(searchQuery);
  // }, [searchQuery]);
  useEffect(() => {
    if (!searchQuery || !searchQuery.trim()) {
      fetch("api/lib/session")
        .then((res) => res.json())
        .then((data) => {
          if (data.accessToken) {
            fetchYoutubePopularVideos(data.accessToken);
          } else {
            setVideos(placeholderVideos);
          }
        });
      return;
    }
    fetchVideosBySearchQuery(searchQuery);
  }, [searchQuery]);

  // Will need to fetch youtube videos based on what the search query is
  const fetchVideosBySearchQuery = async (query: string) => {
    try {
      // Access token
      const sessionRes = await fetch("/api/lib/session");
      const sessionData = await sessionRes.json();
      const accessToken = sessionData.accessToken;

      // Search by query
      const searchRes = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=12&regionCode=CA&q=${encodeURIComponent(
          query
        )}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const searchData = await searchRes.json();

      // Extracting the video ID
      console.log("Search Data:", searchData);
      if (!searchData.items || searchData.items.length === 0) {
        console.warn("No search results found");
        setVideos([]);
        return;
      }
      const videoId = (searchData.items as YouTubeSearch[])
        .map((item) => item.id.videoId)
        .join(",");

      // Fetch video details (the statistics)
      const detailedRes = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet, statistics&id=${videoId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const detailedData = await detailedRes.json();

      // Format and store the search data
      const formattedVideos: VideoType[] = (
        detailedData.items as YoutubeVideoData[]
      ).map((item) => ({
        id: item.id,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
        views: `${Number(item.statistics.viewCount).toLocaleString()} Views`,
        likes: `${Number(item.statistics.likeCount).toLocaleString()} Likes`,
        comments: item.statistics.commentCount
          ? `${Number(item.statistics.commentCount).toLocaleString()} Comments`
          : "Comments Disabled",
        category: "N/A",
      }));

      setVideos(formattedVideos);
    } catch (error) {
      console.error("Search Failed", error);
    }
  };

  // {...} spread used to display each video held in the placeholder Videos variable
  return (
    <>
      <div className="relative z-10 ml-20 mt-5 p-4 w-full h-full max-h-200px max-w-300px bg-blue-950 grid grid-cols-4 gap-5">
        {videos.map((video) => (
          <div
            key={video.id}
            onClick={() => openVideo(video.id)}
            className="cursor-pointer"
          >
            <VideoThumbnail video={video} />
          </div>
        ))}
      </div>
      {/*Display video modal when video thumbnail is clicked on*/}
      {showVideo && selectedVideo && (
        <VideoModal videoId={selectedVideo} onClose={closeVideo} />
      )}
    </>
  );
}

export default Videos;
