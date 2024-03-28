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
        <div className='content' key={profile.id}> 
        <p className='name'>{profile.firstname} {profile.lastname}</p> <button className='delete' onClick={()=>{deleteProfile(profile.id)}}>🗑️</button>
        <p><span className='job'>Job</span> : {profile.jobtitle}</p>
        <p> <span className='pay'>Pay(/hr) </span>: {profile.pay}</p>
        {profile.onholiday === 'true'?<p> <span className='holiday'>On-Holiday</span> : Yes</p> : <p> <span className='holiday'>On-Holiday</span> : No</p>}
        </div>

        )):<p className='notavailable'>No Data Available</p>}
    </>
)
}
export default ProfileDetails