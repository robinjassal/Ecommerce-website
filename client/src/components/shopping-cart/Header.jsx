import { LogOut, Menu, ShoppingBasket, ShoppingCart, UserCog } from 'lucide-react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { shoppingViewHeaderMenuItems } from '@/config'
import { DropdownMenuLabel, DropdownMenuContent, DropdownMenu, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuItem } from '../ui/dropdown-menu'

import { Avatar, AvatarFallback } from '../ui/avatar'
import { logoutUser } from '@/store/auth-slice'

function MenuItems() {
    return <nav className='flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row'>{
        shoppingViewHeaderMenuItems.map(menuItem => <Link className='text-sm font-medium' key={menuItem.id} to={menuItem.path}>{menuItem.label}</Link>)}</nav>
}
function HeaderRightContent() {
    const { user } = useSelector(state => state.auth)
    const navigate = useNavigate();
    const dispatch = useDispatch()

    function handleLogout() {
        dispatch(logoutUser())
    }

    return (
        <div className="flex lg:items-center lg:flex-row flex-col gap-2">
            <Button variant="outline" size="icon">
                <ShoppingCart className="w-6 h-6" />
                <span className="sr-only">User Cart</span>
            </Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar className="bg-black">
                        <AvatarFallback className="bg-amber-400 font-bold text-amber-900">{user?.userName[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" className="w-56">
                    <DropdownMenuLabel>
                        Logged in as {user.userName}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => { navigate("/shop/account") }}>
                        <UserCog className='mr-2 h-4 w-4' />
                        Account
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className='mr-2 h-4 w-4' />
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

function Header() {

    return (
        <header className='sticky top-0 z-40 w-full border-b bg bg-background'>
            <div className='flex h-16 items-center justify-between px-4 md:px-6'>
                <Link className='flex gap-2'>
                    <ShoppingBasket className='h-6 w-6' />
                    <span className='font-bold'>Ecommerce</span>
                </Link>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="lg:hidden">
                            <Menu className='h-6 w-6' />
                            <span className='sr-only'>Toggle header Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side='left' className="w-full max-w-xl p-4">
                        <MenuItems />
                        <HeaderRightContent />
                    </SheetContent>
                </Sheet>
                <div className='hidden lg:block'>
                    <MenuItems />
                </div>
                <div className='hidden lg:block'>
                    <HeaderRightContent />
                </div>
            </div>
        </header>
    )
}

export default Header