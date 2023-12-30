export default function Wallpaper(props) {
    return (
        <>
            { props.src ? (
                <img src={props.src} className="w-screen h-screen fixed top-0 left-0 -z-10 object-cover"/>
            ) : (
                <div className={`w-full h-full fixed top-0 left-0 -z-10 bg-cover bg-no-repeat ${props.image ?? 'bg-body'}`}></div>
            )}
        </>
    )
}