'use client'

export function LoadingComponent() {
    return (
        <div className="fixed w-full h-full left-0 top-0 bg-black/50 z-[999]">
            <div className="w-full h-full flex justify-center items-center">
            <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            </div>
        </div>
    )
}