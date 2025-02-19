import Swal from "sweetalert2";

export default function NewsLetter() {
  const handleSubscribe = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Good job!",
      text: "You have subscribed to our newsletter",
      icon: "success",
    });
    e.target.reset();
  };
  return (
    <div className="mx-auto">
      <div className=" py-6 md:py-12 lg:py-28 lg:px-16  bg-btnPrimary">
        <div className="xl:flex xl:items-center w-11/12 md:w-9/12 mx-auto">
          <div className="xl:w-0 xl:flex-1">
            <h2 className="text-2xl leading-8 font-extrabold tracking-tight text-white sm:text-3xl sm:leading-9">
              Get the latest updates!
            </h2>
            <p className="mt-3 max-w-3xl text-lg leading-6 text-gray-200">
              Join our newsletter to receive the latest updates, exclusive
              insights, and trending tech news straight to your inbox. Stay
              informed—subscribe now!
            </p>
          </div>
          <div className="mt-8 sm:w-full sm:max-w-md xl:mt-0 xl:ml-8">
            <div id="mc_embed_signup" onSubmit={handleSubscribe}>
              <form className="sm:flex">
                <input
                  className="required rounded-md w-full px-4 py-2 email"
                  placeholder="Enter your email"
                  required
                  type="email"
                />
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                  <button
                    className="w-full flex items-center justify-center px-5 py-3 text-base leading-6
                            font-medium rounded-md text-white bg-indigo-500 focus:ring
                            hover:bg-indigo-400 focus:outline-none focus:bg-indigo-400
                            transition duration-150 ease-in-out"
                    type="submit"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
