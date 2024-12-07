import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import { FaCode } from 'react-icons/fa';
import { IoLogoGithub } from 'react-icons/io';

import { websiteKeywords } from '../common/constants';
import { githubRepoLink, metadata, portfolioLink } from '../constants';

interface PageWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
    metaTitle?: string;
    metaDescription?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogUrl?: string;
    ogImage?: string;
}

const PageWrapper = (props: PageWrapperProps) => {
    const [date, setDate] = useState<Date>();

    useEffect(() => {
        setDate(new Date());
    }, []);

    return (
        <>
            <Helmet>
                {/* Title & description */}
                <title>{props.metaTitle || metadata.title}</title>
                <meta
                    name="description"
                    content={ props.metaDescription || metadata.description }
                />
                <meta name="author" content="Parbhat Sharma" />

                <link rel="canonical" href={import.meta.env.VITE_BASE_URL} />

                {/* Facebook Meta Tags */}
                <meta property="og:url" content={import.meta.env.VITE_BASE_URL} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={metadata.title} />
                <meta property="og:description" content={metadata.description} />
                <meta property="og:image" content={metadata.ogImage} />
                <meta property="og:logo" content={metadata.logo} />

                {/* Twitter Meta Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta property="twitter:domain" content={import.meta.env.VITE_BASE_URL} />
                <meta property="twitter:url" content={import.meta.env.VITE_BASE_URL} />
                <meta name="twitter:title" content={metadata.title} />
                <meta name="twitter:description" content={metadata.description} />
                <meta name="twitter:image" content={metadata.ogImage} />

                {/* Keywords */}
                <meta name="keywords" content={websiteKeywords.join(", ")} />

                <link rel="icon" href="/favicon.ico" type="image/x-icon" />
            </Helmet>

            <div>
                {/* Navbar */}
                <div className='sticky top-0 left-0 flex justify-between items-center text-white bg-primaryColor py-5 px-8'>
                    <Link to={"/"} aria-label='GenCap Homepage' className='font-dgGhayatyRegular text-2xl text-secondaryColor'>
                        GenCap
                    </Link>
                    <div className='flex gap-4'>
                        <Link to={githubRepoLink} aria-label='GenCap GitHub' target='_blank'>
                            <span className='flex gap-1 items-center'>
                                <IoLogoGithub className='text-xl' />
                                <p className='sm:block hidden'>GitHub</p>
                            </span>
                        </Link>
                    </div>
                </div>
                {props.children}
                <footer className='flex justify-between bg-primaryColor py-5 px-8 text-white'>
                    <p>
                        &copy; {date?.getFullYear()}
                    </p>
                    <span className='flex items-center gap-1'>
                        <FaCode />Developed by <Link to={portfolioLink} className='hover:underline' target='_blank'>Parbhat Sharma</Link>
                    </span>
                </footer>
            </div>
        </>
    )
}

export default PageWrapper
