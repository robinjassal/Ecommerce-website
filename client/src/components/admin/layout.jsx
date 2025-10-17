import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

function AdminLayout() {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex min-h-screen w-full">
            <Sidebar open={open} setOpen={setOpen} />
            <div className="flex flex-1 flex-col">
                <Header open={open} setOpen={setOpen} />
                <main className="flex-1 flex bg-muted/40 md:p-6  flex-col">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default AdminLayout;
