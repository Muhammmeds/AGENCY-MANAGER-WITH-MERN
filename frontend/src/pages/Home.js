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

    const refCol = collection(db , 'workers')

    const sortByPay1 = async() =>{
        const q = query(refCol , orderBy('pay' , 'asc'))
        try{
            const data = await getDocs(q)
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
    const sortByPayDescending = async() =>{
        const q = query(refCol , orderBy('pay' , 'desc'))
        try{
            const data = await getDocs(q)
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
    const sortByHolidayYes = async() =>{
        const q = query(refCol , where('onholiday' , '==' , 'true'))
        try{
            const data = await getDocs(q)
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
    
    const sortByHolidayNo = async() =>{
        const q = query(refCol , where('onholiday' , '==' , 'false'))
        try{
            const data = await getDocs(q)
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
            }
            catch(err){
                console.log(err)
            }
        }
        
        }
    

    return(
        <>
        <Navbar />
        <div className="container">
            <div className="sort">
                <p>Sort</p>
                <button onClick={sortByPay1}>Sort by Pay(ascending)</button> <br></br>
                <button onClick={sortByPayDescending}>Sort by Pay(descending)</button> <br></br>
                <p>Filter</p>
                <button onClick={sortByHolidayYes}>OnHoliday(Yes)</button> <br></br>
                <button onClick={sortByHolidayNo}>OnHoliday(No)</button> <br></br>
            </div>
            
            <div className="box1">
                <ProfileDetails profiles = {profiles} setProfiles = {setProfiles}/>
            </div>
            <div className="box2">
            <form>
            <p className="add">Add Employee</p>
            <label>First Name: <br></br>
            <input type="text"
            value={firstname}
             onChange={(e)=>setFirstName(e.target.value)}/><br></br>
            </label>
            <label>Last Name:<br></br>
            <input type="text"
            value={lastname}
            onChange={(e)=>setLastName(e.target.value) }/> <br></br>
            </label>
            <label>Job Title:<br></br>
            <input type="text"
            value={jobTitle}
                onChange={(e)=>setJobTitle(e.target.value) }/> <br></br>
            </label>
            <label>Pay(/hr):<br></br>
            <input type="number"
            value={pay}
                onChange={(e)=>setPay(e.target.value) }/> <br></br>
            </label>
            <label>On-Holiday:</label>
            <select value={onHoliday} onChange={(e)=>setOnHoliday(e.target.value) }>
                <option disabled selected defaultValue={null}></option>
                <option value='true'>Yes</option>
                <option value='false'>No</option>
            </select> <br></br>
            {error && <p className="error">All input fields are required!!!</p>}
            <button onClick={addEmployee}>Add Employer</button>
            </form>
            </div>
        </div>
        </>
    )
}
export default Home;