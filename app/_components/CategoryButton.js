import Link from "next/link";

function CategoryButton({ category, icon, to }) {
  return (
    <Link href={to}>
      <button className="px-10 py-5 bg-muted text-xs flex flex-col gap-2 items-center rounded-2xl cursor-pointer">
        {icon}
        <p className="w-[101px]">{category}</p>
      </button>
    </Link>
  );
}

export default CategoryButton;
