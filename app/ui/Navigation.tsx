'use client'
 
import "./Navigation.css";
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@mui/material";
import classNames from "classnames";

interface NavLink {
  name: string,
  link: string,
}

interface Props {
  navLinks: NavLink[];
}
 
export const Navigation: React.FC<Props> = ({ navLinks }) => {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const pathname = usePathname();

  const handleClick = async () => {
    const { error } = await supabase.auth.signOut();

    if (!error) {
      router.push('/sign-in');
    }
  }
 
  return (
    <header>
      <nav className="nav">
        <ul className="nav__list">
          {navLinks.map(({ name, link }) => {
            const isActive = pathname === link;

            return (
              <li
                className="nav__item"
                key={name}
              >
                <Link
                  className={classNames('nav__link', {
                    'is-active': isActive,
                  })}
                  href={link}
                >
                  {name}
                </Link>
              </li>
            )
          })}
        </ul>

        <Button
          onClick={handleClick}
          variant="outlined"
        >
          Log out
        </Button>
      </nav>
    </header>
  )
}
