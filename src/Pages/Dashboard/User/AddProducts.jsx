import React, { useState } from "react";
import { WithContext as ReactTags } from "react-tag-input";
import "./AddProduct.css";
import { useAuth } from "../../../Hooks/useAuth";
import { Loading } from "../../../Component/Share/Loading";

export const AddProducts = () => {
  const [tags, setTags] = useState([]);
  const [externalLink, setExternalLink] = useState([]);
  const { user, loading } = useAuth();
  console.log(externalLink);
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

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <h3 className="text-3xl font-bold">Add Products</h3>
      <div className="bg-[#F9f9f9] mt-4">
        <form className="card-body p-4">
          <h3 className="text-lg font-semibold">General form</h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Product Name</span>
            </label>
            <input
              type="text"
              placeholder="Product Name"
              className="input input-bordered bg-[#efefef] border-none"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">
                Product Description
              </span>
            </label>
            <textarea
              className="bg-[#efefef] textarea"
              placeholder="Product description"
              rows={5}
            ></textarea>
          </div>
          <div className="mt-2">
            <h3>Tags</h3>
            <ReactTags
              suggestions={suggestions}
              tags={tags}
              handleDelete={handleDelete}
              handleAddition={handleAddition}
              handleDrag={handleDrag}
              delimiters={[188, 13]}
              placeholder="Add new tag..."
              autofocus={true}
              classNames={{
                tags: "ReactTags__tags bg-[#f8f9fa] p-4 rounded-lg shadow mt-2",
                tagInput:
                  "ReactTags__tagInput relative border-2 w-[500px] rounded",
                tagInputField:
                  "ReactTags__tagInputField textarea bg-white rounded-md w-full text-lg p-3 transition-all",
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
          <div className="form-control">
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
                tags: "ReactTags__tags bg-[#f8f9fa] p-4 rounded-lg shadow mt-2",
                tagInput:
                  "ReactTags__tagInput relative border-2 w-[500px] rounded",
                tagInputField:
                  "ReactTags__tagInputField textarea bg-white rounded-md w-full text-lg p-3 transition-all",
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

          {/* product owner info */}
          <h3 className="text-lg font-semibold mt-6">Product Owner Info</h3>
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
          <div className="form-control mt-6">
            <button className="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};
