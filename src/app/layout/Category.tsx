import { CategoryPlaceholder } from "../components/CategoryTags";

function Category() {
  return (
    <>
      <div className="fixed flex bg-gray-800 top-24 z-40 ml-20 w-full h-16 items-center caret-transparent">
        <div className="flex gap-5 ml-12 bg-gray-800">
          {CategoryPlaceholder.map((category) => (
            <div
              className="border-1 pl-4 pr-4 pt-2 pb-2 items-center bg-gray-700"
              key={category.id}
            >
              {category.title}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Category;
