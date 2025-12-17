import Image from "next/image";
import { getBanners } from "../_lib/data-service";

async function SecondaryBannersGrid() {
  const banners = await getBanners();

  const secondaryItems = banners
    .filter((item) => item.type === "secondary")
    .reduce((acc, item) => {
      acc[item.key_name] = item;
      return acc;
    }, {});

  const { secondary_1, secondary_2, secondary_3, secondary_4 } = secondaryItems;

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[600px] ">
      <div className="col-span-2 row-span-2 grid grid-cols-2 overflow-hidden ">
        <div className="col-span-1 relative">
          <Image
            src={secondary_2.image_url}
            width={1000}
            height={1000}
            alt={secondary_2.title}
            className="scale-110 -translate-x-15"
          />
        </div>
        <div className="-translate-x-4 flex flex-col justify-center gap-4">
          <p className="text-5xl font-bold tracking-wide ">
            {secondary_2.title}
          </p>
          <p className="text-xs tracking-wider font-light text-muted-foreground">
            {secondary_2.description}
          </p>
        </div>
      </div>

      <div className="col-span-2 row-span-4 bg-muted grid grid-cols-2 overflow-hidden">
        <div className="flex flex-col gap-5 justify-center items-start ml-16 ">
          <h1 className="text-7xl">{secondary_1.title}</h1>
          <p className="text-xs tracking-wider font-light text-muted-foreground">
            {secondary_1.description}
          </p>
        </div>
        <div className="col-span-1 relative mt-9 flex items-center">
          <Image
            src={secondary_1.image_url}
            width={1000}
            height={1000}
            className="scale-200 translate-x-44"
            alt={secondary_1.title}
          />
        </div>
      </div>

      <div className="col-span-1 row-span-2 bg-muted grid grid-cols-2 overflow-hidden ">
        <div className="col-span-1 relative flex items-center">
          <Image
            src={secondary_3.image_url}
            width={1000}
            height={1000}
            alt={secondary_3.title}
            className="scale-110 -translate-x-25"
          />
        </div>
        <div className="-translate-x-10 flex flex-col justify-center gap-4">
          <p className="text-5xl font-bold tracking-wide ">
            {secondary_3.title}
          </p>
          <p className="text-xs tracking-wider font-light text-muted-foreground">
            {secondary_3.description}
          </p>
        </div>
      </div>

      <div className="col-span-1 row-span-2 bg-muted-foreground grid grid-cols-2 overflow-hidden">
        <div className="col-span-1 relative flex items-center">
          <Image
            src={secondary_4.image_url}
            width={1000}
            height={1000}
            alt={secondary_4.title}
            className="scale-150 -translate-x-20"
          />
        </div>
        <div className="-translate-x-2 flex flex-col justify-center gap-4">
          <p className="text-5xl font-bold tracking-wide text-muted ">
            {secondary_4.title}
          </p>
          <p className="text-xs tracking-wider font-light text-accent-foreground">
            {secondary_4.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SecondaryBannersGrid;
