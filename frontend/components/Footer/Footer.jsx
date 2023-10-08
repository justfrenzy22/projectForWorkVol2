import styles from "../../public/home.module.css";
import ExportedImage from 'next-image-export-optimizer';
import deleteColl from '../../src/pages/api/deleteColl';
import { useRouter } from "next/router";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";


export default function Footer (props) {
    const router = useRouter();
    const [data,setData]=useState({ 
        name1:'',
        email:'',
        text:'',

    })
    async function SubmitEmail(e){
        e.preventDefault();
    
        
       //const name1 = document.forms[0][0].value;
       //const email = document.forms[0][1].value;
       //const text = document.forms[0][2].value;
        const response = await fetch("http://192.168.0.102:8000/sendEmail", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
      }
    }).then((res) => res.json());
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
    return (
        <>

            <div className={styles.gridContactUs}>
            <form onSubmit={SubmitEmail}>
                <div className={styles.contactUs1}>
                    <h2 className={styles.contactUsH2}>Contact us</h2>
                    
                         <input className={styles.inputName} value={data.name1} required onChange={handleChange} name="name1" placeholder="Name" type="text" />
                         <input className={styles.inputEmail} value={data.email}  required onChange={handleChange} name="email" placeholder="E-mail"type="email" />
                         <input className={styles.inputTypeHere}  value={data.text} required onChange={handleChange} name="text" placeholder="Type Here" type="text" />
                         <button className={styles.buttonContactUs}>Send</button>
                  
                </div>
                </form>
                <div className = {styles.contactUs2} >
                    {/* <img className = {styles.imgContactUs2}  src ="Logo-White.png"></img> */}
                    <ExportedImage className={styles.imgContactUs2} onClick={() => router.replace('/') } width={'135'} height={'125'}  alt="White Logo" src="Logo-White.png" />
                    <button  onClick={() => router.replace('/')} className ={styles.contactUsButtonHome} >Home</button>
                    <button  onClick={() => router.replace('/products')} className={styles.contactUsButtonProducts} >Products</button>
                    <button onClick={() => router.replace('/contacts')} className ={styles.contactUsButtonContactUs} >Contacts</button>
                    <button className ={styles.contactUsPrivacy} >Privacy And Policity</button>
                    <button className ={styles.contactUsTerms} >Terms And Conditions</button>
                </div>
            </div>
            <ToastContainer theme="dark"
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover />
            <div onClick={ () => props.check ? deleteColl() : '' } className={styles.CopyRights}>
                <h4>Copyright © 2022 Test Website - All Rights Reserved.</h4>
            </div>
        </>
    )
};