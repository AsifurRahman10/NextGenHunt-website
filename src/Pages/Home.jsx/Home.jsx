import { Helmet } from "react-helmet-async";
import { Banner } from "../../Component/Banner/Banner";
import { FeatureSection } from "../../Component/FeatureSection/FeatureSection";
import { TrendingProducts } from "../../Component/Trending/TrendingProducts";
import { CouponSlider } from "../../Component/CouponSlider.jsx/CouponSlider";

export const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home - NextGenHunt</title>
      </Helmet>
      <Banner></Banner>
      <FeatureSection></FeatureSection>
      <TrendingProducts></TrendingProducts>
      <CouponSlider />
    </div>
  );
};
