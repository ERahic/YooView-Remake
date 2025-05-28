//This is where the videos will be palced and take up most of the screen
//VideoThumbnail component will be imported to help display video cards onto this component
import VideoThumbnail, { VideoType } from "../components/VideoThumbnail";
import { useState, useEffect, useRef, useCallback } from "react";
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

  // a ref to hold the length of videos that will be fetched and displayed
  const lastestVideoCountRef = useRef<number>(0);

  useEffect(() => {
    lastestVideoCountRef.current = videos.length;
  }, [videos]);

  // Another useState for video selection and for video window to open and play content
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [showVideo, setShowVideo] = useState<boolean>(false);

  // UseState to track pagination (process of splitting large sets of data into smaller ones for easier load management)
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);

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

  // Need a useRef to track the scroll position of page to load more videos while logged in
  const loadMoreVideosRef = useRef<HTMLDivElement | null>(null);

  // useState to throttle page tracking
  const [loadingMoreVideos, setLoadingMoreVideos] = useState(false);

  // Function for fetching more videos when the user is logged in and scrolls at the bottom of page
  const fetchMoreVideos = useCallback(async () => {
    // useCallback will ensure the function reference changes only when nextPageToken changes
    console.log("Fetchvideos called ()");

    if (loadingMoreVideos || !nextPageToken) return;
    setLoadingMoreVideos(true);
    console.log("Fetching More Videos...");

    const sessionResponse = await fetch("/api/lib/session");
    const { accessToken } = await sessionResponse.json();
    if (!accessToken) {
      setLoadingMoreVideos(false);
      return;
    }

    let newVideos: VideoType[] = [];

    if (searchQuery.trim()) {
      // continue with fetching SEARCHED results
      const QueryResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=12&regionCode=CA&q=${encodeURIComponent(
          searchQuery
        )}&pageToken=${nextPageToken}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const searchData = await QueryResponse.json();
      const videoId = searchData.items
        .map((item: YouTubeSearch) => item.id.videoId)
        .join(",");

      setNextPageToken(searchData.nextPageToken ?? null);

      const detailedRes = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const detailedData = await detailedRes.json();

      newVideos = (detailedData.items as YoutubeVideoData[]).map((item) => ({
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
      setNextPageToken(searchData.nextPageToken ?? null);
      setVideos((prev) => {
        const existingId = new Set(prev.map((video) => video.id));
        const uniqueVideos = newVideos.filter(
          (video) => !existingId.has(video.id)
        );
        return [...prev, ...uniqueVideos];
      });
      setLoadingMoreVideos(false);
    } else {
      // If scrolling down page to load more videos without a searchquery entered in the searchbar, pull popular videos instead
      const YoutubeResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=CA&maxResults=12&pageToken=${nextPageToken}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const YoutubeData = await YoutubeResponse.json();

      const moreVideos: VideoType[] = (
        YoutubeData.items as YoutubeVideoData[]
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
      console.log("Current video count:", lastestVideoCountRef.current);
      console.log("New batch:", moreVideos.length);

      setVideos((prev) => [...prev, ...moreVideos]);
      setNextPageToken(YoutubeData.nextPageToken ?? null);
      setLoadingMoreVideos(false);
    }
  }, [loadingMoreVideos, nextPageToken, searchQuery]);

  // UseEffect to listen for the user scrolling at the bottom of the page when logged in
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        // we observe the loadMoreRef div and entries[0].isIntersecting becomes true when the page reaches the bottom and observes the div with loadMoreRef assigned to it
        console.log("Intersection Triggered");
        fetchMoreVideos();
      }
    });
    const target = loadMoreVideosRef.current;
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
      observer.disconnect();
    };
  }, [fetchMoreVideos, searchQuery]);

  // Will fetch data for popular youtube videos on first render after login
  const fetchYoutubePopularVideos = async (accessToken: string) => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&&chart=mostPopular&maxResults=12&regionCode=CA&q=",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();
      // Safe check if data was received
      if (!data.items || !Array.isArray(data.items)) {
        console.warn("No Video Items Have Returned!", data);
        setVideos(placeholderVideos);
        return;
      }

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
      setNextPageToken(data.nextPageToken ?? null);
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
    async function fetchSessionAndVideos() {
      try {
        const response = await fetch("api/lib/session");

        if (!response.ok) {
          console.warn("Session fetch returned invalid JSON", response.status);
          setVideos(placeholderVideos);
          return;
        }

        const data = (await response.json()) as { accessToken?: string };
        console.log("Session Response:", data);

        const accessToken = data.accessToken;

        if (!accessToken) {
          setVideos(placeholderVideos);
          return;
        }

        if (!searchQuery || !searchQuery.trim()) {
          await fetchYoutubePopularVideos(accessToken);
        } else {
          await fetchVideosBySearchQuery(searchQuery, accessToken); // pass the token so that navigating back wont produce google 03 error
        }
      } catch (error) {
        console.error("Session fetch failed", error);
        setVideos(placeholderVideos);
      }
    }

    fetchSessionAndVideos();
  }, [searchQuery]);

  // Will need to fetch youtube videos based on what the search query is
  const fetchVideosBySearchQuery = async (
    query: string,
    accessToken: string
  ) => {
    try {
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

      setNextPageToken(searchData.nextPageToken || null);

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
      <div className="relative z-10 ml-20 mt-5 p-10 w-full h-full max-h-200px max-w-300px bg-gray-900">
        <div className="grid grid-cols-4 gap-5">
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
        <div
          ref={loadMoreVideosRef}
          className="flex flex-col h-20 w-full mt-10"
        />
      </div>
      {/*Display video modal when video thumbnail is clicked on*/}
      {showVideo && selectedVideo && (
        <VideoModal videoId={selectedVideo} onClose={closeVideo} />
      )}
    </>
  );
}

export default Videos;
