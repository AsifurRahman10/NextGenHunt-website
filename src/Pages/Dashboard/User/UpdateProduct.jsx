import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { WithContext as ReactTags } from "react-tag-input";
import uploadImg from "../../../assets/uploadImg.jpg";
import { useAuth } from "../../../Hooks/useAuth";
import { Loading } from "../../../Component/Share/Loading";
import { useNavigate, useParams } from "react-router-dom";
import { useAxiosSecure } from "../../../Hooks/useAxiosSecure";
import { uploadImage } from "../../../Api/Utils";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

export const UpdateProduct = () => {
  // const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const navigate = useNavigate();

  const [externalLink, setExternalLink] = useState([]);
  const [uploadedImg, setUploadedImg] = useState(null);
  const [oldData, setOldData] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    axiosSecure(`/product-details/${id}`).then((res) => {
      setOldData(res.data);
      setTags(res.data.allTag);
      setExternalLink(res.data.externalLinks);
      setUploadedImg(res.data.image);
      setValue("productName", res.data.productName);
      setValue("product_description", res.data.product_description);
    });
  }, [id, setUploadedImg]);

  const { productName, product_description, userName, email, userPhoto } =
    oldData;

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      productName: productName || "",
    },
  });
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

  // suggestion
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
  const onSubmit = async (data) => {
    let image;
    if (data.productImage && data.productImage.length > 0) {
      const imageFile = data.productImage[0];
      image = await uploadImage(imageFile);
    } else {
      image = oldData.image;
    }

    const updatedData = {
      productName: data.productName,
      product_description: data.product_description,
      image: image,
      externalLink,
      tags,
      email: oldData.email,
      userPhoto: oldData.userPhoto,
      userName: oldData.userName,
      timestamp: new Date(),
    };
    try {
      await axiosSecure.patch(`/update-product/${id}`, updatedData);
      navigate("/dashboard/my-products");
      Swal.fire({
        title: "Successful",
        text: "You product has been updated successfully",
        icon: "success",
      });
    } catch (error) {}
  };
  return (
    <div>
      <h3 className="text-3xl font-bold">Update Product</h3>
      <Helmet>
        <title>Update Product - NextGenHunt</title>
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
                  {...register("productName", { required: true })}
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
                  defaultValue={product_description}
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
                  src={uploadedImg}
                  alt="Preview"
                  style={{ width: "200px", height: "auto" }}
                />
                <p className="mt-4">Change photo</p>
                <input
                  name="productImage"
                  type="file"
                  accept="image/*"
                  {...register("productImage")}
                  onChange={handleImageChange}
                  className="file-input w-full bg-[#efefef] mt-2"
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
                  defaultValue={userName}
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
                    <img className="" src={userPhoto} alt="" />
                  </div>
                </div>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Owner Email</span>
                </label>
                <input
                  defaultValue={email}
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
            <button className="btn btn-primary block w-1/2 mx-auto text-white">
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
