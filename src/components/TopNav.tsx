export default function TopNav() {
  return (
		<div id="top-nav" className="top-nav style-one bg-black md:h-[44px] h-[30px]">
			<div className="container mx-auto h-full">
				<div className="top-nav-main flex justify-between max-md:justify-center h-full">
					<div className="left-content flex items-center gap-5 max-md:hidden">
						<div className="choose-type choose-language flex items-center gap-1.5">
							<div className="select relative">
								<p className="selected caption2 text-white">English</p>
								<ul className="list-option bg-white">
									<li data-item="English" className="caption2 active">English</li>
									<li data-item="Espana" className="caption2">Espana</li>
									<li data-item="France" className="caption2">France</li>
								</ul>
							</div>
							<i className="ph ph-caret-down text-xs text-white"></i>
						</div>
						<div className="choose-type choose-currency flex items-center gap-1.5">
							<div className="select relative">
								<p className="selected caption2 text-white">USD</p>
								<ul className="list-option bg-white">
									<li data-item="USD" className="caption2 active">USD</li>
									<li data-item="EUR" className="caption2">EUR</li>
									<li data-item="GBP" className="caption2">GBP</li>
								</ul>
							</div>
							<i className="ph ph-caret-down text-xs text-white"></i>
						</div>
					</div>
					<div className="text-center text-button-uppercase text-white flex items-center">New customers save 10% with the code GET10</div>
					<div className="right-content flex items-center gap-5 max-md:hidden">
						<a href="https://www.facebook.com/" target="_blank">
							<i className="icon-facebook text-white"></i>
						</a>
						<a href="https://www.instagram.com/" target="_blank">
							<i className="icon-instagram text-white"></i>
						</a>
						<a href="https://www.youtube.com/" target="_blank">
							<i className="icon-youtube text-white"></i>
						</a>
						<a href="https://twitter.com/" target="_blank">
							<i className="icon-twitter text-white"></i>
						</a>
						<a href="https://pinterest.com/" target="_blank">
							<i className="icon-pinterest text-white"></i>
						</a>
					</div>
				</div>
			</div>
		</div>
  );
}