import './Navbar.css'
import { FaAlignJustify } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";



const Navbar = ({setMobile , mobile , querymobile , setQueryMobile}) =>{

    const displayForm = () =>{
        setMobile(!mobile)
        setQueryMobile(false)
    }
    const displayQuery = () =>{
        setQueryMobile(!querymobile)
    }

    return(
        <div className=" bg-white flex navbar">
            <p className="font-extrabold tracking-wide text-3xl text-shadow-custom">Agency-Manager</p>
            <IoMdAdd className='logo' onClick={displayForm} />
            { querymobile ? <MdOutlineCancel className='logo' onClick={displayQuery} /> : <FaAlignJustify className='logo' onClick={displayQuery} /> }
        </div>
    )
}

export default Navbar