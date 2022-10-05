import React,{useState,useContext, useEffect} from 'react'
import axios from 'axios'
import PhoneInput, { formatPhoneNumber, formatPhoneNumberIntl } from 'react-phone-number-input'
import { toast } from "react-toastify";


const MyForm = ({viewData}) =>{
    const [first,setFirst] = useState("")
    const [last,setLast] = useState("")
    const [middle,setMiddle] = useState("")
    const [email,setEmail] = useState("")
    const [phone,setPhone] = useState("")
    const [address,setAddress] = useState("")
    const [country,setCountry] = useState("")
    const [state,setState] = useState("")
    const [zip,setZip] = useState("")
    const [height,setHeight] = useState("")
    const [weight,setWeight] = useState("")
    const [error, setError] = useState(null);


    const states = [
        {value:"Select Country", lable:"Select Country"},
        {value:"India", lable:"India"},
        {value:"United States of America", lable:"United States of America"}
    ]

    const india = [
        {value:"Select State", lable:"Select State"},
        {value:"Tamil Nadu", lable:"Tamil Nadu"},
        {value:"Kerala", lable:"Kerala"},
        {value:"Karnataka", lable:"Karnataka"}
        ]

        const usa = [
            {value:"Select State", lable:"Select State"},
            {value:"New York", lable:"New York"},
            {value:"Chigago", lable:"Chigago"},
            {value:"Los Angeles", lable:"Los Angeles"}
            ]
  
            function isValidEmail(email) {
                return /\S+@\S+\.\S+/.test(email);
              }
            
              const handleChange = e => {
                if (!isValidEmail(e.target.value)) {
                  setError('Email is invalid');
                } else {
                  setError(null);
                }
            
                setEmail(e.target.value)
              };


    const handleSubmit = async(e) =>{
  
        e.preventDefault();

        console.log(first,last,middle,address,email,formatPhoneNumberIntl(phone),zip,country,state)
      
            try{

            const data = await axios.post('/save-details',{   
                firstName: first,
                middleName: middle,
                lastName: last,
                email: email,
                phone: formatPhoneNumberIntl(phone),
                address: address,
                country: country,
                state: state,
                zip: zip,
                height: height,
                weight: weight
            })
            console.log(data)
            toast.success("Data added successfuly")
        viewData() 
    }catch(e){
            console.log(err)
            toast.error("error try again")
        }
        }

    const handleCountry = (e) =>{
        setCountry(e.target.value)
      
    }
  
    const handleState = (e) =>{

        setState(e.target.value)
        console.log( setState(e.target.value))
    }

    useEffect(()=>{
       
    },[handleCountry])

    return(
        <>
        <form onSubmit={handleSubmit}>
            <div className="form-group1">
                    <div className="form-group1-sub p2">
                    <small>first name</small>
                    <input type="text" placeholder="first name" value={first} onChange={(e) =>setFirst(e.target.value)}/>
                    </div>
                    <div className="form-group1-sub p2">
                        <small>last name</small>
                        <input type="text" placeholder="last name" value={last} onChange={(e) =>setLast(e.target.value)}/>
                        </div>
                      <div className="form-group1-sub p2">
                    <small>middle name</small>
                    <input type="text" placeholder="middle name"value={middle} onChange={(e) =>setMiddle(e.target.value)}/>
                    </div>
            </div>
            <small className="phone">phone</small>
          
            <PhoneInput
                placeholder="Enter phone number"
                value={phone} onChange={setPhone}/>

            <div className="form-group1">
            <div className="form-group1-sub p2">
      
            <small>email</small>
            <input type="text" placeholder="email" value={email} onChange={handleChange}/>
            {error && <h6 style={{color: 'red'}}>{error}</h6>}
            </div>
            
            </div>
            <small>address</small>
            <input type="text" placeholder="address" value={address} onChange={(e) =>setAddress(e.target.value)}/>

            <small>country</small>
            <select onChange={handleCountry}>
           { states.map((e,i)=>{
           return <option value={e.value} key={i}>{e.lable}</option>
           })}
            </select>

            <small>state</small>
           { country === "India" ?( 
           
           <select onChange={handleState}>
          { india.map((e,i)=>{
            <option value="option">Select State</option>
           return <option value={e.value}  key={i}>{e.lable}</option>
          }) }
            </select>
            
            ): country === "United States of America" ? (
                <select onChange={handleState}>
                    
                { usa.map((e,i)=>{
                        <option value="option">Select State</option>
                        return <option value={e.value} key={i}>{e.lable}</option>

              }) }
                </select>

            ):(<>
            <select onChange={handleState}>
            <option value="option">Select State</option>
            </select>
            </>)}

            <small>zipcode</small>
            <input type="text" placeholder="zipcode" value={zip} onChange={(e) =>setZip(e.target.value)}/>

            <div className="form-group1">
                    <div className="form-group1-sub p2">
                    <small>Height</small>
                    <input type="text" placeholder="Height" value={height} onChange={(e) =>setHeight(e.target.value)}/>
                    </div>
                    <div className="form-group1-sub p2">
                        <small>weight</small>
                        <input type="text" placeholder="Weight" value={weight} onChange={(e) =>setWeight(e.target.value)}/>
                    </div>
            </div>
        
            <button type="submit" className="submitButton">add user</button>
        </form>
        
        </>
    )
}


export default MyForm