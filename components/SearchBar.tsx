// The search bar component and the top of the page

import type { NextPage } from "next";
import Image from "next/image";
import researchIcon from "../public/placeholder.svg";
import searchIcon from "../public/search.svg";
import styles from "../styles/SearchBar.module.css";
import { FormEvent, useContext } from "react";
import { useRouter } from "next/router";
import { ThemeContext, ThemeContextType } from "../pages/_app";

// The font size of the app name
const logoFontSize = 20;

// The font size of the search bar
const inputFontSize = 16;

// The search bar
const SearchBar: NextPage<{query: string}> = ({ query }) => {

  // Gets the router
  const router = useRouter();
  
  // The function to handle the search form submission
  async function handleSearch (event: FormEvent<HTMLFormElement>) {
    
    // Prevents the default behaviour
    event.preventDefault();

    // Gets the search term
    const searchTerm = (event.target as EventTarget & {search: HTMLInputElement}).search.value.trim();

    // If the search term contains a value that is different from the original, brings the user to the new search page that they requested
    if (searchTerm && searchTerm !== query) return router.push(`/search?q=${searchTerm}`);
  }

  // Gets the context
  const { themeClass } = useContext(ThemeContext) as ThemeContextType;

  // The search bar at the top of every results page
  return (
      <div className={`${themeClass(styles, "searchBar")} ${styles.container}`}>
        
          {/* The logo of the app */}
          <a className={`${styles.container} ${styles.logo}`} href="/" title="Go to the Homepage">
            <div className={themeClass(styles, "logoIcon")} style={{minWidth: logoFontSize * 2}}>
              <Image src={researchIcon} width={logoFontSize * 2} height={logoFontSize * 2} priority={true} />
            </div>
            <div className={`${themeClass(styles, "text")} ${styles.logoName}`} style={{fontSize: logoFontSize}}>Research Engine</div>
          </a>
    
          {/* The search bar part */}
          <div className={themeClass(styles, "inputBox")}>
            <form className={`${styles.container} ${styles.form}`} onSubmit={handleSearch}>
              <input type="text" name="search" placeholder="Research..." className={`${themeClass(styles, "input")} ${themeClass(styles, "text")}`} style={{fontSize: inputFontSize}} defaultValue={query}></input>
              <button type="submit" className={themeClass(styles, "btn")} title="Search"><Image src={searchIcon} width={20} height={20} style={{background: "transparent"}} priority={true} /></button>
            </form>
          </div>
  
        {/* The button to toggle between light and dark mode */}
        
      </div>
    
  );
};

export default SearchBar;