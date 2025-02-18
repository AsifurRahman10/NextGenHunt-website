import { useForm } from "react-hook-form";
import { WithContext as ReactTags } from "react-tag-input";
import { useAuth } from "../../../Hooks/useAuth";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import uploadImg from "../../../assets/uploadImg.jpg";
import { MdOutlineFileUpload } from "react-icons/md";
import Swal from "sweetalert2";
import { uploadImage } from "../../../Api/Utils";

export default function AddBlog() {
  const { register, handleSubmit, reset, setValue: updateValue } = useForm();
  const { user } = useAuth();
  const [tags, setTags] = useState([]);
  const [externalLink, setExternalLink] = useState([]);
  const [value, setValue] = useState("");
  const [uploadedImg, setUploadedImg] = useState(null);

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
      updateValue("productImage", file);
    }
  };
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
    console.log(imageFile);
    const image = await uploadImage(imageFile);
    const { productImage, ...newData } = data;
    const ProductData = {
      ...newData,
      image,
      externalLinks: externalLink,
      allTag: tags,
      userName: user.displayName,
      email: user.email,
      userPhoto: user.photoURL,
      timestamp: new Date(),
      status: "approved",
    };
  };

  return (
    <div>
      <h2 className="text-3xl font-bold">Add new blog</h2>

      <div className="bg-[#F9f9f9] mt-4">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body p-4">
          <h3 className="text-lg font-semibold">General form</h3>
          <div className="flex gap-6 flex-col lg:flex-row">
            <div className="flex-1">
              {/* product name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Blog title</span>
                </label>
                <input
                  type="text"
                  {...register("productName")}
                  placeholder="blog title"
                  className="input input-bordered bg-[#efefef] border-none"
                  required
                />
              </div>
              {/* product description */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    Blog description
                  </span>
                </label>

                <ReactQuill
                  theme="snow"
                  value={value}
                  onChange={setValue}
                  className="h-[200px] pb-10 bg-[#efefef]"
                />
              </div>
              <div className="flex items-center mt-4 gap-6">
                {/* tags */}
                <div className="flex-1">
                  <h3 className="mb-2">Tags</h3>
                  <ReactTags
                    required
                    tags={tags}
                    handleDelete={handleDelete}
                    handleAddition={handleAddition}
                    handleDrag={handleDrag}
                    delimiters={[188, 13]}
                    placeholder="Add new tag..."
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
                {/* external link */}
                <div className="form-control flex-1">
                  <label className="label">
                    <span className="label-text font-medium">
                      External Links
                    </span>
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
              <p className="mt-4">Upload photo</p>
              <div className="flex items-center justify-center w-full mt-4">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer"
                >
                  {uploadedImg ? (
                    <img
                      src={uploadedImg}
                      alt="Preview"
                      className="w-auto h-full object-contain"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <MdOutlineFileUpload className="text-5xl" />
                      <p className="mb-2 text-sm text-gray-500 dark:text-black">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG, or GIF (MAX. 800x400px)
                      </p>
                    </div>
                  )}
                  <input
                    id="dropzone-file"
                    name="productImage"
                    type="file"
                    accept="image/*"
                    {...register("productImage")}
                    className="hidden"
                  />
                </label>
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
            <button className="btn btn-primary block w-1/2 mx-auto text-white">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
