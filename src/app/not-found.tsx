import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-[600] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Страница не найдена</p>

      <span className="btn-def">
        <Link href="/">Вернуться на главную</Link>
      </span>
    </div>
  );
}
