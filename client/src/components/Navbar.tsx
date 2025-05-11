
function Navbar() {
  return (
    <div className="m-2 px-4 flex gap-4 items-center justify-between">
        <div>
            <a href="/" className="hover:cursor-pointer">
                <img src="client\src\assets\Docmitra_logo.svg" alt="DocMitra_Logo"  />
                </a>
        </div>
        <div>
            <ul className="flex flex-row gap-3">
                <li>Home</li>
                <li>Templates</li>
                <li>Pricing</li>
                <li>LogIn</li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar