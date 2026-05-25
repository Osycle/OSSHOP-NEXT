const benefits = [
  {
    icon: 'icon-phone-call',
    title: '24/7 Customer Service',
    desc: "We're here to help you with any questions or concerns you have, 24/7.",
  },
  {
    icon: 'icon-return',
    title: '14-Day Money Back',
    desc: "If you're not satisfied with your purchase, simply return it within 14 days for a refund.",
  },
  {
    icon: 'icon-guarantee',
    title: 'Our Guarantee',
    desc: 'We stand behind our products and services and guarantee your satisfaction.',
  },
  {
    icon: 'icon-delivery-truck',
    title: 'Shipping worldwide',
    desc: 'We ship our products worldwide, making them accessible to customers everywhere.',
  },
];

export default function BenefitBlock() {
  return (
    <div className="benefit-block md:pt-20 pt-10">
      <div className="container">
        <div className="list-benefit grid items-start lg:grid-cols-4 grid-cols-2 gap-[30px]">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="benefit-item flex flex-col items-center justify-center"
            >
              <i className={`${b.icon} lg:text-7xl text-5xl`} />
              <div className="heading6 text-center mt-5">{b.title}</div>
              <div className="caption1 text-secondary text-center mt-3">{b.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
