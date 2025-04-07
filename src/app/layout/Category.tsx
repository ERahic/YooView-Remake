import { CategoryPlaceholder } from "../components/CategoryTags";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

function Category() {
  return (
    <>
      <div className="fixed top-24.5 z-40 left-24 overflow-x-hidden">
        <div>
          {/*Left Arrow */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2">
            <ChevronLeftIcon></ChevronLeftIcon>
          </div>
          <div className="flex gap-10 bg-gray-800 pl-6 pr-6">
            {/*Placeholder tags */}
            {CategoryPlaceholder.map((category) => (
              <div
                className="border-gray-700 p-3 items-center flex bg-gray-700 hover:bg-gray-500"
                key={category.id}
              >
                {category.title}
              </div>
            ))}
          </div>
          {/*Right Arrow */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2">
            <ChevronRightIcon></ChevronRightIcon>
          </div>
        </div>
      </div>
    </>
  );
}

export default Category;
