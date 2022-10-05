import React,{useState,useContext, useEffect} from 'react'
import { toast } from "react-toastify";
import axios from 'axios'


const Display = ({datas,viewData}) =>{
    
 
        const deleteItem = async(id)=>{
            try{
            console.log("id--------->",id)
            const {message} = await axios.delete(`/delete-details/${id}`)
            console.log("msg--------------->",message)
            toast.success('post deleted')
            viewData()
            }catch(err){
                console.log(err)
                toast.error('error while deleting')
            }
        }


    return(
        <>
       { datas !== null && (datas.map((e)=>{
    
      return ( 
      <>
      <div key={e._id} className = "display">
            <div>
                <small>
                    Name:{e.firstName}  {
                        e.middleName !== "" && (
                            <>
                            {e.middleName}
                            </>
                        )
                    }  {e.lastName}
                    
                  </small>
            </div>
            <div>
                <small>email: {e.email} </small>
            </div>
            <div>
                <small>phone: {e.phone} </small>
            </div>
            <div>
                <small>Address: {e.address},{e.country},{e.state} , {e.zip}</small> 
            </div>
            <div className="form-group1">
            <div className="form-group1-sub p2">
                <small>Height: {e.height} cm</small> 
            </div>
            <div className="form-group1-sub p2">
                <small>Weight: {e.weight} Kgs</small>
            </div>
            </div>
            <button  className="submitButton" onClick={()=>deleteItem(e._id)}>Delete user</button>
        </div>
          
            </>
            )
       })
            )}
          
        </>
    )
}

export default Display