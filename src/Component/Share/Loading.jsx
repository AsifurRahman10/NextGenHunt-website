import loadingImg from "../../../public/loading.json";
export const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Lottie animationData={loadingImg} loop={true} />;
    </div>
  );
};
