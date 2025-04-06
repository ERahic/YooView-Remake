import { CategoryPlaceholder } from "../components/CategoryTags";

function Category() {
  return (
    <>
      <div className="fixed flex bg-amber-700 top-24 z-40 debug ml-20 w-full h-16 items-center">
        <div className="flex gap-5 ml-5">
          {CategoryPlaceholder.map((category) => (
            <div key={category.id}>{category.title}</div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Category;
