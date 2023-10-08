import { useRouter } from "next/router";
import styles from "../../public/userLogin.module.css";
import { useState, useMemo } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Head";
import Navbar from "../../components/Navbar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";




let checker = true;
//f007
const Page = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const handleChange = ({currentTarget: input}) => {
    setData({...data, [input.name]: input.value});
  }


  const loginAPI = useMemo(() => {
    return async (e) => {
      e.preventDefault();
      const {email, password} = data;
      const response = await fetch("https://yans-cloud.duckdns.org:8000/login", {
          method: 'POST',
          body: JSON.stringify({
              email: email,
              password: password
          }),
          headers: {
              "Content-Type": "application/json"
          }
      }).then((res) => res.json());
  
      if (response.status == 200) {
        toast.success(`Hi ${response.name}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
          localStorage.setItem(`auth_token`, response.id);
      }
      else
      toast.error(response.message, {
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
  

  const router = useRouter();


  return (
    <>
      <Header />
      <div className={styles.background2}>
      <Navbar />
        <div className={styles.loginGrid}>
          <h2 className={styles.login}>Login</h2>
          <form name="data" onSubmit={loginAPI}>
            <input value={data.email} onChange={handleChange} className={styles.inputEmail} placeholder="Email" type="email" name="email" required />
            <input value={data.password} onChange={handleChange} className={styles.inputPassword} placeholder="Password" type="password" name="password" required/>
            <input type={'submit'} className={styles.loginButton} value={'Login'} />
            <a onClick={() => router.replace("/register")} className={styles.registerLink}>
              Register?
            </a>
          </form>
          <br />
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
        </div>
      </div>

      <Footer check={checker} />
    </>
  );
};
export default Page;
