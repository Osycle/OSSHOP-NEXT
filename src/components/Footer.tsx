import Link from 'next/link';
import NewsletterForm from './NewsletterForm';

export default function Footer() {
  return (
    <footer id="footer" className="footer">
      <div className="footer-main bg-surface">
        <div className="container">
          <div className="content-footer md:py-[60px] py-10 flex justify-between flex-wrap gap-y-8">
            <div className="company-infor basis-1/4 max-lg:basis-full pr-7">
              <Link href="/" className="logo inline-block">
                <div className="heading3 w-fit">Anvogue</div>
              </Link>
              <div className="flex gap-3 mt-3">
                <div className="flex flex-col">
                  <span className="text-button">Mail:</span>
                  <span className="text-button mt-3">Phone:</span>
                  <span className="text-button mt-3">Address:</span>
                </div>
                <div className="flex flex-col">
                  <span>hi.avitex@gmail.com</span>
                  <span className="mt-[14px]">1-333-345-6868</span>
                  <span className="mt-3 pt-1">549 Oak St.Crystal Lake, IL 60014</span>
                </div>
              </div>
            </div>

            <div className="right-content flex flex-wrap gap-y-8 basis-3/4 max-lg:basis-full">
              <div className="list-nav flex justify-between basis-2/3 max-md:basis-full gap-4">
                <div className="item flex flex-col basis-1/3">
                  <div className="text-button-uppercase pb-3">Infomation</div>
                  <Link className="caption1 has-line-before duration-300 w-fit" href="/contact">Contact us</Link>
                  <Link className="caption1 has-line-before duration-300 w-fit pt-2" href="#">Career</Link>
                  <Link className="caption1 has-line-before duration-300 w-fit pt-2" href="/my-account">My Account</Link>
                  <Link className="caption1 has-line-before duration-300 w-fit pt-2" href="/order-tracking">Order &amp; Returns</Link>
                  <Link className="caption1 has-line-before duration-300 w-fit pt-2" href="/faqs">FAQs</Link>
                </div>
                <div className="item flex flex-col basis-1/3">
                  <div className="text-button-uppercase pb-3">Quick Shop</div>
                  <Link className="caption1 has-line-before duration-300 w-fit" href="/shop">Women</Link>
                  <Link className="caption1 has-line-before duration-300 w-fit pt-2" href="/shop">Men</Link>
                  <Link className="caption1 has-line-before duration-300 w-fit pt-2" href="/shop">Clothes</Link>
                  <Link className="caption1 has-line-before duration-300 w-fit pt-2" href="/shop">Accessories</Link>
                  <Link className="caption1 has-line-before duration-300 w-fit pt-2" href="/blog">Blog</Link>
                </div>
                <div className="item flex flex-col basis-1/3">
                  <div className="text-button-uppercase pb-3">Customer Services</div>
                  <Link className="caption1 has-line-before duration-300 w-fit" href="/faqs">FAQs</Link>
                  <Link className="caption1 has-line-before duration-300 w-fit pt-2" href="/faqs">Shipping</Link>
                  <Link className="caption1 has-line-before duration-300 w-fit pt-2" href="/faqs">Privacy Policy</Link>
                  <Link className="caption1 has-line-before duration-300 w-fit pt-2" href="/order-tracking">Return &amp; Refund</Link>
                </div>
              </div>

              <div className="newsletter basis-1/3 pl-7 max-md:basis-full max-md:pl-0">
                <div className="text-button-uppercase">Newletter</div>
                <div className="caption1 mt-3">
                  Sign up for our newsletter and get 10% off your first purchase
                </div>
                <NewsletterForm />
                <div className="list-social flex items-center gap-6 mt-4">
                  <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                    <div className="icon-facebook text-2xl text-black" />
                  </a>
                  <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                    <div className="icon-instagram text-2xl text-black" />
                  </a>
                  <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer">
                    <div className="icon-twitter text-2xl text-black" />
                  </a>
                  <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
                    <div className="icon-youtube text-2xl text-black" />
                  </a>
                  <a href="https://www.pinterest.com/" target="_blank" rel="noopener noreferrer">
                    <div className="icon-pinterest text-2xl text-black" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom py-3 flex items-center justify-between gap-5 max-lg:justify-center max-lg:flex-col border-t border-line">
            <div className="left flex items-center gap-8">
              <div className="copyright caption1 text-secondary">&copy;2024 Anvogue. All Rights Reserved.</div>
              <div className="select-block flex items-center gap-5 max-md:hidden">
                <div className="choose-language flex items-center gap-1.5">
                  <select name="language" className="caption2 bg-transparent">
                    <option value="English">English</option>
                    <option value="Espana">Espana</option>
                    <option value="France">France</option>
                  </select>
                  <i className="ph ph-caret-down text-xs" />
                </div>
                <div className="choose-currency flex items-center gap-1.5">
                  <select name="currency" className="caption2 bg-transparent">
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                  </select>
                  <i className="ph ph-caret-down text-xs" />
                </div>
              </div>
            </div>
            <div className="right flex items-center gap-2">
              <div className="caption1 text-secondary">Payment:</div>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="payment-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/images/payment/Frame-${i}.png`} alt="payment" className="w-9" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
