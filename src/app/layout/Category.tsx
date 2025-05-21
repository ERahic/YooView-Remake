import { CategoryPlaceholder, CategoryTag } from "../components/CategoryTags";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useRef, useState, useEffect } from "react";

// Defining what type YoutubeCategoryData props will be in order to avoid using "any" when using data thats fetched from API
type YoutubeCategoryData = {
  id: string;
  snippet: {
    title: string;
  };
};

function Category() {
  // Will create useStates to  store categories that will either be placeholders or actual data from user
  const [categories, setCategories] = useState<CategoryTag[]>([]);

  // useEffect to fetch data once on page load
  useEffect(() => {
    fetch("api/lib/session")
      .then((res) => res.json())
      .then((data) => {
        if (data.accessToken) {
          fetchCategories(data.accessToken);
        } else {
          setCategories(CategoryPlaceholder);
        }
      });
  }, []);

  // Categories from the user need to be fetched
  const fetchCategories = async (accessToken: string) => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=CA",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();
      console.log("Fetched Category Data:", data);
      if (!data.items || !Array.isArray(data.items)) {
        setCategories(CategoryPlaceholder);
        return;
      }

      const userCategories: CategoryTag[] = (
        data.items as YoutubeCategoryData[]
      ).map((item) => ({
        id: parseInt(item.id),
        title: item.snippet.title,
      }));

      setCategories(userCategories);
    } catch (error) {
      console.error("Error fetching categories", error);
      setCategories(CategoryPlaceholder); // will show if logged in but failed to fetch category data
    }
  };

  // need to create functions for chevron buttons to transition category tags either left or right depending on which chevron arrow was pressed
  const scrollbarRef = useRef<HTMLDivElement>(null);

  const handleScrollLeft = () => {
    // wrapping this just to have first category tag not go all the way to the right when raching max scroll on left chevron
    const container = scrollbarRef.current;
    if (!container) return;

    // if (container.scrollLeft <= 25) {
    //   container.scrollTo({ left: 25, behavior: "smooth" });
    // } else {
    //   scrollbarRef.current?.scrollBy({ left: -300, behavior: "smooth" });
    // }
    const updatedScrollLeft = Math.max(container.scrollLeft - 300, 0); // This is to ensure that Math.max will never go below 0
    container.scrollTo({ left: updatedScrollLeft, behavior: "smooth" });
    setTimeout(handleScroll, 400); // delay after clicking chevron in order for chevron arrow fades to work
  };
  const handleScrollRight = () => {
    scrollbarRef.current?.scrollBy({ left: 300, behavior: "smooth" });
    setTimeout(handleScroll, 400);
  };

  // more functions to make arrows hidden when reaching max scroll point for either side
  const [leftArrowShow, setLeftArrowShow] = useState(false);
  const [rightArrowShow, setRightArrowShow] = useState(true);

  // This function will check the scroll position
  const handleScroll = () => {
    const scrollBarContainer = scrollbarRef.current;
    if (!scrollBarContainer) return;

    const scrollLeft = scrollBarContainer.scrollLeft;
    const scrollWidth = scrollBarContainer.scrollWidth;
    const clientWidth = scrollBarContainer.clientWidth;

    // left arrow visiblity will be updated
    setLeftArrowShow(scrollLeft >= 10);

    // right arrow visibility updated too
    setRightArrowShow(scrollWidth > clientWidth + 5); // - 10 added due to relative scroll not recognizing few hidden pixels for chevron right arrow to be hidden

    console.log("scrollLeft:", scrollLeft);
    console.log("clientWidth:", clientWidth);
    console.log("scrollWidth:", scrollWidth);
    console.log("rightArrowShow condition:", scrollWidth > clientWidth + 5);
  };

  // useEffect to set up listener for when scrolling left or right has reached its peak and arrows on either side must be hidden
  useEffect(() => {
    const scrollBarContainer = scrollbarRef.current;
    if (!scrollBarContainer) return;

    // Just to have both chevron arrows appear and category tags closer to left arrow for better view of page
    // scrollBarContainer.scrollBy({ left: 100, behavior: "auto" });
    scrollBarContainer.scrollTo({ left: 0, behavior: "auto" }); // to make sure that scroll position is at the start
    console.log("Initial scrollLeft:", scrollBarContainer.scrollLeft);
    handleScroll();

    // add event listener for container
    scrollBarContainer.addEventListener("scroll", handleScroll);

    // use delay to allow layout to settle
    setTimeout(() => {
      handleScroll();
    }, 50);
    // Check the initial scroll position once
    handleScroll();

    // Cleanup for when the component is unmounted
    return () => {
      scrollBarContainer.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty array means it will only run once after first render

  return (
    <>
      <div className="fixed top-24 left-20 right-0 z-20 caret-transparent">
        <div className="relative mx-auto w-full max-w-[750px] px-4 bg-blue-950 rounded-lg overflow-visible flex items-center">
          {/* Left Chevron */}
          <div
            onClick={handleScrollLeft}
            className="absolute -left-9 top-1/2 -translate-y-1/2 z-30 cursor-pointer transition-opacity duration-300"
          >
            <ChevronLeftIcon className="text-white" fontSize="large" />
          </div>

          {/* Right Chevron */}
          <div
            onClick={handleScrollRight}
            className="absolute -right-9 top-1/2 -translate-y-1/2 z-30 cursor-pointer transition-opacity duration-300"
          >
            <ChevronRightIcon className="text-white" fontSize="large" />
          </div>

          {/* Left Fade */}
          {leftArrowShow && (
            <div className="pointer-events-none absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-blue-950/80 to-transparent z-20" />
          )}
          {/* Right Fade */}
          {rightArrowShow && (
            <div className="pointer-events-none absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-blue-950/80 to-transparent z-20" />
          )}

          {/* Scrollable Tags */}
          <div className="flex-1 overflow-hidden">
            <div
              ref={scrollbarRef}
              className="scroll-smooth flex gap-8 pt-2 pb-2 pr-4 pl-4 overflow-x-auto scrollbar-hide whitespace-nowrap"
            >
              <div className="shrink-0 w-1" />
              {categories.map((tag) => (
                <div
                  key={tag.id}
                  className="border select-none border-gray-700 p-2 bg-gray-700 hover:bg-gray-500 px-6 rounded-full min-w-fit"
                >
                  {tag.title}
                </div>
              ))}
              <div className="shrink-0 w-1" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Category;
