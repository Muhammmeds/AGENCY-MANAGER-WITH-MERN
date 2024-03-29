import './profiledetails.css'
import {db} from '../firebase'
import { deleteDoc , doc , collection , getDocs } from 'firebase/firestore'

const ProfileDetails = ({profiles, setProfiles}) =>{
    const refCol = collection(db , 'workers')

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

    const deleteProfile = async(id) =>{
        let profile = doc(db , 'workers', id )
        try{
            await deleteDoc(profile)
            getWorkers()
        }
        catch(err){
            console.log(err)
        }
    }
    
return(
    <>
    {profiles.length > 0 ? profiles.map((profile)=>(
        <div className='w-full h-140 bg-white my-2 mb-10 px-6 py-5 pl-9 box-border rounded-tl-3xl relative leading-relaxed' key={profile.id}> 
        <p className='font-customFont font-bold text-customColor'>{profile.firstname} {profile.lastname}</p> <button className='delete w-9 text-2xl absolute top-5 rounded-full hover:scale-110 hover:border-2  hover:border-customColor' onClick={()=>{deleteProfile(profile.id)}}>🗑️</button>
        <p><span className='font-customFont'><b>Job</b></span> : {profile.jobtitle}</p>
        <p> <span className='font-customFont'><b>Pay(/hr) </b></span>: {profile.pay}</p>
        {profile.onholiday === 'true'?<p> <span className='font-customFont'><b>On-Holiday</b></span> : Yes</p> : <p> <span className='font-customFont'><b>On-Holiday</b></span> : No</p>}
        </div>

        )):<p className='font-extrabold text-xl text-center'>No Data Available!!</p>}
    </>
)
}
export default ProfileDetails