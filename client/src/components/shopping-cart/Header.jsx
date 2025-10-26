import {
  LogOut,
  Menu,
  ShoppingBasket,
  ShoppingCart,
  UserCog,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "../ui/dropdown-menu";

import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser, resetToken } from "@/store/auth-slice";
import CartWrapper from "./CartWrapper";
import { Badge } from "../ui/badge";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";

function MenuItems() {
  const navigate = useNavigate();

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "search"
        ? {
            category: [getCurrentMenuItem.id],
          }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    navigate(getCurrentMenuItem.path);
  }

  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Label
          className="text-sm font-medium cursor-pointer"
          key={menuItem.id}
          onClick={() => {
            handleNavigate(menuItem);
          }}
        >
          {menuItem.label}
        </Label>
      ))}
    </nav>
  );
}
function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openCartSheet, setOpenCartSheet] = useState(false);
  function handleLogout() {
    // dispatch(logoutUser());
    dispatch(resetToken());
    sessionStorage.clear();
    navigate("auth/login");
  }
  useEffect(() => {
    dispatch(fetchCartItems(user?.id));
  }, [dispatch]);
  const { cartItems } = useSelector((state) => state.shoppingCart);

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-2">
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <div className="relative">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setOpenCartSheet(true)}
          >
            <ShoppingCart className="w-6 h-6" />
            <span className="sr-only">User Cart</span>
          </Button>

          {/* Show badge only if there are items */}
          {cartItems?.items?.length > 0 && (
            <Badge className="absolute -top-1 -right-1 px-1.5 py-0 text-[10px] rounded-full bg-red-500 text-white font-semibold">
              {cartItems.items.length}
            </Badge>
          )}
        </div>
        <CartWrapper
          cartItems={cartItems?.items}
          setOpenCartSheet={setOpenCartSheet}
        />
      </Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black">
            <AvatarFallback className="bg-amber-400 font-bold text-amber-900">
              {user?.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>Logged in as {user.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              navigate("/shop/account");
            }}
          >
            <UserCog className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link className="flex gap-2">
          <ShoppingBasket className="h-6 w-6" />
          <span className="font-bold">Ecommerce</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xl p-4">
            <MenuItems />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems />
        </div>
        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
}

export default Header;
