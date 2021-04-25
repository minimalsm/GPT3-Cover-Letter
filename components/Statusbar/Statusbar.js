import React from 'react';

export default function StatusBar({ status }) {

    const active = (activeStep) => {
        if (activeStep === status) {
            return (
                'bg-orange-500 text-white shadow-lg'
            )
        } else {
            return (
                'bg-gray-100'
            )
        }
    }

    return (
        <ul className="flex flex-row px-4 py-3">
            <li className={`bg-gray-100 mr-1 rounded px-4 py-3 font-semibold ${active(1)}`} >1 : Personalize</li>
            <li className={`bg-gray-100 mr-1 rounded px-4 py-3 font-semibold ${active(2)}`} >2 : Position Details</li>
            <li className={`bg-gray-100 mr-1 rounded px-4 py-3 font-semibold ${active(3)}`} >3 : Generate Cover Letter</li>
        </ul>
    )
}