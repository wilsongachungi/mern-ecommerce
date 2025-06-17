import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../../components/loader"
import { Loader } from "../../components/loader"
import { setCredentials } from "../../redux/features/auth/authSlice"
import { toast } from "react-toastify"
import { useRegisterMutation } from "../../redux/api/usersApiSlice"

const Register = () => {
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch();
    constNavigate = useNavigate();

    const [ register, {isLoading}] = useRegisterMutation();
    const {userInfo} = useSelector(state => state.auth)

    const {search} = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    useEffect(() => {
        if(userInfo) {
            navigate(redirect)
        }
    }, [navigate, redirect, userInfo]);
    <section>
        <div className="mr-[4rem] mt-[5rem]">
            <h1 className="text-2xl text-semibold mb-4"></h1>
        </div>
    </section>
} 

export default Register