import CommonForm from "@/components/common/Form";
import { loginFormControls } from "@/config";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const initialState = {
    email: "",
    password: "",
};
const onsubmit = () => { };

function Login() {
    const [formData, setFormData] = useState(initialState);
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
                onsubmit={onsubmit}
            />
        </div>
    );
}

export default Login;
