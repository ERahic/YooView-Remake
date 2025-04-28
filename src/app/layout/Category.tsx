import { CategoryPlaceholder } from "../components/CategoryTags";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useRef, useState, useEffect } from "react";

function Category() {
  // need to create functions for chevron buttons to transition category tags either left or right depending on which chevron arrow was pressed
  const scrollbarRef = useRef<HTMLDivElement>(null);

  const handleScrollLeft = () => {
    scrollbarRef.current?.scrollBy({ left: -300, behavior: "smooth" });
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
    setLeftArrowShow(scrollLeft > 0);

    // right arrow visibility updated too
    setRightArrowShow(scrollLeft + clientWidth < scrollWidth - 10); // - 10 added due to relative scroll not recognizing few hidden pixels for chevron right arrow to be hidden
  };
  // useEffect to set up listener for when scrolling left or right has reached its peak and arrows on either side must be hidden
  useEffect(() => {
    const scrollBarContainer = scrollbarRef.current;
    if (!scrollBarContainer) return;

    // add event listener for container
    scrollBarContainer.addEventListener("scroll", handleScroll);

    // Check the initial scroll position once
    handleScroll();

    // Cleanup for when the component is unmounted
    return () => {
      scrollBarContainer.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty array means it will only run once after first render

  return (
    <>
      <div className="fixed top-24 left-20 right-0 z-40 caret-transparent">
        {/*Left Fade Effect*/}
        <div className="relative mx-auto max-w-[1200px] flex items-center bg-gray-800 rounded-lg">
          {leftArrowShow && (
            <div className="pointer-events-none absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-gray-800 to-transparent z-20" />
          )}
          {/*Right Fade Effect*/}
          {rightArrowShow && (
            <div className="pointer-events-none absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-gray-800 to-transparent z-20" />
          )}
          {/*Conditional render for when chevron arrow should hide when reaching max scroll point for either side*/}
          {/*Left Arrow Chevron*/}
          {leftArrowShow && (
            <div
              onClick={handleScrollLeft}
              className="absolute -left-12 top-1/2 -translate-y-1/2 z-30 cursor-pointer"
            >
              <ChevronLeftIcon />
            </div>
          )}
          {/*Right Arrow Chevron*/}
          {rightArrowShow && (
            <div
              onClick={handleScrollRight}
              className="absolute -right-12 top-1/2 -translate-y-1/2 z-30 cursor-pointer"
            >
              <ChevronRightIcon />
            </div>
          )}
          {/*Category tags that will be scrollabe when chevron arrows are pressed. Overflow-hidden goes in here in order for category tags to fade when reaching right before chevron arrow*/}
          <div className="flex-1 overflow-hidden">
            <div
              ref={scrollbarRef}
              className="flex gap-8 pt-2 pb-2 pl-32 pr-32 overflow-x-auto scrollbar-hide whitespace-nowrap overflow-hidden"
            >
              {/*Left ghost spacer*/}
              <div className="shrink-0 w-56" />
              {/*Category tag placeholders*/}
              {CategoryPlaceholder.map((category) => (
                <div
                  key={category.id}
                  className="border border-gray-700 p-2 bg-gray-700 hover:bg-gray-500 px-6 rounded-full min-w-fit"
                >
                  {category.title}
                </div>
              ))}
              {/*Right ghost Spacer*/}
              <div className="shrink-0 w-56" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Category;
