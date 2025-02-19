import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "./slider.css";
import { Navigation, Autoplay } from "swiper/modules";

import bgImg from "../../assets/couponBg.jpg";
import { useEffect, useState } from "react";
import { useAxiosSecure } from "../../Hooks/useAxiosSecure";
import moment from "moment";

export const CouponSlider = () => {
  const [couponData, setCouponData] = useState([]);
  const axiosSecure = useAxiosSecure();
  const validCoupons = couponData.filter((coupon) => {
    return moment(coupon.expireDate).isAfter(moment(), "day");
  });
  useEffect(() => {
    axiosSecure.get("/all-coupons").then((res) => {
      setCouponData(res.data);
    });
  }, []);
  return (
    <div className="w-full  lg:w-8/12 mx-auto h-[250px] lg:h-[400px]">
      <Swiper
        navigation={true}
        modules={[Navigation, Autoplay]}
        className="mySwiper"
      >
        {validCoupons.map((item) => (
          <SwiperSlide key={item._id}>
            <img className="bg-cover" src={bgImg} alt="" />
            <div className="absolute w-full rounded-lg shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow h-[350px] mt-16 md:left-0 bg-white/65 md:bg-transparent lg:bg-transparent">
              <p className="text-gray-600 text-sm md:text-base md:mb-4 mt-3 md:mt-0 ">
                {item.couponDescription.slice(0, 80)}...
              </p>
              <h3 className="text-xl md:text-3xl font-bold text-blue-600 mb-2">
                Get {(parseInt(item.discountAmount) / 20) * 100}% OFF in our
                subscription!
              </h3>
              <h1 className="text-2xl md:text-4xl font-black text-gray-800 mb-4 py-2 bg-[#EAEAEA] border-2 border-gray-500 border-dashed w-1/2 md:w-1/3 mx-auto lg:my-4">
                {item.couponCode}
              </h1>
              <p className="text-gray-500 text-sm md:text-base">
                <span className="font-medium text-gray-700">Expires on:</span>{" "}
                {moment(item.expireDate).format("MMMM D, YYYY")}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
