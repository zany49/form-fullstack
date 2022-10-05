import styles from '../styles/Home.module.scss'
import Login from './login'
import React, { useState,useEffect } from "react";
import  axios from 'axios'
import {toast} from "react-toastify";
import Modal from "react-bootstrap/Modal";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const  [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const [confirmpassword,setConfirmpassword]=useState("");


  const handleSubmit= async (e)=>{
    try{
      e.preventDefault();
      console.log("event passed--->",e, username, password,confirmpassword);
      const res = await axios.post("http://localhost:8000/api/register",{username,password,confirmpassword})
      console.log("data--->",res);
      if(res.data.error) {
        toast.error(res.data.error)
      }else{
        toast.success("Registration success!");
        setUsername('')
        setPassword('')
        setConfirmpassword('')
        router.push('/login')
      }
   
            
    }catch(e){
      console.log("register-->",e);
    }
 

    
  }
  return (
    <div className={styles.container}>
          <>
          <div className="fullFrame">
                  <div className="leftsidecontent">
                    <img src="/images/login_bg.png" />
                  </div>
                  <div className="rightsidecontent">
                    <div className="center_align">
                      <div className="regpage">
                        <div className="accountFrame">
                          <div className="account_sec">
                            <h3 className="heading18SemiBold mb_16">
                              To  Register
                            </h3>
                            <br/>
                            <form onSubmit={handleSubmit}>
                              <div className="mb_12">
                                <input
                                  type="text"
                                  placeholder="User Name"
                                  className="input_form width_100per"
                                  id="subdomain"
                                  value={username}
                                  onChange={(e) => setUsername(e.target.value)}
                                />
                              </div>
                              <div className="mb_12">
                                <input
                                  type="password"
                                  className="input_form width_100per"
                                  placeholder="New Password"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                />
                              </div>
                              <div className="mb_12">
                                <input
                                  type="password"
                                  className="input_form width_100per"
                                  placeholder="Confrim Password"
                                  value={confirmpassword}
                                  onChange={(e) => setConfirmpassword(e.target.value)}
                                />
                              </div>

                              <div className="DisplayFlex AlignItem_center justifycontent_spacebetween">
                                <div>
                                  Already a user?{" "}
                                  <a
                                    href="/login"
                                    className="forgotpassword_btn"
                                  >
                                    Login
                                  </a>
                                </div>
                                <div>
                                  <button
                                    className="darkGray_btn m10"
                                    disabled={!username || !password}
                                  >
                                    sign in
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
        </>
    </div>
  )
}
