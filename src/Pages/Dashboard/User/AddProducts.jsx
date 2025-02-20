import React, { useState } from "react";
import { WithContext as ReactTags } from "react-tag-input";
import { useAuth } from "../../../Hooks/useAuth";
import { Loading } from "../../../Component/Share/Loading";
import uploadImg from "../../../assets/uploadImg.jpg";
import { useForm } from "react-hook-form";
import { uploadImage } from "../../../Api/Utils";
import { useAxiosSecure } from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

export const AddProducts = () => {
  const [tags, setTags] = useState([]);
  const axiosSecure = useAxiosSecure();
  const [externalLink, setExternalLink] = useState([]);
  const { user, loading } = useAuth();
  const [uploadedImg, setUploadedImg] = useState(null);
  const navigate = useNavigate();

  // handle tags
  const handleDelete = (index) => {
    setTags(tags.filter((tag, i) => i !== index));
  };
  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };
  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    setTags(newTags);
  };

  // handle external link
  const handleLinkDelete = (index) => {
    setExternalLink(tags.filter((tag, i) => i !== index));
  };
  const handleLinkAddition = (tag) => {
    setExternalLink([...externalLink, tag]);
  };
  const handleLinkDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    setExternalLink(newTags);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const filePreviewUrl = URL.createObjectURL(file);
      setUploadedImg(filePreviewUrl);
    }
  };

  const suggestions = [
    { id: "Web Apps", text: "Web Apps" },
    { id: "AI Tools", text: "AI Tools" },
    { id: "Software", text: "Software" },
    { id: "Games", text: "Games" },
    { id: "Mobile Apps", text: "Mobile Apps" },
    { id: "Cloud Computing", text: "Cloud Computing" },
    { id: "Cybersecurity", text: "Cybersecurity" },
    { id: "Data Analytics", text: "Data Analytics" },
    { id: "Machine Learning", text: "Machine Learning" },
    { id: "Blockchain", text: "Blockchain" },
    { id: "IoT", text: "IoT" },
    { id: "Augmented Reality (AR)", text: "Augmented Reality (AR)" },
    { id: "Virtual Reality (VR)", text: "Virtual Reality (VR)" },
    { id: "DevOps Tools", text: "DevOps Tools" },
    { id: "E-commerce", text: "E-commerce" },
    { id: "SaaS Products", text: "SaaS Products" },
    { id: "Fintech", text: "Fintech" },
    { id: "EdTech", text: "EdTech" },
    { id: "HealthTech", text: "HealthTech" },
  ];

  // handle form
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    if (tags.length <= 0) {
      return Swal.fire({
        icon: "error",
        text: "You must provide at least one tag.",
      });
    }

    if (externalLink.length <= 0) {
      return Swal.fire({
        icon: "error",
        text: "You must provide at least one external link.",
      });
    }

    if (data.productImage.length <= 0) {
      return Swal.fire({
        icon: "error",
        text: "You must upload product image.",
      });
    }
    const imageFile = data.productImage[0];
    const image = await uploadImage(imageFile);
    const { productImage, ...newData } = data;
    const ProductData = {
      ...newData,
      image,
      externalLinks: externalLink,
      allTag: tags,
      upvote: 0,
      userName: user.displayName,
      email: user.email,
      userPhoto: user.photoURL,
      timestamp: new Date(),
      status: "pending",
    };
    try {
      // sent the data to db
      await axiosSecure.post("/add-products", ProductData);
      Swal.fire({
        title: "Success!",
        text: "You product has been added successfully",
        icon: "success",
      });
      navigate("/dashboard/my-products");
      reset();
      setUploadedImg(null);
      setExternalLink([]);
      setTags([]);
    } catch (error) {
      if (error.status === 409) {
        Swal.fire({
          icon: "warning",
          title: "Limit Exceeded",
          text: "You have exceeded your post limit as a free user. Upgrade to premium for unlimited post access.",
          confirmButtonText: "Upgrade Now",
          showCancelButton: true,
          cancelButtonText: "Not Now",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/dashboard/my-profile";
          }
        });
      }
    }
  };

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <h3 className="text-3xl font-bold">Add Product</h3>
      <Helmet>
        <title>Add Product - NextGenHunt</title>
      </Helmet>
      <div className="bg-[#F9f9f9] mt-4">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body p-4">
          <h3 className="text-lg font-semibold">General form</h3>
          <div className="flex gap-6 flex-col lg:flex-row">
            <div className="flex-1">
              {/* product name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Product Name</span>
                </label>
                <input
                  type="text"
                  {...register("productName")}
                  placeholder="Product Name"
                  className="input input-bordered bg-[#efefef] border-none"
                  required
                />
              </div>
              {/* product description */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    Product Description
                  </span>
                </label>
                <textarea
                  {...register("product_description")}
                  className="bg-[#efefef] textarea"
                  placeholder="Product description"
                  rows={9}
                  required
                ></textarea>
              </div>
              {/* tags */}
              <div className="mt-4">
                <h3 className="mb-2">Tags</h3>
                <ReactTags
                  suggestions={suggestions}
                  required
                  tags={tags}
                  handleDelete={handleDelete}
                  handleAddition={handleAddition}
                  handleDrag={handleDrag}
                  delimiters={[188, 13]}
                  placeholder="Add new tag..."
                  autofocus={true}
                  classNames={{
                    tags: "ReactTags__tags bg-[#efefef] flex flex-wrap p-2 rounded-xl", // Custom CSS class + Tailwind classes
                    tagInput:
                      "ReactTags__tagInput relative w-full border-2 rounded-md", // Custom CSS class + Tailwind classes
                    tagInputField:
                      "ReactTags__tagInputField bg-white w-full p-3 rounded-md text-lg transition-all", // Custom CSS class + Tailwind classes
                    selected: "ReactTags__selected flex flex-wrap gap-2 py-2", // Custom CSS class + Tailwind classes
                    tag: "ReactTags__tag bg-btnPrimary text-white px-4 py-2 rounded-full text-sm flex items-center gap-2", // Custom CSS class + Tailwind classes
                    remove:
                      "ReactTags__remove text-white hover:text-red-400 cursor-pointer", // Custom CSS class + Tailwind classes
                    suggestions:
                      "ReactTags__suggestions absolute bg-white rounded-md w-full mt-1 z-50 shadow-sm", // Custom CSS class + Tailwind classes
                    suggestionActive:
                      "ReactTags__suggestionActive bg-primary text-white px-3 py-2 cursor-pointer", // Custom CSS class + Tailwind classes
                    suggestion:
                      "ReactTags__suggestion px-3 py-2 cursor-pointer hover:bg-gray-100 border-2", // Custom CSS class + Tailwind classes
                  }}
                />
              </div>
              {/* external link */}
              <div className="form-control mt-2">
                <label className="label">
                  <span className="label-text font-medium">External Links</span>
                </label>
                <ReactTags
                  tags={externalLink}
                  handleDelete={handleLinkDelete}
                  handleAddition={handleLinkAddition}
                  handleDrag={handleLinkDrag}
                  delimiters={[188, 13]}
                  placeholder="Add external links"
                  autofocus={true}
                  classNames={{
                    tags: "ReactTags__tags bg-[#efefef] flex flex-wrap p-2 rounded-xl",
                    tagInput:
                      "ReactTags__tagInput relative w-full border-2 rounded-md",
                    tagInputField:
                      "ReactTags__tagInputField bg-white w-full p-3 rounded-md text-lg transition-all",
                    selected: "ReactTags__selected flex flex-wrap gap-2 py-2",
                    tag: "ReactTags__tag bg-btnPrimary text-white px-4 py-2 rounded-full text-sm flex items-center gap-2",
                    remove:
                      "ReactTags__remove text-white hover:text-red-400 cursor-pointer",
                    suggestions:
                      "ReactTags__suggestions absolute bg-white rounded-md w-full mt-1 z-50 shadow-sm",
                    suggestionActive:
                      "ReactTags__suggestionActive bg-primary text-white px-3 py-2 cursor-pointer",
                    suggestion:
                      "ReactTags__suggestion px-3 py-2 cursor-pointer hover:bg-gray-100 border-2",
                  }}
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Product photo</span>
                </label>
                <img
                  src={uploadedImg ? uploadedImg : uploadImg}
                  alt="Preview"
                  style={{ width: "200px", height: "auto" }}
                />
                <input
                  name="productImage"
                  type="file"
                  accept="image/*"
                  {...register("productImage")}
                  onChange={handleImageChange}
                  className="file-input w-full bg-[#efefef] mt-6"
                />
              </div>

              {/* product owner info */}
              <h3 className="text-lg font-semibold mt-10">
                Product Owner Info
              </h3>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Owner Name</span>
                </label>
                <input
                  disabled
                  defaultValue={user?.displayName}
                  type="text"
                  placeholder="Owner Name"
                  className="input input-bordered bg-[#efefef] border-none"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Owner Photo</span>
                </label>
                <div className="avatar">
                  <div className="w-24 rounded-full">
                    <img className="" src={user?.photoURL} alt="" />
                  </div>
                </div>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Owner Email</span>
                </label>
                <input
                  defaultValue={user?.email}
                  type="text"
                  placeholder="Owner Name"
                  className="input input-bordered bg-[#efefef] border-none"
                  required
                  disabled
                />
              </div>
            </div>
          </div>

          <div className="form-control mt-6">
            <button
              type="submit"
              className="relative group cursor-pointer text-sky-50  overflow-hidden h-10 w-1/2 mx-auto rounded-md bg-btnPrimary p-2 flex justify-center items-center font-extrabold"
            >
              <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-40 h-40 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-[#5030ce]"></div>
              <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-32 h-32 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-[#452ab0]"></div>
              <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-24 h-24 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-[#37228b]"></div>
              <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-14 h-14 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-[#2b1a6c]"></div>
              <p className="z-10 flex justify-center items-center gap-2 font-semibold">
                Add Product
              </p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
