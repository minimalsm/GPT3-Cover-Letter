import React from 'react';


export default function Contact() {
    return (
        <div>
            <div>

                <h2>
                    SSR Working
                        </h2>
                <h2>
                    SSR Not Works
                        </h2>

            </div>

            <div>


                <h2>
                    is Not Static
                        </h2>

            </div>
        </div>
    )
}

export async function getStaticProps() {
    return { props: {} }
}