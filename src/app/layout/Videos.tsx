//This is where the videos will be palced and take up most of the screen
//VideoThumbnail component will be imported to help display video cards onto this component
import VideoThumbnail from "../components/VideoThumbnail";

function Videos() {
  //placeholder video thumbnails from Lorem Picsum will be used, as well as map function to spread array of placeholders onto component
  const placeholderVideos = [
    {
      id: 1,
      title: "You'll never BELIEVE whats on this mans computer...",
      thumbnail: "https://picsum.photos/id/1/200/300",
      views: "1,465,832 Views",
      category: "Test",
    },
    {
      id: 2,
      title: "You'll never BELIEVE whats on the same mans phone...",
      thumbnail: "https://picsum.photos/id/3/200/300",
      views: "14,465,832 Views",
      category: "Test",
    },
    {
      id: 3,
      title: "Top 20 reasons why these mountains need to be EXCAVATED",
      thumbnail: "https://picsum.photos/id/29/200/300",
      views: "12,465,832 Views",
      category: "Test",
    },
    {
      id: 4,
      title: "This city.... Theres something WRONG with it...",
      thumbnail: "https://picsum.photos/id/43/200/300",
      views: "111,465,832 Views",
      category: "Test",
    },
    {
      id: 5,
      title: "This flower... is the most DANGEROUS flower on the planet",
      thumbnail: "https://picsum.photos/id/55/200/300",
      views: "30,465,832 Views",
      category: "Test",
    },
    {
      id: 6,
      title: "WHO IS THIS WOMAN?????",
      thumbnail: "https://picsum.photos/id/64/200/300",
      views: "100,465,832 Views",
      category: "Test",
    },
    {
      id: 7,
      title: "This bridge has a DARK history...",
      thumbnail: "https://picsum.photos/id/84/200/300",
      views: "23,465,832 Views",
      category: "Test",
    },
    {
      id: 8,
      title: "Top 10 reasons why the government HATES you...",
      thumbnail: "https://picsum.photos/id/122/200/300",
      views: "6,465,832 Views",
      category: "Test",
    },
    {
      id: 9,
      title: "There's something WORSE than a lovecraftian monster in there...",
      thumbnail: "https://picsum.photos/id/124/200/300",
      views: "65,465,832 Views",
      category: "Test",
    },
    {
      id: 10,
      title: "This castle was built with CURSED bricks...",
      thumbnail: "https://picsum.photos/id/142/200/300",
      views: "80,465,832 Views",
      category: "Test",
    },
    {
      id: 11,
      title: "This lightshow KILLED MILLIONS...",
      thumbnail: "https://picsum.photos/id/158/200/300",
      views: "90,465,832 Views",
      category: "Test",
    },
    {
      id: 12,
      title: "This guitar... once belonged to a madman...",
      thumbnail: "https://picsum.photos/id/145/200/300",
      views: "465,832 Views",
      category: "Test",
    },
  ];

  // {...} spread used to display each video held in the placeholder Videos variable
  return (
    <>
      <div className="ml-20 mt-5 p-4 w-full h-full max-h-200px max-w-300px bg-blue-950 text-white dark:bg-black dark:text-yellow-500 grid grid-cols-4 gap-5">
        {placeholderVideos.map((video) => (
          <VideoThumbnail key={video.id} video={video} />
        ))}
      </div>
    </>
  );
}

export default Videos;
