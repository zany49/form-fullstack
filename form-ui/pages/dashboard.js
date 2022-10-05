import React,{useState,useContext,useEffect} from 'react'
import MyForm from '../components/form'
import Display from '../components/display'
import axios from 'axios'
import  { UserContext } from '../context';
const Dashboard = () => {

  const[state,setState] = useContext(UserContext)
  const [datas,setDatas] = useState([]);

  const viewData=async()=>{
    const {data} = await axios.get('/getUser')
    console.log(data.data)
     setDatas(data.data)
    }

      console.log(datas)
    // console.log ( data)
    useEffect(()=>{
      if(state&&state.token) {
      viewData()
      }
  },[state&&state.token])


  return (

    <div>
      <div className="page_info">
        <div>
          <h3 className="heading24_bold mytitle">My form</h3>
        </div>
      </div>
      <div>
            <MyForm viewData={viewData}/>
        </div>
      { datas.length > 0 && ( <div >
            <Display datas={datas} viewData={viewData}/>
        </div>)
        }
    </div>

  );
}

export default Dashboard
