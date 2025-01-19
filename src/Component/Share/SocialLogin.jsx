import Swal from "sweetalert2";
import { useAuth } from "../../Hooks/useAuth";

export const SocialLogin = () => {
  const { googleLogin } = useAuth();
  const handleGoogleLogin = () => {
    googleLogin().then((res) => {
      console.log(res);
    });
  };
  return (
    <>
      <button
        onClick={handleGoogleLogin}
        className="inline-flex rounded-full h-14 w-full items-center justify-center gap-2 border-2 border-gray-200 p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          className="h-[20px] w-[20px]"
        />
        Continue with Google
      </button>
    </>
  );
};
