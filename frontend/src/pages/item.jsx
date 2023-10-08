import { useRouter } from 'next/router';
import styles from  '../../public/item.module.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer/Footer';
import { useState, useEffect } from 'react';
import Image from "next-image-export-optimizer";
import Loader from '../../components/Loader';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";


const Page = () => {
    const router = useRouter();

    const [isLoading, setLoading] = useState(false)
    const [image, setImage] = useState(null);
    const [desc, setDesc] = useState(null);
    const [title, setTitle] = useState(null);
    const [getId, setGetId] = useState('');
    const [color, setColor] = useState('');
    // const [data, setData] = useState([]);



      useEffect(() => {
        const queryString = window.location.search;

        const urlParams = new URLSearchParams(queryString);

        const page_type = urlParams.get('id')

        console.log('here', page_type);

        setLoading(true);

        const getCurrItem = async () => {
          const response = await fetch(`https://yans-cloud.duckdns.org:8000/getItems/${page_type}`, {
            method: "GET"
          }).then((res) => res.json());
          if (response.status == 200)
          {
            setDesc(response.description);
            setTitle(response.title);
            setImage(response.image);
            setGetId(page_type);
            console.log(response.message)
            console.log(response)
            setLoading(false)
          }

          else router.replace('/products')
          // console.log(`Response`, response);
        }
        getCurrItem();
        
      }, [])


      if (isLoading) return <div> <Loader /> </div>
      if (!image || !desc || !title) return <p>No image data</p>



      const submitData = async (e) => {
        e.preventDefault();
        let data = JSON.parse(localStorage.getItem('item')) || [];

        let dat = { color: color, id: getId };
        data.push(dat);
        localStorage.setItem('item', JSON.stringify(data));
        toast.success('Product added successfully', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log('added product successfully');
        console.log(color);
      }

    return(
        <>
          <div className= {styles.background} >
            < Navbar />
            <h3 className =  {styles.space}> 000</h3>
          </div>
          <div className = {styles.backgroundItems2}>
          <p className={styles.textResponse} > {title} </p>
          <Image
                width={'520'}
                height={'280'}
                // layout={'fill'}
                className={styles.imageResponze}
                // width={520}
                placeholder={'blur'}
                blurDataURL={`/images2/${image}`}
                // height={280}
                alt={"image"}
                src={'/images2/'+ image} //  '/images2/'+ curr.image
              />
              <p className={styles.descriptionResponse} > {desc} </p>
            <form className= {styles.formRes} onSubmit={submitData}>
              <div className= {styles.button0}>
                <input type="radio" id="a25" name="check-substitution-2" value="blue" onChange={ () => setColor('blue') }  />
                <label className="btn btn-default" for="a25">Blue</label>
                <input type="radio" id="a50" name="check-substitution-2" value="pink" onChange={() => setColor('pink')}/>
                <label className="btn btn-default" for="a50">Pink</label>
                <input type="radio" id="a75" name="check-substitution-2" value="orange"  onChange={() => setColor('orange')}/> 
                <label className="btn btn-default" for="a75">Orange</label>
                <input type="radio" id="a100" name="check-substitution-2" required value="black" onChange={() => setColor('black')}/>
                <label className="btn btn-default" for="a100">Black</label>
              </div>
            <div className = {styles.deaznam}>
              <input  type = "submit" className ={styles.order}  />
          </div>
            </form>
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
          <Footer />
        </>
    )
}
export default Page;