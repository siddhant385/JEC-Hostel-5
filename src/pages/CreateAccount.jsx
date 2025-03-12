import React, { useState } from "react";
import { auth, db } from "../firebase"; // Ensure correct Firebase imports
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";



const CreateAccount = () => {
  const {signUp,currentUser} = useAuth()
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    branch: "",
    from: "",
    roomNo: "",
    aadhaarNo: "",
    contactNo: "",
    profilePic: null,
    deletePic:null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePic: e.target.files[0] });
  };


  const uploadImageToImgBB = async (file) => {
    const apiKey = import.meta.env.VITE_IMAGEBB_API_KEY;
    const imageData = new FormData();
    imageData.append("image", file);
  
    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: imageData,
      });
  
      const data = await response.json();
  
      if (data.success) {
        return {
          profilePicUrl: data.data.url,      // Image URL to store
          deleteUrl: data.data.delete_url,   // Delete URL for future deletion
        };
      } else {
        throw new Error("Image upload failed.");
      }
    } catch (error) {
      toast.error("Image upload failed: " + error.message);
      return null;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
  
    try {
      setLoading(true);
      let profilePicData = { profilePicUrl: "", deleteUrl: "" };
  
      if (formData.profilePic) {
        profilePicData = await uploadImageToImgBB(formData.profilePic);
      }
  
      const userCredentials = await signUp(formData.email, formData.password);
      
      await setDoc(doc(db, "users", userCredentials.user.uid), {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        branch: formData.branch,
        from: formData.from,
        roomNo: formData.roomNo,
        aadhaarNo: formData.aadhaarNo,
        contactNo: formData.contactNo,
        profilePic: profilePicData.profilePicUrl, // Store Image URL
        deleteUrl: profilePicData.deleteUrl, // Store Delete URL
      });
  
      toast.success("Account created successfully!");
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };
  

  return (
    <div className="w-100 mb-24 rounded-2xl border-1 mx-auto my-10 p-6 bg-gray-900 flex-col shadow-[0px_0px_23px_21px_rgba(46,88,255,1)] hover:shadow-[0px_0px_23px_21px_rgba(240,0,220,1)]">
      <h2 className="text-green-400 text-center text-3xl my-5">Create Account</h2>
      <form className="w-full flex flex-col p-3" onSubmit={handleSubmit}>
        <input  className="w-75 h-10 bg-gray-950 text-15 text-center border-pink-500 text-amber-50 my-3 mx-5 rounded border-2 hover:shadow-[0px_0px_6px_4px_rgba(234,7,237,1)]" type="text" name="firstName" placeholder="First Name" onChange={handleChange}  />
        <input  className="w-75 h-10 bg-gray-950 text-15 text-center border-pink-500 text-amber-50 my-3 mx-5 rounded border-2 hover:shadow-[0px_0px_6px_4px_rgba(234,7,237,1)]"type="text" name="lastName" placeholder="Last Name" onChange={handleChange} />
        <input  className="w-75 h-10 bg-gray-950 text-15 text-center border-pink-500 text-amber-50 my-3 mx-5 rounded border-2 hover:shadow-[0px_0px_6px_4px_rgba(234,7,237,1)]"type="email" name="email" placeholder="Email Address" onChange={handleChange}  />
        <input  className="w-75 h-10 bg-gray-950 text-15 text-center border-pink-500 text-amber-50 my-3 mx-5 rounded border-2 hover:shadow-[0px_0px_6px_4px_rgba(234,7,237,1)]"type="password" name="password" placeholder="Password" onChange={handleChange} />
        <input  className="w-75 h-10 bg-gray-950 text-15 text-center border-pink-500 text-amber-50 my-3 mx-5 rounded border-2 hover:shadow-[0px_0px_6px_4px_rgba(234,7,237,1)]"type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} />
        <input  className="w-75 h-10 bg-gray-950 text-15 text-center border-pink-500 text-amber-50 my-3 mx-5 rounded border-2 hover:shadow-[0px_0px_6px_4px_rgba(234,7,237,1)]"type="text" name="branch" placeholder="Branch" onChange={handleChange} />
        <input  className="w-75 h-10 bg-gray-950 text-15 text-center border-pink-500 text-amber-50 my-3 mx-5 rounded border-2 hover:shadow-[0px_0px_6px_4px_rgba(234,7,237,1)]"type="text" name="from" placeholder="From" onChange={handleChange} />
        <input  className="w-75 h-10 bg-gray-950 text-15 text-center border-pink-500 text-amber-50 my-3 mx-5 rounded border-2 hover:shadow-[0px_0px_6px_4px_rgba(234,7,237,1)]"type="text" name="roomNo" placeholder="Room No." onChange={handleChange} />
        <input  className="w-75 h-10 bg-gray-950 text-15 text-center border-pink-500 text-amber-50 my-3 mx-5 rounded border-2 hover:shadow-[0px_0px_6px_4px_rgba(234,7,237,1)]"type="text" name="aadhaarNo" placeholder="Aadhaar No." onChange={handleChange} />
        <input  className="w-75 h-10 bg-gray-950 text-15 text-center border-pink-500 text-amber-50 my-3 mx-5 rounded border-2 hover:shadow-[0px_0px_6px_4px_rgba(234,7,237,1)]"type="text" name="contactNo" placeholder="Contact No." onChange={handleChange} />

        {/* Profile Picture Upload */}
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="multiple_files">Upload Profile Pic</label>  
        <input onChange={handleFileChange}  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="multiple_files" type="file" multiple/>


        <button type="submit" disabled={loading} className="bg-blue-800 cursor-pointer text-white py-2 rounded mt-4 hover:bg-blue-600 hover:shadow-[0px_0px_6px_4px_rgba(7,126,237,1)]" onClick={handleSubmit}>{loading ? "Creating..." : "Sign Up"}</button>
      </form>
    </div>
  );
};

export default CreateAccount;
