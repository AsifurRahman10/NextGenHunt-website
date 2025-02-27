import noImg from "../../assets/noImg.png";
import { Rating } from "@smastrom/react-rating";

export const ReviewCard = ({ review }) => {
  const { name, photo, review: userReview, rating } = review;

  return (
    <div className="mt-6">
      <div className="flex items-start gap-4">
        {/* Image */}
        <img src={photo ? photo : noImg} className="w-12 h-12" alt="" />
        {/* Review content */}
        <div>
          {/* User Info */}
          <p className="font-bold">{name}</p>
          <p className="flex text-2xl text-yellow-400">
            <Rating style={{ maxWidth: 100 }} value={rating} isRequired />
          </p>
          {/* Description */}
          <p className="mt-2">{userReview}</p>
        </div>
      </div>
    </div>
  );
};
