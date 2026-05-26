'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCartStore } from "@/store/useCartStore";

const navItems = [
  { label: 'Demo', href: '#' },
  { label: 'Features', href: '#' },
  { label: 'Shop', href: '/shop' },
  { label: 'Product', href: '#' },
  { label: 'Blog', href: '#' },
  { label: 'Pages', href: '#' },
];

export default function Header() {
  const [isFixed, setIsFixed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();


	// Достаем функцию открытия и сами товары
  const openCart = useCartStore((state) => state.openCart);
  const items = useCartStore((state) => state.items);

  // Считаем общее количество всех товаров (учитывая quantity)
	const totalItems = items.reduce((sum, item) => sum + item.quantityCur, 0);


  useEffect(() => {
    const onScroll = () => setIsFixed(window.scrollY > 0);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
		<div id="header" className={`w-full ${isFixed ? 'scrolled': ''}`}>
			<div className="header-menu style-one absolute top-0 left-0 right-0 w-full md:h-[74px] h-[56px]">
				<div className="container mx-auto h-full">
					<div className="header-main flex justify-between h-full">
						<div className="menu-mobile-icon lg:hidden flex items-center">
							<i className="icon-category text-2xl"></i>
						</div>
						<div className="left flex items-center gap-16">
							<a href="index.html" className="flex items-center max-lg:absolute max-lg:left-1/2 max-lg:-translate-x-1/2">
								<div className="heading4">Anvogue</div>
							</a>
							<div className="menu-main h-full max-lg:hidden">
								<ul className="flex items-center gap-8 h-full">
									<li className="h-full flex items-center">
										<Link
											href="/shop"
											className={`text-button-uppercase duration-300 h-full flex items-center justify-center${pathname === '/shop' ? ' active' : ''}`}
										>
											Shop
										</Link>
									</li>
									<li className="h-full relative">
										<a href="#!" className="text-button-uppercase duration-300 h-full flex items-center justify-center"> Pages </a>
										<div className="sub-menu py-3 px-5 -left-10 absolute bg-white rounded-b-xl">
											<ul className="w-full">
												<li>
													<a href="about.html" className="link text-secondary duration-300"> About Us </a>
												</li>
												<li>
													<a href="contact.html" className="link text-secondary duration-300"> Contact Us </a>
												</li>
												<li>
													<a href="store-list.html" className="link text-secondary duration-300"> Store List </a>
												</li>
												<li>
													<a href="page-not-found.html" className="link text-secondary duration-300"> 404 </a>
												</li>
												<li>
													<a href="faqs.html" className="link text-secondary duration-300"> FAQs </a>
												</li>
												<li>
													<a href="coming-soon.html" className="link text-secondary duration-300"> Coming Soon </a>
												</li>
												<li>
													<a href="customer-feedbacks.html" className="link text-secondary duration-300"> Customer Feedbacks </a>
												</li>
											</ul>
										</div>
									</li>
								</ul>
							</div>
						</div>
						<div className="right flex gap-12">
							<div className="max-md:hidden search-icon flex items-center cursor-pointer relative">
								<i className="ph-bold ph-magnifying-glass text-2xl"></i>
								<div className="line absolute bg-line w-px h-6 -right-6"></div>
							</div>
							<div className="list-action flex items-center gap-4">
								<div className="user-icon flex items-center justify-center cursor-pointer">
									<i className="ph-bold ph-user text-2xl"></i>
									<div className="login-popup absolute top-[74px] w-[320px] p-7 rounded-xl bg-white box-shadow-small">
										<a href="login.html" className="button-main w-full text-center">Login</a>
										<div className="text-secondary text-center mt-3 pb-4">
											Don’t have an account?
											<a href="register.html" className="text-black pl-1 hover:underline">Register </a>
										</div>
										<div className="bottom pt-4 border-t border-line"></div>
										<a href="#!" className="body1 hover:underline">Support</a>
									</div>
								</div>
								<div className="max-md:hidden wishlist-icon flex items-center relative cursor-pointer">
									<i className="ph-bold ph-heart text-2xl"></i>
									<span className="quantity wishlist-quantity absolute -right-1.5 -top-1.5 text-xs text-white bg-black w-4 h-4 flex items-center justify-center rounded-full">0</span>
								</div>
								<div 
									className="max-md:hidden cart-icon flex items-center relative cursor-pointer"
									onClick={openCart}
								>
									<i className="ph-bold ph-handbag text-2xl"></i>
									<span className="quantity cart-quantity absolute -right-1.5 -top-1.5 text-xs text-white bg-black w-4 h-4 flex items-center justify-center rounded-full">
										{totalItems}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* <!-- Menu Mobile --> */}
			<div id="menu-mobile" className="">
				<div className="menu-container bg-white h-full">
					<div className="container h-full">
						<div className="menu-main h-full overflow-hidden">
							<div className="heading py-2 relative flex items-center justify-center">
								<div className="close-menu-mobile-btn absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-surface flex items-center justify-center">
									<i className="ph ph-x text-sm"></i>
								</div>
								<a href="index.html" className="logo text-3xl font-semibold text-center">Anvogue</a>
							</div>
							<div className="form-search relative mt-2">
								<i className="ph ph-magnifying-glass text-xl absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer"></i>
								<input type="text" placeholder="What are you looking for?" className="h-12 rounded-lg border border-line text-sm w-full pl-10 pr-4" />
							</div>
							<div className="list-nav mt-6">
								<ul>
									<li>
										<Link href="/shop" className="text-xl font-semibold flex items-center justify-between mt-5">
											Shop
										</Link>
									</li>
									<li>
										<a href="#!" className="text-xl font-semibold flex items-center justify-between mt-5"
											>Pages
											<span className="text-right">
												<i className="ph ph-caret-right text-xl"></i>
											</span>
										</a>
										<div className="sub-nav-mobile">
											<div className="back-btn flex items-center gap-3">
												<i className="ph ph-caret-left text-xl"></i>
												Back
											</div>
											<div className="list-nav-item w-full pt-2 pb-6">
												<ul className="w-full">
													<li>
														<a href="about.html" className="link text-secondary duration-300"> About Us </a>
													</li>
													<li>
														<a href="contact.html" className="link text-secondary duration-300"> Contact Us </a>
													</li>
													<li>
														<a href="store-list.html" className="link text-secondary duration-300"> Store List </a>
													</li>
													<li>
														<a href="page-not-found.html" className="link text-secondary duration-300"> 404 </a>
													</li>
													<li>
														<a href="faqs.html" className="link text-secondary duration-300"> FAQs </a>
													</li>
													<li>
														<a href="coming-soon.html" className="link text-secondary duration-300"> Coming Soon </a>
													</li>
													<li>
														<a href="customer-feedbacks.html" className="link text-secondary duration-300"> Customer Feedbacks </a>
													</li>
												</ul>
											</div>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* <!-- Menu bar --> */}
			<div className="menu_bar fixed bg-white bottom-0 left-0 w-full h-[70px] sm:hidden z-[101]">
				<div className="menu_bar-inner grid grid-cols-4 items-center h-full">
					<a href="index.html" className="menu_bar-link flex flex-col items-center gap-1">
						<span className="ph-bold ph-house text-2xl block"></span>
						<span className="menu_bar-title caption2 font-semibold">Home</span>
					</a>
					<a href="shop-filter-canvas.html" className="menu_bar-link flex flex-col items-center gap-1">
						<span className="ph-bold ph-list text-2xl block"></span>
						<span className="menu_bar-title caption2 font-semibold">Category</span>
					</a>
					<a href="search-result.html" className="menu_bar-link flex flex-col items-center gap-1">
						<span className="ph-bold ph-magnifying-glass text-2xl block"></span>
						<span className="menu_bar-title caption2 font-semibold">Search</span>
					</a>
					<a href="cart.html" className="menu_bar-link flex flex-col items-center gap-1">
						<div className="cart-icon relative">
							<span className="ph-bold ph-handbag text-2xl block"></span>
							<span className="quantity cart-quantity absolute -right-1.5 -top-1.5 text-xs text-white bg-black w-4 h-4 flex items-center justify-center rounded-full">0</span>
						</div>
						<span className="menu_bar-title caption2 font-semibold">Cart</span>
					</a>
				</div>
			</div>


		</div>
  );
}
