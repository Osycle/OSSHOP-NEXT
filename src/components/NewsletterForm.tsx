'use client';

export default function NewsletterForm() {
  return (
    <div className="input-block w-full h-[52px] mt-4">
      <form
        className="w-full h-full relative"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="email"
          placeholder="Enter your e-mail"
          className="caption1 w-full h-full pl-4 pr-14 rounded-xl border border-line"
          required
        />
        <button
          type="submit"
          className="w-[44px] h-[44px] bg-black flex items-center justify-center rounded-xl absolute top-1 right-1"
        >
          <i className="ph ph-arrow-right text-xl text-white" />
        </button>
      </form>
    </div>
  );
}
