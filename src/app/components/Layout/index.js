import React from 'react';
import Header from '../Header';
import { Link } from 'react-router-dom';

export default function Layout({ title, children, linkTo, linkText }) {
  return (
    <div className="flex flex-col items-stretch h-full">
      <Header className="flex-shrink-0" />
      <div className="flex-grow-0 flex justify-center mt-6">
        {/* <div className={styles.date_slider}></div> */}
        <h1 className="text-3xl mb-2 text-center">{title}</h1>
      </div>
      <div className="flex-grow flex justify-center mt-6">{children}</div>
      <footer className="w-100 bg-teal-700 flex-shrink-0 flex justify-center py-2 h-12">
        {linkTo && (
          <Link
            to={linkTo}
            className="text-xl tracking-widest text-white underline lg:text-2x lg:text-teal-100 lg:focus:text-white lg:no-underline lg:hover:text-white lg:hover:underline"
          >
            {linkText}
          </Link>
        )}
      </footer>
    </div>
  );
}
