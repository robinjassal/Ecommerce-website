import CommonForm from "@/components/common/Form";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
    email: "",
    password: "",
};


function Login() {
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();

    function onsubmit(e) {
        e.preventDefault();
        dispatch(loginUser(formData)).then((data) => {
            if (data?.payload.success) {
                toast.success(data?.payload.message)
            } else {
                toast.error(data?.payload.message)
            }
        });
    };

    return (
        <div className="mx-auto w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foregrounds">
                    Login in to your account
                </h1>
                <p className="mt-2">
                    Don't have an account?
                    <Link
                        to="/auth/register"
                        className="font-medium text-primary hover:underline ml-2"
                    >
                        Signup
                    </Link>
                </p>
            </div>
            <CommonForm
                formControls={loginFormControls}
                formData={formData}
                setFormData={setFormData}
                buttonText={"Login"}
                onSubmit={onsubmit}
            />
        </div>
    );
}

export default Login;
