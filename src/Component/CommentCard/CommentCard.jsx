import noImg from "../../assets/noImg.png";

export const CommentCard = ({ comment }) => {
  const { name, photo, comment: userComment } = comment;

  return (
    <div className="mt-6">
      <div className="flex items-start gap-4">
        {/* Image */}
        <img src={photo ? photo : noImg} className="w-12 h-12" alt="" />
        {/* Review content */}
        <div>
          {/* User Info */}
          <p className="font-bold">{name}</p>
          {/* Description */}
          <p className="mt-2">{userComment}</p>
        </div>
      </div>
    </div>
  );
};
