import React from "react";
import { Button } from "../ui/button";
import { AlignJustify, LogOut } from "lucide-react";

function Header({ setOpen }) {
    return (
        <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
            <Button className="lg:hidden sm:block" onClick={() => { setOpen(true) }}>
                <AlignJustify />
                <span className="sr-only">Toggle Menu</span>
            </Button>
            <div className="flex flex-1 justify-end">
                <Button className="inline-flex gap-2 items-center rounded-md">
                    <LogOut />
                    Logout
                </Button>
            </div>
        </header>
    );
}

export default Header;
