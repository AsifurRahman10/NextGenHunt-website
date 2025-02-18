import { Rating } from "@smastrom/react-rating";
import image from "../../assets/couponBg.jpg";
import { ReviewCard } from "../../Component/ReviewCard/ReviewCard";
import { HiMiniPaperAirplane } from "react-icons/hi2";
import { useAuth } from "../../Hooks/useAuth";
import { FaCommentDots } from "react-icons/fa";

export default function BlogDetails() {
  const { user } = useAuth();
  const product = {
    // image: img,
    productName: "Awesome Product",
    product_description:
      "This is an amazing product that solves all your problems with ease.",
    externalLinks: [
      {
        id: "7",
        text: "https://zoom.us",
      },
    ],
    allTag: [
      {
        id: "1",
        text: "Development",
      },
      {
        id: "2",
        text: "Git",
      },
      {
        id: "3",
        text: "Open Source",
      },
    ],
    userName: "JohnDoe",
    email: "johndoe@example.com",
    userPhoto: "https://example.com/user.jpg",
    _id: "1234567890abcdef",
  };

  const reviews = [
    {
      _id: "68c56e0754c1d6154949b651",
      name: "John Doe",
      photo:
        "https://lh3.googleusercontent.com/a/ACg8ocJxYZtTkExHvbaWB2W9kuUW7IZKuas-Bes1oxEmZsWXxj0GNukr=s96-c",
      review: "This product is amazing! It exceeded my expectations.",
      rating: 5,
      productId: "6892ef78740cf995g794gb3g",
    },
    {
      _id: "79d67f1865d2e7265a5ac762",
      name: "Jane Smith",
      photo:
        "https://lh3.googleusercontent.com/a/ACg8ocKyXZtTkExHvbaWB2W9kuUW7IZKuas-Bes1oxEmZsWXxj0GNukr=s96-c",
      review: "Good product, but it could be improved in a few areas.",
      rating: 4,
      productId: "6791df67630bf984f683fa2f",
    },
    {
      _id: "89e78g2976e3f8376b6bd873",
      name: "Alice Johnson",
      photo:
        "https://lh3.googleusercontent.com/a/ACg8ocLzZtTkExHvbaWB2W9kuUW7IZKuas-Bes1oxEmZsWXxj0GNukr=s96-c",
      review: "Not bad, but I expected better quality for the price.",
      rating: 3,
      productId: "6892ef78740cf995g794gb3g",
    },
  ];

  return (
    <div className="w-11/12 lg:w-9/12 mx-auto pt-6 pb-10">
      {/* author description */}
      <div className="flex items-center text-[15px] gap-1 mt-[1.25rem] justify-center">
        <h5 className="text-btnPrimary font-semibold">Author name</h5>
        <p className="space-x-1 text-gray-600">
          <span>on</span> Publish date
        </p>
      </div>
      {/* title */}
      <h3 className="text-5xl font-bold my-4 text-center text-black">
        Business Travel Tools for the Digital Age productName
      </h3>
      {/* tags */}
      <div className="flex flex-wrap gap-2 mt-4 justify-center">
        {product?.allTag.map((item, idx) => (
          <div
            key={idx}
            className="badge badge-neutral font-semibold  text-gray-600 border-none rounded-md px-2 py-1 text-sm bg-[#f0f0f2]"
          >
            {item?.text}
          </div>
        ))}
      </div>

      {/* image */}

      <img
        src={image}
        className="rounded-lg mt-8 h-[700px] w-full object-cover"
        alt=""
      />
      <p className="mt-6 text-lg text-gray-800">
        Dive deep into the world of technology with our in-depth software blog
        posts. Each article provides comprehensive insights into the latest
        tools, emerging trends, and industry innovations. Whether it's AI
        advancements, groundbreaking startups, or software development best
        practices, we cover it all. Key highlights of our blog posts: ✅
        Detailed Analysis – Explore in-depth reviews and technical breakdowns.
        ✅ Industry Trends – Stay updated on the latest shifts in software and
        technology. ✅ Expert Opinions – Gain insights from tech professionals
        and industry leaders. ✅ Community Discussions <br /> – Engage with
        other readers, share your thoughts, and ask questions. Stay ahead in the
        tech space by exploring our latest blogs! 🚀 practices, we cover it all.
        Key highlights of our blog posts: ✅ Detailed Analysis – Explore
        in-depth reviews and technical breakdowns. ✅ Industry Trends – Stay
        updated on the latest shifts in software and technology. ✅ Expert
        Opinions – Gain insights from tech professionals and industry leaders.
        ✅ Community Discussions – Engage with other readers, share your
        thoughts, and ask questions. Stay ahead in the tech space by exploring
        our latest blogs! 🚀
      </p>

      {/* comment section */}

      <div className="divider"></div>

      {/* Post a review */}
      <h2 className="text-2xl font-bold mb-4">Leave a comment</h2>
      <div className="relative">
        <textarea
          // value={review}
          // onChange={(e) => setReview(e.target.value)}
          className="textarea textarea-bordered w-full mt-4"
          placeholder="Share your comment"
          rows={6}
        ></textarea>
        <button
          // onClick={handleReview}
          className="btn btn-outline border-btnPrimary px-8 absolute bottom-4 left-4"
        >
          <FaCommentDots className="text-lg" />
          Comment
        </button>
      </div>
      <div className="flex items-center gap-2 justify-end my-4 lg:my-2">
        <h4 className=" text-gray-500">Posting as {user.displayName}</h4>
        <div className="avatar">
          <div className="w-12 rounded-full">
            <img src={user.photoURL} alt="" />
          </div>
        </div>
      </div>

      {/* Show reviews */}
      <h4 className="my-2 lg:my-4 font-bold">View Comments (3)</h4>
      {reviews.length > 0 ? (
        <>
          {reviews.map((review) => (
            <ReviewCard key={review._id} review={review}></ReviewCard>
          ))}
        </>
      ) : (
        <p>No reviews yet. Be the first to share your thoughts!</p>
      )}
    </div>
  );
}
