import { Helmet } from "react-helmet-async";
import { Banner } from "../../Component/Banner/Banner";
import { FeatureSection } from "../../Component/FeatureSection/FeatureSection";
import { TrendingProducts } from "../../Component/Trending/TrendingProducts";
import { CouponSlider } from "../../Component/CouponSlider.jsx/CouponSlider";
import { LatestBlog } from "../../Component/LatestBlog/LatestBlog";
import NewsLetter from "../../Component/NewsLetter.jsx/NewsLetter";
import { FAQSection } from "../../Component/FAQ/FAQSection";
import Testimonial from "../../Component/Testimonial/Testimonial";

export const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home - NextGenHunt</title>
      </Helmet>
      <Banner></Banner>
      <FeatureSection></FeatureSection>
      <TrendingProducts></TrendingProducts>
      <LatestBlog />
      <FAQSection />
      <Testimonial />
      <CouponSlider />
      <NewsLetter />
    </div>
  );
};
