import { Button } from "../../components/ui/button";
import { getBanners } from "../_lib/data-service";
import Link from "next/link";

async function MainBanner() {
  const banners = await getBanners();
  const mainBanner = banners.find((banner) => banner.type === "main");

  if (!mainBanner) return null;

  return (
    <div className="bg-gray-950 overflow-hidden">
      <div className=" flex items-center justify-center gap-40">
        <div className="text-white ">
          <h1 className="text-7xl font-thin tracking-wider">
            {mainBanner.title
              .split(" ")
              .slice(0, mainBanner.title.split(" ").length - 1)
              .join(" ")}{" "}
            <span className="font-bold">
              {mainBanner.title
                .split(" ")
                .at(mainBanner.title.split(" ").length - 1)}
            </span>
          </h1>
          <p className="mt-4 text-lg font-thin text-white">
            {mainBanner.description}
          </p>
          <Link href="/products">
            <Button className="mt-10 px-10 py-5 text-xl cursor-pointer">
              Shop Now
            </Button>
          </Link>
        </div>

        <div>
          <img
            src={mainBanner.image_url}
            alt={mainBanner.title || "Main Banner"}
            className=""
          />
        </div>
      </div>
    </div>
  );
}

export default MainBanner;
