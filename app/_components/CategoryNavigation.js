import {
  Camera,
  Computer,
  Gamepad2,
  Headphones,
  SmartphoneIcon,
  WatchIcon,
} from "lucide-react";
import CategoryButton from "./CategoryButton";

function CategoryNavigation() {
  const categories = [
    {
      category: "Phones",
      icon: <SmartphoneIcon />,
      to: "/products?category=phones",
    },
    {
      category: "Smart Watches",
      icon: <WatchIcon />,
      to: "/products?category=smart-watches",
    },
    {
      category: "Cameras",
      icon: <Camera />,
      to: "/products?category=cameras",
    },
    {
      category: "Headphones",
      icon: <Headphones />,
      to: "/products?category=headphones",
    },
    {
      category: "Computers",
      icon: <Computer />,
      to: "/products?category=computers",
    },
    {
      category: "Gaming",
      icon: <Gamepad2 />,
      to: "/products?category=gaming",
    },
  ];
  return (
    <div className="my-20 mx-30">
      <p className="text-lg font-semibold">Browse By Category</p>
      <div className="mt-5 grid grid-cols-6 items-center">
        {categories.map((category) => (
          <CategoryButton
            icon={category.icon}
            category={category.category}
            to={category.to}
            key={category.category}
          />
        ))}
      </div>
    </div>
  );
}

export default CategoryNavigation;
