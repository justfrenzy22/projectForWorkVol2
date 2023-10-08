import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../../public/products.module.css";
import { useRouter } from "next/router";
import Image from "next-image-export-optimizer";
import Navbar from '../../components/Navbar';
import Footer from "../../components/Footer/Footer";
import Loader from "../../components/Loader";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";


const clickPlus = () => {

  const divPlus = document.getElementsByClassName("products_here__ir5sE")[0];

  if (divPlus.style.display == "block") divPlus.style.display = "none";
  else divPlus.style.display = "block";
}
const SubmitItem = async (e) => {
  e.preventDefault();
  let data = new FormData();
  data.append("title", document.forms[0][0].value);
  data.append("description", document.forms[0][1].value);
  data.append("files", document.forms[0][2].files[0]);
  
  for (const value of data.values()) console.log(value);
  
  const response = await fetch("https://yans-cloud.duckdns.org:8000/items", {
    
    method: "POST",
    body: data
  }).then((res) => res.json());

  // alert(response.sta)

  if( response.status == 200 ) {
    toast.success(response.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    
  }
  else
    toast.error(response.message , {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}

const Page = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false)
  const [ImageCount, setImageCount] = useState(0);
  const [numImagesShown, setNumImagesShown] = useState(4);


  useEffect(() => {

    setLoading(true);
    const blogsFetch = async () => {
      const response = await fetch("https://yans-cloud.duckdns.org:8000/allItems", {
        method: "GET",
      }).then((res) => res.json());
      console.log(response.message);
      setData(response.message);
      setLoading(false)
    };

    blogsFetch();
  }, []);

  if (isLoading) return <div> <Loader /> </div>

  return (
    <>
      <div className={styles.background}>
        <Navbar />
        <h3 className =  {styles.space}> 000</h3>
      </div>
      <div className={styles.backgroundItems}>
        <i
          onClick={() => clickPlus()}
          className="fa-solid fa-plus plus"
          id={styles.plus1}
        ></i>
        <div className={styles.here}>
          <form className={styles.form1} onSubmit={SubmitItem}>
            <label>Title :</label>
            <input className={styles.titleHere} required />
            <label>Description </label>
            <input className={styles.descriptionHere} required type="text" />
            <label>Image </label>
            <input
              type="file"
              id="myFile"
              required
              className={styles.imageItem}
            />
            <input type="submit" />
          </form>
        </div>
        <div className={styles.items}></div>

        {  data.slice(0, numImagesShown).map((curr, idx) => {
          console.log(curr)
          return (
            <div className={styles.content} onClick={() => router.replace(`/item?id=${curr._id}`)}  key={idx}>
              <h1 className={styles.h1}>{curr.title}</h1>
              <div></div>
              {/* <Suspense fallback={<div><h1>Loading...</h1></div>} > */}
              <Image
                width={'520'}
                height={'280'}
                className={styles.image}
                // width={520}
                placeholder={'blur'}
                blurDataURL={`/images2/${curr.image}`}
                // height={280}
                alt={"image"}
                src={'/images2/'+ curr.image} //  '/images2/'+ curr.image
              />
              {/* </Suspense> */}
              <div className={styles.scroll}><p className={styles.p}>{curr.description}</p></div>
            </div>
          );
        })}
        {numImagesShown <= 4 ? '' : <button onClick={() => setNumImagesShown(numImagesShown + 4)} className={styles.viewMore}>View more</button> }
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
      <Footer />
    </>
  );
};

export default Page;
