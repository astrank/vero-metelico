import Link from "next/link";
import { useState } from "react";
import { Category } from "../types/Category";

interface NavTypes {
  categories: Category[]
}

const Nav = ({ categories }: NavTypes) => {
  const [isNavToggled, toggleNav] = useState(false);

  return (
    <div className={`navbar ${isNavToggled ? "open" : ""} flex gap-2 lg:gap-6`}>
      <ul
        className="flex flex-col gap-2 lg:px-0 lg:flex-row lg:gap-4 px-4 md:px-10"
        role="list"
        aria-label="Navegación Primaria"
      >
        <li>
          <Link href="/sobre-mi" className="hover:text-primary-700">
            Sobre mí
          </Link>
        </li>
        <li>
          <Link
            href="/obra"
            className="peer flex items-center gap-1 hover:text-primary-700"
          >
            <span>Obra</span>
            <svg
              fill="currentColor"
              className="h-3 hidden lg:block"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"></path>
            </svg>
          </Link>
          <ul className="flex flex-col gap-2 ml-4 pt-2 lg:ml-0 lg:absolute lg:hidden lg:peer-hover:flex lg:hover:flex">
            {categories.map((c, i) => (
              <li key={i}>
                <Link className="hover:text-primary-700" href={`/obra?q=${c.name}`}>
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </li>
        <li>
          <Link href="/invitados" className="hover:text-primary-700">
            Invitados
          </Link>
        </li>
        <li>
          <Link href="/escritura-grupal" className="hover:text-primary-700">
            Escritura grupal
          </Link>
        </li>
        <li>
          <Link href="/contacto" className="hover:text-primary-700">
            Contacto
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
