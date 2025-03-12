import React, { use, useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { UserProvider,useUser } from '../contexts/userContext'
import ItemCard from '../components/ItemCard'
import SearchComponent from '../components/searchComponent'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'

const Dash = () => {
  const { users } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("name");

  const filteredUsers = users.filter((user) => {
    if (!searchTerm) return true;
    const value = user[filterType]?.toLowerCase() || "";
    return value.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="m-auto flex-col">
      <SearchComponent 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        filterType={filterType} 
        setFilterType={setFilterType} 
      />
      <div className="m-auto mt-6 grid grid-cols-3 gap-4 gap-y-6">
        {filteredUsers.map((user) => (
          <ItemCard
            key={user.id}
            name={user.name}
            from={user.from}
            branch={user.branch}
            contactNo={user.contactNo}
            profilePic={user.profilePic}
          />
        ))}
      </div>
    </div>
  );
};

const Settings = () =>{
  const {updatemail,updatepassword,currentUser} = useAuth()
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
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        firstName: currentUser.firstName || "",
        lastName: currentUser.lastName || "",
        email: currentUser.email || "",
        branch: currentUser.branch || "",
        from: currentUser.from || "",
        roomNo: currentUser.roomNo || "",
        aadhaarNo: currentUser.aadhaarNo || "",
        contactNo: currentUser.contactNo || "",
        profilePic: currentUser.profilePic || null,
      });
    }
  }, [currentUser]);



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePic: e.target.files[0] });
  };

  const deleteImageFromImgBB = async (deleteUrl) => {
    try {
      console.log(deleteUrl)
      window.open(deleteUrl, "_blank"); // Opens delete page in a new tab
      toast.info("Please confirm deletion of current profilePic in the new tab.");
    } catch (error) {
      toast.error("Error deleting profile picture:", error);
    }
  };
  
  
  const uploadImageToImgBB = async (file) => {
    if (!file) return formData.profilePic; // Keep existing profile picture if no new upload
    const apiKey = import.meta.env.VITE_IMAGEBB_API_KEY;
    const imageData = new FormData();
    imageData.append("image", file);

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: imageData,
      });
      const data = await response.json();
      // deleteImageFromImgBB(currentUser.deleteUrl)
      return data.data.url;
    } catch (error) {
      toast.error("Image upload failed");
      return formData.profilePic; // Keep existing profile picture if upload fails
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let profilePicUrl = await uploadImageToImgBB(formData.profilePic);

      // Update Firestore User Data
      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        branch: formData.branch,
        from: formData.from,
        roomNo: formData.roomNo,
        aadhaarNo: formData.aadhaarNo,
        contactNo: formData.contactNo,
        profilePic: profilePicUrl,
      });

      // Update Firebase Auth Email if changed
      if (formData.email !== currentUser.email) {
        await updatemail(formData.email);
      }

      // Update Firebase Auth Password if provided
      if (formData.password && formData.password === formData.confirmPassword) {
        await updatepassword(formData.password);
      }

      toast.success("Account updated successfully!");
      navigate("/dashboard"); // Redirect after update
    } catch (error) {
      toast.error(error.message);
    }

    setLoading(false);
  };


  return (
    <div className='flex-col w-full pb-20'>
      <div className="w-100 mb-24 rounded-2xl border-1 mx-auto my-10 p-6 bg-gray-900 flex-col shadow-[0px_0px_23px_21px_rgba(46,88,255,1)] hover:shadow-[0px_0px_23px_21px_rgba(240,0,220,1)]">
        <h2 className="text-green-400 text-center text-3xl my-5">Modify Account</h2>
        <div className='overflow-hidden m-auto'>
          <img className="h-50 w-40 m-auto" src={currentUser.profilePic} />
        </div>
        <form className="w-full flex flex-col p-3" onSubmit={handleSubmit}>
          <input className="w-75 h-10 bg-gray-950 text-15 text-center border-pink-500 text-amber-50 my-3 mx-5 rounded border-2 hover:shadow-[0px_0px_6px_4px_rgba(234,7,237,1)]"
            type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />

          <input className="w-75 h-10 bg-gray-950 text-15 text-center border-pink-500 text-amber-50 my-3 mx-5 rounded border-2 hover:shadow-[0px_0px_6px_4px_rgba(234,7,237,1)]"
            type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />

          <input className="w-75 h-10 bg-gray-950 text-15 text-center border-pink-500 text-amber-50 my-3 mx-5 rounded border-2 hover:shadow-[0px_0px_6px_4px_rgba(234,7,237,1)]"
            type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} />

          <input className="w-75 h-10 bg-gray-950 text-15 text-center border-pink-500 text-amber-50 my-3 mx-5 rounded border-2 hover:shadow-[0px_0px_6px_4px_rgba(234,7,237,1)]"
            type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />

          <input className="w-75 h-10 bg-gray-950 text-15 text-center border-pink-500 text-amber-50 my-3 mx-5 rounded border-2 hover:shadow-[0px_0px_6px_4px_rgba(234,7,237,1)]"
            type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />

          <input className="w-75 h-10 bg-gray-950 text-15 text-center border-pink-500 text-amber-50 my-3 mx-5 rounded border-2 hover:shadow-[0px_0px_6px_4px_rgba(234,7,237,1)]"
            type="text" name="branch" placeholder="Branch" value={formData.branch} onChange={handleChange} />

          <input className="w-75 h-10 bg-gray-950 text-15 text-center border-pink-500 text-amber-50 my-3 mx-5 rounded border-2 hover:shadow-[0px_0px_6px_4px_rgba(234,7,237,1)]"
            type="text" name="from" placeholder="From" value={formData.from} onChange={handleChange} />

          <input className="w-75 h-10 bg-gray-950 text-15 text-center border-pink-500 text-amber-50 my-3 mx-5 rounded border-2 hover:shadow-[0px_0px_6px_4px_rgba(234,7,237,1)]"
            type="text" name="roomNo" placeholder="Room No." value={formData.roomNo} onChange={handleChange} />

          <input className="w-75 h-10 bg-gray-950 text-15 text-center border-pink-500 text-amber-50 my-3 mx-5 rounded border-2 hover:shadow-[0px_0px_6px_4px_rgba(234,7,237,1)]"
            type="text" name="aadhaarNo" placeholder="Aadhaar No." value={formData.aadhaarNo} onChange={handleChange} />

          <input className="w-75 h-10 bg-gray-950 text-15 text-center border-pink-500 text-amber-50 my-3 mx-5 rounded border-2 hover:shadow-[0px_0px_6px_4px_rgba(234,7,237,1)]"
            type="text" name="contactNo" placeholder="Contact No." value={formData.contactNo} onChange={handleChange} />

        {/* Profile Picture Upload */}
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="multiple_files">Change Profile Pic</label>  
        <input onChange={handleFileChange}  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="multiple_files" type="file" multiple/>


        <button type="submit" disabled={loading} className="bg-blue-800 cursor-pointer text-white py-2 rounded mt-4 hover:bg-blue-600 hover:shadow-[0px_0px_6px_4px_rgba(7,126,237,1)]" onClick={handleSubmit}>{loading ? "Creating..." : "Update"}</button>
      </form>
    </div>

    </div>
  )
}



const Dashboard = () => {
  const {currentUser} = useAuth()
  const [active, setActive] = useState('dashboard');

  return (
    <UserProvider>
    <div className='flex'>
      <div className='w-50 h-screen bg-gray-900'>
        <div onClick={()=>setActive('dashboard')} className={`h-15 p-3 margin-auto cursor-pointer ${active === "dashboard"? "bg-red-500 text-black":" text-red-500"} rounded-2xl m-2 border-blue-500 border-4 shadow-[0px_0px_5px_3px_rgba(255,46,88,1)]`}>
          <p className='text-center rounded-2xl '>Dashboard</p>
        </div>
        <hr className=' h-1 mb-3 mt-3'/>
        <div onClick={()=>setActive('settings')} className={`h-15 p-3 margin-auto cursor-pointer rounded-2xl m-2 ${active === "settings"? "bg-red-500 text-black":" text-red-500"} border-blue-500 border-4 shadow-[0px_0px_5px_3px_rgba(255,46,88,1)]`}>
          <p className='text-center rounded-2xl '>Settings</p>
        </div>
        <hr className=' h-1 mb-3 mt-3'/>
        
        <hr className=' h-1 mb-3 mt-3'/>
      </div>
      <div className='w-full h-screen bg-black'>
        <p className='text-white'>{currentUser !== null ?currentUser.name:"Login to see"}</p>
        {active === "dashboard"? <Dash/>:null}
        {active === "settings"? <Settings/>:null}
        

      </div>
    </div>
    </UserProvider>
  )
}

export default Dashboard
