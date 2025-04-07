import { CategoryPlaceholder } from "../components/CategoryTags";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

function Category() {
  return (
    <>
      <div className="fixed flex bg-gray-800 top-24.5 z-40 w-full h-16 items-center caret-transparent left-24">
        <div className="debug relative w-full overflow-hidden">
          <div className="flex gap-5 ml-20 bg-gray-800">
            {/*Placeholder tags */}
            {CategoryPlaceholder.map((category) => (
              <div
                className="border-1 p-2 items-center flex bg-gray-700 hover:bg-amber-50"
                key={category.id}
              >
                {category.title}
              </div>
            ))}
            {/*Left Arrow*/}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 z-30 p-3 bg-red-800">
              <ChevronLeftIcon />
            </div>
            {/*Right Arrow*/}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 z-30 p-3 bg-red-800">
              <ChevronRightIcon />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Category;
