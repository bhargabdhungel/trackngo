"use client"

import { BallTriangle } from "react-loading-icons"

export default function Loading() {
    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center">
                <div>
                    <BallTriangle />
                </div>
            </div>
        </>
    )
}