import { useRouter } from 'next/router';
import styles from  '../../public/card.module.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer/Footer';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect, useRef } from 'react';
import ExportedImage  from "next-image-export-optimizer";
import Loader from "../../components/Loader";
import Modal from '../../components/Modal';






  
const Page = ()=>{
  const router = useRouter();

    const [data, setData] = useState([]);
    const [handleCheck, setHandleCheck] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [auth_token, setAuth] = useState('');
    const [isAcc, setAcc] = useState(false);
    const [isModal, setModal] = useState(false);


    /* Modal useStates */
    const [cardHolder, setCardHolder] = useState('');
    const [isCcv, setCcv] = useState(false);
    const [CCV, setCCV] = useState(undefined);
    const [selectedMonth, setSelectedMonth] = useState('1');
    const [selectedYear, setSelectedYear] = useState('23');
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const inputRefs = useRef([null, null, null, null]);
    const [inputs, setInputs] = useState({
      input1: '',
      input2: '',
      input3: '',
      input4: '',
    });

    const [currentInput, setCurrentInput] = useState(0);
    const inputIds  = ['input1', 'input2', 'input3', 'input4'];

    const [errors, setErrors] = useState({
      input1: '',
      input2: '',
      input3: '',
      input4: '',
    })



    useEffect(() => {


      const getDataBack = async () => {
        setLoading(true)
        let check = JSON.parse(localStorage.getItem('item'))
        if (check) {
        const response = await fetch(`https://yans-cloud.duckdns.org:8000/currCardItems`,  {
            method: 'POST',
            body: JSON.stringify(check),
            headers: {
              "Content-Type": "application/json"
          }
          }).then((res) => res.json());
          setData(response.message)
          console.log(`[RESPONSE]`, response)
        }




        setLoading(false)
      }

      localStorage.getItem('auth_token') ? setAcc(true) : ''
      getDataBack();
    }, []);

    
    
    const handlePopup = () => {

    }

    const putData = () => {
      for(let i = 0; i < data.length; i++) {
        alert(data[i])
      }


    }

    if (isLoading) return <Loader />

    return(
    <div>
      <div className={styles.background}>
          <Navbar />
          <h3 className =  {styles.space}> 000</h3>
      </div>
      <div className= {styles.backgroundItems} >
            <h1 className = {styles.titleItems} >Your Card</h1>
            <div className = {styles.divForItems} >
            { handleCheck ? (<> No products in your card </>) : (
              <>
              {

                 data.map((curr, idx) => {
                  console.log(`cwietove`, curr.colors)
                  console.log(data)
                  console.log(`cur`, curr);
                  return (
                    
                    <div className={styles.content} key={idx}>
                       <div className={styles.free}></div>
                      <ExportedImage
                        width={'520'}
                        height={'280'}
                        layout={'responsive'}
                        className={styles.image}
                        placeholder={'blur'}
                        // blurDataURL={`/images2/${curr.image}`}
                        src={'/images2/'+ curr.image}
                        alt={"image"}
                        priority
                        // dangerouslySetInnerHTML
                        />
                      <div className={styles.scroll}>
                        <h1 className={styles.h1}>{curr.title}</h1>
                        <p className={styles.p}>{curr.description}</p>
                       
                        <p className={styles.p} > { curr.count == 1 ? `цвят:  ${curr.color}` : `цветове: ${curr.color}` } </p>
                        <p className={styles.p} > {curr.count} { curr.count == 1 ? 'брой' : 'броя' } </p>
                      </div>
                    </div>
                  )
                })
              
              }

              </>
            ) }
        </div>
        { isAcc ?
          <input type={'button'} value={'submit'} onClick={() => setModal(true)} className ={styles.order} />
          :
          <input className={styles.order} type="button" value={'Login for your account'} onClick={() => router.replace('/login')} />  
        }
        
      <Modal isOpen={isModal} onClose={() => setModal(false)} setModal={setModal} currentMonth={currentMonth} currentYear={currentYear} currentInput={currentInput} setCurrentInput={setCurrentInput} errors={errors} setErrors={setErrors} inputIds={inputIds} isCcv={isCcv} setCcv={setCcv} setCCV={setCCV} CCV={CCV}  cardHolder={cardHolder} setCardHolder={setCardHolder} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} selectedYear={selectedYear} setSelectedYear={setSelectedYear} inputRefs={inputRefs} inputs={inputs} setInputs={setInputs} data={data} ></Modal>
      </div>
      <Footer />
    </div>
    )
}

export default Page;