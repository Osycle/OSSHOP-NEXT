import IndexClient from "./IndexClient";
import { getProducts } from "@/services/api";

export default async function Page() {
  const products = await getProducts();
  return <IndexClient products={products}/>;
}
