// import { useRouter } from 'next/router';
import styles from  '../../public/contactUs.module.css';
import Navbar from '../../components/Navbar'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect } from "react";


const Page = () => {
    // const router = useRouter();
    const [data,setData]=useState({
        name1:'',
        email:'',
        text:'',

    })

    const SubmitEmail = async(e) => {
        e.preventDefault();
        const response = await fetch("https://yans-cloud.duckdns.org:8000/sendEmail", {
        method: "POST",
        body: JSON.stringify(data), 
        headers: {
          "Content-Type": "application/json"
      }
    }).then((res) => res.json());
    alert(response.message);
    response.status == 200 ? toast.success(`Message: ${response.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }) : toast.error(`Message:  ${response.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    };

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };


    return(
     <>
    <div className={styles.background}>
        <Navbar />
        <h3 className =  {styles.space}> 000</h3>
    </div>
    <form onSubmit={SubmitEmail}>
    <div className = {styles.contactUsBackground}>
        <h2>Contact Us</h2>
        <input className = {styles.inputName} value={data.name1} required onChange={handleChange} name="name1" placeholder="Name" type = "text"  ></input>
          <input className=  {styles.inputEmail} value={data.email} required onChange={handleChange} name="email" placeholder="E-mail" type = "email"  ></input>
          <input className={styles.inputTypeHere} value={data.text} onChange={handleChange} name="text" placeholder="Type Here" type = "text"  ></input>
          <button className= {styles.buttonContactUs} >Send</button>
          <i className='far fa-handshake'><label>+012 345 (6789)</label></i>
          <i className="far fa-envelope"><label  >profesionalemail@gmail.com</label></i>
          <i className="fa-regular fa-comment-dots"><label >profesional.instagram</label></i>
    </div>
    </form>
    <div className = {styles.CopyRights} >
        <h4>Copyright © 2022 Test Website - All Rights Reserved.</h4>
   </div>
    </>
    )
}
export default Page;