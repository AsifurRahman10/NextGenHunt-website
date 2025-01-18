import { Banner } from "../../Component/Banner/Banner";
import { FeatureSection } from "../../Component/FeatureSection/FeatureSection";
import { TrendingProducts } from "../../Component/Trending/TrendingProducts";

export const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <FeatureSection></FeatureSection>
      <TrendingProducts></TrendingProducts>
    </div>
  );
};
