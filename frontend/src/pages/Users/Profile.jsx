import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import { useProfileMutation } from "../../redux/api/usersApiSlice"



const Profile = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')

    const {userInfo} = useSelector(state => state.auth)
    const [updateProfile, {isLoading: loadingUpdateprofile}] = useProfileMutation()

    useEffect(() => {
        setUsername(userInfo.username)
        setEmail(userInfo.email)
    }, [userInfo.email, userInfo.username]);

    const dispatch = useDispatch();

    const submitHandler = async (e) =>{
        e.preventDefault()

        if(password !== confirmpassword) {
            toast.error('Passwords do not match')
        }else{
            try{
                const res = await updateProfile({_id: userInfo._id, username, email, password}).unwrap
                dispatch(setCredentials({ ...res}))
                toast.success("Profile Updated Successfully");
            }catch (error) {
                toast.error(error?.dats?.message || error.message )
            }
        }

      
    }
    return (
        <div className="container mx-auto p-4 mt-[10rem]">
        <div className="flex justify-center items-center md:space-x-4">
          <div className="md:w-1/3">
            <h2 className="text-2xl font-semibold mb-4 text-black-200">Update Profile</h2>
            <form onSubmit={submitHandler} className="bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="mb-4">
                <label className="block text-white mb-2">Name</label>
                <input
                  className="form-input p-4 rounded-sm w-full"
                  type="text"
                  placeholder="Enter Name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
      
              <div className="mb-4">
                <label className="block text-white mb-2">Email</label>
                <input
                  className="form-input p-4 rounded-sm w-full"
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
      
              <div className="mb-4">
                <label className="block text-white mb-2">Password</label>
                <input
                  className="form-input p-4 rounded-sm w-full"
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
      
              <div className="mb-4">
                <label className="block text-white mb-2">Confirm Password</label>
                <input
                  className="form-input p-4 rounded-sm w-full"
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmpassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="flex justify-between">
                <button type="submit" className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-500">Update</button>
                <Link to="/user-orders" className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700">My Orders</Link>
              </div>
            </form>
          </div>
          {loadingUpdateprofile && <Loader/>}
        </div>
      </div>
      
    )
}

export default Profile;