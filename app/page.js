import CategoryNavigation from "./_components/CategoryNavigation";
import MainBanner from "./_components/MainBanner";
import SecondaryBannersGrid from "./_components/SecondaryBannersGrid";

export default function page() {
  return (
    <div>
      <MainBanner />
      <CategoryNavigation />
      <SecondaryBannersGrid />
    </div>
  );
}
