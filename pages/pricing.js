import React from 'react';
import Link from "next/link";

import PricingCard from '../components/Cards/CardPricing';
import IndexNavbar from "components/Navbars/IndexNavbar.js";

import Footer from "components/Footers/Footer.js";





export default function Pricing() {

    return (
        <>
            <IndexNavbar fixed />
            <section className=" relative pt-24 m-20 items-center flex h-1/2 max-h-860-px">
                <div className="container py-6 mx-auto items-center flex flex-wrap justify-center">
                    <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
                        <div className="pt-32 sm:pt-0
                        text-center">
                            <h1 className="font-semibold text-6xl text-gray-700">
                                Our Pricing</h1>
                            <p>Email about us for a free 7-day trial.</p>
                        </div>
                    </div>
                </div>

            </section>

            <PricingCard />

            <section className="relative pt-6 items-center flex h-16">
            </section>

            <Footer />
        </>
    )
}
export async function getStaticProps() {
    return { props: {} }
}