

type FetcherOptions = RequestInit & {
  params?: Record<
    string,
    string | number | (string | number)[]
  >;
};

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetcher<T>(
  endpoint: string,
  options: FetcherOptions = {}
): Promise<T> {

  if (!BASE_URL) {
    throw new Error("fetcher(): BASE_URL не объявлен");
  }
  const { params, headers, ...rest } = options;
  const url = new URL(endpoint, BASE_URL);
  console.log(BASE_URL, 'BASE_URL', endpoint)

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (
        value === undefined ||
        value === null ||
        value === ""
      ) {
        return;
      }

      if (Array.isArray(value)) {
        value.forEach((v) => {
          url.searchParams.append(`${key}[]`, String(v));
        });
        // value.forEach((v) => {
        //   url.searchParams.append(key, String(v));
        // });
      } else {
        url.searchParams.append(key, String(value));
      }
    });
  }


  let locale: string | undefined;

  // 👉 Только на сервере
  if (typeof window === "undefined") {
    const { getLocale } = await import("next-intl/server");
    locale = await getLocale();
  }else{
    locale = document.documentElement.lang
  }



  // 👇 ЛОГ
  console.log("[API]", {
    method: rest.method ?? "GET",
    url: url.toString(),
    params,
    locale,
    options: rest,
  });

  const res = await fetch(url.toString(), {
    ...rest,
    // next: { revalidate: 60 },
    headers: {
      "Content-Type": "application/json",
      ...(locale ? { "Accept-Language": locale } : {}),
      ...headers,
    },
  });

  if (!res.ok) {
    console.error("[API ERROR]", res.status, url.toString());
    return null as T;
    // throw new Error(`API error ${res.status}: ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}
