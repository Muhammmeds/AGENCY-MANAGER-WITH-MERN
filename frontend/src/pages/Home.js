import Navbar from "../components/Navbar";
import {useState, useEffect} from 'react'

import {collection, getDocs , addDoc , orderBy, query , where  } from 'firebase/firestore'
import {db} from '../firebase'
import ProfileDetails from "../components/profileDetails";
import './home.css'

const Home = () =>{
    const [profiles,setProfiles ] = useState([])
    const [firstname , setFirstName] = useState('')
    const [lastname , setLastName] = useState('')
    const [jobTitle , setJobTitle] = useState('')
    const [pay , setPay] = useState('')
    const [onHoliday , setOnHoliday] = useState('')
    const [error , setError] = useState(false)
    const [mobile , setMobile] = useState(false)
    const[querymobile , setQueryMobile] = useState(false)

    const refCol = collection(db , 'workers')

    const fetchData = async (ref) => {
      try{
        const data = await getDocs(ref)
        let rawData = []
        data.docs.forEach((doc)=>{
          rawData.push({...doc.data() , id:doc.id})
        })
        console.log(rawData)
        setProfiles(rawData)
      }
      catch(err){
        console.log(err)
      }

    }

    const sortByPayAscending = async() =>{
        const q = query(refCol , orderBy('pay' , 'asc'))
        fetchData(q)
        setQueryMobile(false)
        
    }
    const sortByPayDescending = async() =>{
        const q = query(refCol , orderBy('pay' , 'desc'))
        fetchData(q)
        setQueryMobile(false)


    }
    const sortByHolidayYes = async() =>{
        const q = query(refCol , where('onholiday' , '==' , 'true'))
        fetchData(q)
        setQueryMobile(false)


    }
    
    const sortByHolidayNo = async() =>{
        const q = query(refCol , where('onholiday' , '==' , 'false'))
        fetchData(q)
        setQueryMobile(false)


    }

    const upperCase = (str) =>{
        let arr = str.split(' ')
        console.log(arr)
        let arr2 = []
        for(let i=0;i<arr.length;i++){
            arr[i] = arr[i][0].toUpperCase() + arr[i].slice(1 , arr[i].length)
            arr2.push(arr[i])
        }
        return arr2.join(' ')
    }

    const getWorkers = async() =>{
        try{
            const data = await getDocs(refCol)
            console.log(data)
            let rawData = []
            data.docs.forEach((doc)=>{
              rawData.push({...doc.data() , id:doc.id})
            })
            console.log(rawData)
            setProfiles(rawData)
          }
          catch(err){
            console.log(err)
          }
    }

    useEffect(()=>{
        
        getWorkers()
    },[])

    const addEmployee = async(e) =>{
        e.preventDefault()
        if(firstname === '' || lastname === ''|| jobTitle === ''|| pay === ''|| onHoliday === ''){
            setError(true)
        }else{
            try{
            await addDoc(refCol , {firstname : upperCase(firstname), lastname : upperCase(lastname) , jobtitle : upperCase(jobTitle) , pay : pay , onholiday : onHoliday })
            getWorkers()
            setFirstName('')
            setLastName('')
            setJobTitle('')
            setPay('')
            setOnHoliday('')
            setError(false)
            setMobile(false)            }
            catch(err){
                console.log(err)
            }
        }
        
        }
         const closeMobileForm = (e) =>{
            if(e.target.classList.contains('box2mobile')){
                setMobile(false)
            }
         }
    

    return(
        <>
        <Navbar setMobile = {setMobile} mobile={mobile} querymobile={querymobile} setQueryMobile={setQueryMobile} />
      
      
        <div className="container bg-customColor2 m-0 flex justify-between">
            <div className={`sort mr-2 query ${querymobile ? 'queryshow' : ''}`} >
                <p className="underline mb-2 font-bold">Sort</p>
                <button className="mt-2 border-none rounded-sm hover:scale-105 hover:border-solid hover:border-2 border-customColor hover:rounded" onClick={sortByPayAscending}>Sort by Pay(ascending)</button> <br></br>
                <button className="mt-2 border-none rounded-sm hover:scale-105 hover:border-solid hover:border-2 border-customColor hover:rounded"onClick={sortByPayDescending}>Sort by Pay(descending)</button> <br></br>
                <p className="underline mb-2 font-bold mt-3">Filter</p>
                <button className="mt-2 border-none rounded-sm hover:scale-105 hover:border-solid hover:border-2 border-customColor hover:rounded"onClick={sortByHolidayYes}>OnHoliday(Yes)</button> <br></br>
                <button className="mt-2 border-none rounded-sm hover:scale-105 hover:border-solid hover:border-2 border-customColor hover:rounded"onClick={sortByHolidayNo}>OnHoliday(No)</button> <br></br>
            </div>
            
            <div className="box1 ml-20">
                <ProfileDetails profiles = {profiles} setProfiles = {setProfiles}/>
            </div>
            <div className={`box2 ${mobile ? 'box2mobile' : ''}`} onClick={closeMobileForm}>
            <form className={ mobile ? 'formshow' : null}>
            <p className="add font-bold font-customFont">Add Employee</p>
            <label className="font-customFont">First Name: <br></br>
            <input type="text" className="mb-2 border-none w-65 h-8 pl-2"
            value={firstname}
             onChange={(e)=>setFirstName(e.target.value)}/><br></br>
            </label>
            <label className="font-customFont">Last Name:<br></br>
            <input type="text" className="mb-2 border-none w-65 h-8 pl-2"
            value={lastname}
            onChange={(e)=>setLastName(e.target.value) }/> <br></br>
            </label>
            <label className="font-customFont">Job Title:<br></br>
            <input type="text" className="mb-2 border-none w-65 h-8 pl-2"
            value={jobTitle}
                onChange={(e)=>setJobTitle(e.target.value) }/> <br></br>
            </label>
            <label className="font-customFont">Pay(/hr):<br></br>
            <input type="number" className="mb-2 border-none w-65 h-8 pl-2"
            value={pay}
                onChange={(e)=>setPay(e.target.value) }/> <br></br>
            </label>
            <label className="font-customFont">On-Holiday:</label>
            <select className="w-24 ml-3" value={onHoliday} onChange={(e)=>setOnHoliday(e.target.value) }>
                <option disabled selected defaultValue={null}></option>
                <option value='true'>Yes</option>
                <option value='false'>No</option>
            </select> <br></br>
            {error && <p className="text-red-600 font-bold text-xs mt-2 font-customFont error">All input fields are required!!!</p>}
            
            <button className="mt-4 bg-customColor text-white w-110 h-30 p-1 font-bold font-customFont rounded hover:scale-110  hover:border-2 hover:border-solid hover:border-black" onClick={addEmployee}>Add Employer</button>
            </form>
            </div>
        </div>
        
        </>
    )
}
export default Home;