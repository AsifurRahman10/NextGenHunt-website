import Swal from "sweetalert2";
import { useAuth } from "../../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export const SocialLogin = () => {
  const { googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;

  const handleGoogleLogin = async () => {
    try {
      const { user } = await googleLogin();
      const userData = {
        email: user.email,
        name: user.displayName,
        image: user.photoURL,
        role: "user",
      };
      axios
        .post(`${import.meta.env.VITE_DB}/userInfo`, userData)
        .then((res) => {});
      if (state?.from?.pathname) {
        navigate(state.from.pathname);
      } else {
        navigate("/");
      }
      Swal.fire({
        title: "Login successful.",
        icon: "success",
        draggable: true,
      });
    } catch (error) {}
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
