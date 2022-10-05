import '../styles/globals.scss'
import "antd/dist/antd.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {ToastContainer,toast} from 'react-toastify';
import {useEffect} from "react";
import 'react-toastify/dist/ReactToastify.css';
import {UserProvider} from '../context';



function MyApp({ Component, pageProps }) {
      useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
        // toast("Hello world!" );
      }, []);
  return (
        <>

          <UserProvider>
          <div className={"page_wrapper"}>
            <div className="content_wrapper">
              <ToastContainer position="top-right"/>
              <Component {...pageProps} />
            </div>
          </div>
          </UserProvider>
        </>

  );
    }

export default MyApp;
