import React from 'react';


export default function PricingCard() {


    return (
        <>
            <section className="container mx-auto">
                <div className="flex flex-wrap justify-center">
                    <article
                        className="bg-white w-4/5 lg:w-custom mb-10 lg:px-4 px-6 py-10 text-center text-primary-dark rounded-lg"
                    >
                        <h5 className="font-bold text-base">Basic</h5>
                        <h2 className="pb-4 flex justify-center font-bold border-b border-gray-300">
                            <span className="text-3xl mt-6 mr-1">$</span><span className="text-6xl"> 14.99</span>
                        </h2>
                        <ul className="text-sm font-bold">
                            <li className="pt-4 pb-4 border-b border-gray-300">Top valuable Feature</li>
                            <li className="pt-3 pb-4 border-b border-gray-300">Second Valuable Feature</li>
                            <li className="pt-4 pb-4 border-b border-gray-300">Wrap all the features up</li>
                        </ul>
                        <button
                            className=" uppercase text-center text-sm mt-12 xl:px-24 px-12 sm:px-16 py-2 font-bold text-primary-very-light border-2 border-black-600 rounded-lg"

                        >
                            Learn More
        </button>
                    </article>
                    <article
                        className="bg-white w-4/5 lg:w-custom mb-10 lg:px-4 px-6 py-10 text-center text-white rounded-lg bg-orange-500 "
                    >
                        <h5 className="font-bold text-base">Less Basic</h5>
                        <h2 className="pb-4 flex justify-center font-bold border-b border-gray-300">
                            <span className="text-3xl mt-6 mr-1">$</span><span className="text-6xl"> 24.99</span>
                        </h2>
                        <ul className="text-sm font-bold">
                            <li className="pt-4 pb-4 border-b border-gray-300">Top valuable Feature</li>
                            <li className="pt-3 pb-4 border-b border-gray-300">Second Valuable Feature</li>
                            <li className="pt-4 pb-4 border-b border-gray-300">Wrap all the features up</li>
                        </ul>
                        <button
                            className=" uppercase text-center text-sm mt-12 xl:px-24 px-12 sm:px-16 py-2 font-bold text-primary-very-light border-2 border-white-600 rounded-lg"

                        >
                            Learn More
        </button>
                    </article>
                    <article
                        className="bg-white w-4/5 lg:w-custom mb-10 lg:px-4 px-6 py-10 text-center text-primary-dark rounded-lg"
                    >
                        <h5 className="font-bold text-base">Enterprise</h5>
                        <h2 className="pb-4 flex justify-center font-bold border-b border-gray-300">
                            <span className="text-3xl mt-6 mr-1">$</span><span className="text-6xl"> 45.99</span>
                        </h2>
                        <ul className="text-sm font-bold">
                            <li className="pt-4 pb-4 border-b border-gray-300">Top valuable Feature</li>
                            <li className="pt-3 pb-4 border-b border-gray-300">Second Valuable Feature</li>
                            <li className="pt-4 pb-4 border-b border-gray-300">Wrap all the features up</li>
                        </ul>
                        <button
                            className=" uppercase text-center text-sm mt-12 xl:px-24 px-12 sm:px-16 py-2 font-bold text-primary-very-light border-2 border-black-600 rounded-lg"

                        >
                            Learn More
        </button>
                    </article>
                </div>
            </section>
        </>
    )
}

