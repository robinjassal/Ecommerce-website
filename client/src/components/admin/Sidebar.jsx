import { ChartNoAxesCombined } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { LayoutDashboard, PackageSearch, ShoppingCart } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';

const adminSideBarMenuItems = [
    {
        id: "dashboard",
        label: "Dashboard",
        path: "/admin/dashboard",
        icon: <LayoutDashboard />,
    },
    {
        id: "products",
        label: "Products",
        path: "/admin/products",
        icon: <PackageSearch />,
    },
    {
        id: "orders",
        label: "Orders",
        path: "/admin/orders",
        icon: <ShoppingCart />,
    },
];


function MenuItems({ setOpen = null }) {
    const navigate = useNavigate()

    return (
        <nav className="mt-8 flex flex-col gap-2">
            {adminSideBarMenuItems.map((menuItems) => (
                <div className="flex cursor-pointer text-xl items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground" key={menuItems.id}
                    onClick={() => {
                        navigate(menuItems.path)
                        setOpen(false);
                    }
                    }
                >
                    {menuItems.icon}
                    <span>{menuItems.label}</span>
                </div>
            ))}
        </nav>
    );
}

function Sidebar({ open, setOpen }) {
    const navigate = useNavigate()
    return (
        <>

            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent side="left" className="w-64">
                    <div className="flex flex-col h-full">
                        <SheetHeader className="border-b">
                            <SheetTitle className="flex gap-2 mt-5 mb-5">
                                <ChartNoAxesCombined size={30} />
                                <h1 className="text-2xl font-extrabold">Admin Panel</h1>
                            </SheetTitle>
                        </SheetHeader>
                        <MenuItems setOpen={setOpen} />
                    </div>
                </SheetContent>
            </Sheet>

            <aside className='hidden w-64 flex-col border-r bg-background p-6 lg:flex'>
                <div className='flex items-center gap-2 cursor-pointer' onClick={() => navigate("/admin/dashboard")}>
                    <ChartNoAxesCombined size={30} />
                    <h1 className='text-xl font-bold'>Admin</h1>
                </div>
                <MenuItems setOpen={setOpen} />
            </aside>
        </>
    )
}

export default Sidebar