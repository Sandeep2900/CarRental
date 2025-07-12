import React, { useState } from "react";
import { assets, ownerMenuLinks } from "../../assets/assets";
import { NavLink, useLocation } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const SIdebar = () => {
  const {user, axios, fetchUser} = useAppContext();;
  const location = useLocation();
  const [image, setImage] = useState("");

  const updateImage = async () => {
    try {
      const formData = new FormData()
      formData.append('image', image)

      const {data} = await axios.post('/api/owner/update-image', formData)
      
      if(data.success){
        fetchUser()
        toast.success(data.message)
        setImage('')
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  return (
    <div className="relative min-h-screen md:flex flex-col items-center pt-8 px-4 md:px-6 w-full md:max-w-60 border-r border-borderColor text-sm">
      <div className="group relative w-24 h-24 rounded-full overflow-hidden mb-4">
        <label htmlFor="image" className="cursor-pointer">
          <img
            src={
              image
                ? URL.createObjectURL(image)
                : user?.image ||
                  "https://i.pinimg.com/736x/03/eb/d6/03ebd625cc0b9d636256ecc44c0ea324.jpg"
            }
            alt="Profile"
            className="w-full h-full object-cover"
          />
          <input
            type="file"
            id="image"
            accept="image/*"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
          <div className="absolute inset-0 bg-black/10 hidden group-hover:flex items-center justify-center">
            <img src={assets.edit_icon} alt="edit" />
          </div>
        </label>
      </div>

      {image && (
          <button
            onClick={updateImage}
            className="absolute top-0 right-0 flex p-2 gap-1 bg-primary/10 text-primary cursor-pointer">
         
            Save 
            <img src={assets.check_icon} width={13} alt="save" />

          </button>
        )}

      <p className="mt-2 text-base max-md:hidden text-center">{user?.name}</p>

      <div className="w-full mt-4">
        {ownerMenuLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className={`relative flex items-center gap-2 w-full py-3 pl-4 first:mt-6 ${
              link.path === location.pathname
                ? "bg-primary/10 text-primary"
                : "text-gray-600"
            }`}
          >
            <img
              src={
                link.path === location.pathname
                  ? link.coloredIcon
                  : link.icon
              }
              alt="icon"
            />
            <span className="max-md:hidden">{link.name}</span>
            <div
              className={`${
                link.path === location.pathname ? "bg-primary" : ""
              } w-1.5 h-8 rounded-1`}
            ></div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SIdebar;
