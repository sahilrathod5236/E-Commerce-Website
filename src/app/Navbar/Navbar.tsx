import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { BiSearch } from "react-icons/bi";
import logo from "@/assets/logo.png";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getCart } from "@/lib/db/cart";
import ShoppingCartButton from "./ShoppingCartButton";
import UserMenuButton from "./UserMenuButton";
import FormSubmitButton from "@/components/FormSubmitButton";

async function searchProducts(formData: FormData) {
  "use server";

  const searchQuery = formData.get("searchQuery")?.toString();

  if (searchQuery) {
    redirect("/search?query=" + searchQuery);
  }
}

export default async function Navbar() {
  const cart = await getCart();
  const session = await getServerSession(authOptions);

  return (
    <div className="bg-base-100">
      <div className="navbar m-auto max-w-7xl flex-col gap-2 sm:flex-row">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl normal-case">
            <Image src={logo} alt="Logo" width={40} height={40} />
            E-Commerce
          </Link>
        </div>
        <div className="flex-none gap-2">
          <form action={searchProducts}>
            <div className="form-control flex flex-row items-center">
              <input
                name="searchQuery"
                placeholder="Search"
                className="input input-bordered w-full min-w-[60px] focus:border-none"
              />
              <FormSubmitButton className="bg-rose-500 p-2 text-white">
                <BiSearch size={18} />
              </FormSubmitButton>
            </div>
          </form>
          <ShoppingCartButton cart={cart} />
          <UserMenuButton session={session} />
        </div>
      </div>
    </div>
  );
}
