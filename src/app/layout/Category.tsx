import { CategoryPlaceholder } from "../components/CategoryTags";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

function Category() {
  return (
    <>
      <div className="debug fixed bg-gray-800 top-24.5 z-40 h-20 caret-transparent">
        <div className="debug">
          <div className="">
            {/*Placeholder tags */}
            {CategoryPlaceholder.map((category) => (
              <div
                className="border-1 border-gray-700 p-3 items-center flex bg-gray-700 hover:bg-gray-500"
                key={category.id}
              >
                {category.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Category;
