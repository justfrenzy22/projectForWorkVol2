import { useRouter } from "next/router";
import styles from "../../public/Register.module.css";
import { useState, useCallback } from "react";
import Header from "../../components/Head";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer/Footer";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";



const Page = () => {
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: ""
  });


  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const registerAPI = useCallback(async (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = data;

    if (password !== confirmPassword) {
        toast.info(`Try similar passwords`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
    } else {
        const response = await fetch("https://yans-cloud.duckdns.org:8000/register", {
            method: "POST",
            body: JSON.stringify({
                username,
                password,
                email
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => res.json());
        console.log(`Info`, response.message);
        toast.info(response.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
}, [data]);


  return (
    <>
      
      <Header />
      <div className={styles.background2}>
        <Navbar />
        <div className={styles.loginGrid}>
          <h2 className={styles.login}>Register</h2>
          <form onSubmit={registerAPI}>
            {" "}
            {/*  name ='data'*/}
            <input
              className={styles.inputName2}
              placeholder="Name"
              type="text"
              name="username"
              onChange={handleChange}
              required
            />
            <input
              className={styles.inputEmail}
              placeholder="Email"
              type="email"
              name="email"
              onChange={handleChange}
              required
            />
            <input
              className={styles.inputPassword}
              placeholder="Password"
              type="password"
              name="password"
              onChange={handleChange}
              required
            />
            <input
              className={styles.inputConfPassword}
              placeholder="Confirm Password"
              type="password"
              name="confirmPassword"
              onChange={handleChange}
              required
            />
            <button type="submit" className={styles.loginButton}>  {/* Notify */}
              {" "}
              Submit{" "}
            </button>
          </form>
          <br />
          <ToastContainer theme=""
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover />
          {/* <Suspense fallback={<div> Loading... </div>} > */}
          {/* { check ? <Notification msg={msg} check={check} type={type} change={setCheck} /> : '' } */}
          {/* </Suspense> */}
          <button
            onClick={() => router.replace("/login")}
            className={styles.loginLink2}
          >
            Login?
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Page;
