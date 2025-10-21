import ProductTile from "@/components/shopping-cart/ProductTile";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { addTocart, fetchCartItems } from "@/store/shop/cart-slice";
import {
  fetchAllFilterProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  User,
  User2,
  Baby,
  Watch,
  Footprints,
  FlameIcon,
  StarIcon,
  BadgePercent,
  Shirt,
  Gem,
  ShoppingBag,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
  const slides = [
    {
      img: "https://cdn.pixabay.com/photo/2019/03/21/15/18/shop-4071232_1280.png",
    },
    {
      img: "https://cdn.pixabay.com/photo/2020/09/06/02/42/laptop-5547838_1280.jpg",
    },
    {
      img: "https://cdn.pixabay.com/photo/2024/07/22/09/20/fashion-8912221_1280.png",
    },
  ];
  const categories = [
    {
      id: "men",
      label: "Men",
      icon: <User className="w-8 h-8 text-blue-500" />,
    },
    {
      id: "women",
      label: "Women",
      icon: <User2 className="w-8 h-8 text-pink-500" />,
    },
    {
      id: "kids",
      label: "Kids",
      icon: <Baby className="w-8 h-8 text-yellow-500" />,
    },
    {
      id: "accessories",
      label: "Accessories",
      icon: <Watch className="w-8 h-8 text-green-500" />,
    },
    {
      id: "footwear",
      label: "Footwear",
      icon: <Footprints className="w-8 h-8 text-purple-500" />,
    },
  ];

  const brands = [
    {
      id: "nike",
      label: "Nike",
      icon: <FlameIcon className="w-8 h-8 text-orange-500" />,
    },
    {
      id: "adidas",
      label: "Adidas",
      icon: <StarIcon className="w-8 h-8 text-blue-500" />,
    },
    {
      id: "puma",
      label: "Puma",
      icon: <BadgePercent className="w-8 h-8 text-red-500" />,
    },
    {
      id: "levi",
      label: "Levi's",
      icon: <Shirt className="w-8 h-8 text-indigo-500" />,
    },
    {
      id: "zara",
      label: "Zara",
      icon: <Gem className="w-8 h-8 text-purple-500" />,
    },
    {
      id: "h&m",
      label: "H&M",
      icon: <ShoppingBag className="w-8 h-8 text-pink-500" />,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.shopProducts);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000); // change slide every 3 seconds

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    dispatch(
      fetchAllFilterProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  function handleNavigateToListingPage(category, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [category.id],
    };
    console.log(currentFilter[section]);
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate("/shop/listing");
  }
  function handleGetProductDetails(getProductId) {
    dispatch(fetchProductDetails(getProductId));
  }
  const handleAddToCart = (e, productId) => {
    e.stopPropagation();
    dispatch(addTocart({ userId: user?.id, productId, quantity: 1 })).then(
      (data) => {
        if (data?.payload?.success) {
          dispatch(fetchCartItems(user?.id));
          toast.success("Added to Cart 🛒");
        } else {
          toast.error("Some error occured");
        }
      }
    );
  };
  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[550px] overflow-hidden">
        {slides.map((banner, i) => (
          <img
            src={banner.img}
            alt="banner"
            key={i + 1}
            className={`absolute left-0 top-0 w-full h-full object-cover transition-opacity duration-1000 ${
              i === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 left-4 transform -translate-y-1/2"
        onClick={() =>
          setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
        }
      >
        <ChevronLeftIcon className="w-4 h-4" />
      </Button>

      {/* Next Button */}
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 right-4 transform -translate-y-1/2"
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
      >
        <ChevronRightIcon className="w-4 h-4" />
      </Button>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="font-bold text-3xl mb-8 text-center">
            Shop by category
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex flex-col items-center justify-center bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() =>
                  handleNavigateToListingPage(category, "category")
                }
              >
                <div className="mb-3">{category.icon}</div>
                <span className="font-medium text-gray-700">
                  {category.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brands.map((brandItem) => (
              <Card
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <div className="mb-3">{brandItem.icon}</div>
                  <span className="font-bold">{brandItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="font-bold text-3xl mb-8 text-center">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-col-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.map((productItem) => (
                  <ProductTile
                    product={productItem}
                    handleAddToCart={handleAddToCart}
                    name="home"
                  />
                ))
              : null}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
