import CommonForm from "@/components/common/Form";
import { registerFormControls } from "@/config";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const initialState = {
    userName: "",
    email: "",
    password: "",
};
const onsubmit = () => { };

function Register() {
    const [formData, setFormData] = useState(initialState);
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
                onsubmit={onsubmit}
            />
        </div>
    );
}

export default Register;
