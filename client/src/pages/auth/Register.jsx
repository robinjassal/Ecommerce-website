import CommonForm from "@/components/common/Form";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
    userName: "",
    email: "",
    password: "",
};

function Register() {
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function onSubmit(e) {
        e.preventDefault();
        dispatch(registerUser(formData)).then((data) => {
            if (data?.payload?.success) {
                toast.success(data.payload.message);
                navigate("/auth/login");
            } else {
                toast.dismiss();
                toast.error(data?.payload?.message || "Something went wrong");
            }
        });
    }

    return (
        <div className="mx-auto w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foregrounds">
                    Create new account
                </h1>
                <p className="mt-2">
                    Already have an account?
                    <Link
                        to="/auth/login"
                        className="font-medium text-primary hover:underline ml-2"
                    >
                        Login
                    </Link>
                </p>
            </div>
            <CommonForm
                formControls={registerFormControls}
                formData={formData}
                setFormData={setFormData}
                buttonText={"Sign Up"}
                onSubmit={onSubmit}
            />
        </div>
    );
}

export default Register;
