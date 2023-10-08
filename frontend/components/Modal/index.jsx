import React, { useEffect, useState, useRef, useCallback } from 'react';
import styles from './style.module.css';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";


const Modal = ({ isOpen, onClose, setModal, data, cardHolder, setCardHolder, isCcv, setCcv, CCV, setCCV, selectedMonth, setSelectedMonth, selectedYear, setSelectedYear, currentMonth, currentYear, inputRefs, inputs, setInputs, inputIds, currentInput, setCurrentInput, errors, setErrors  }) => {
  const modalRef = useRef(null);
  

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setModal(false);
    }
  };

  const handleClickDown = event => event.key === 'Escape' ? setModal(false) : null;

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener('keydown', handleClickDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener('keydown', handleClickDown);
    }
  })


  // *Functions*


  const handleCcvChange = useCallback((e) => {
    const inputValue = e.target.value;
    const letters = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ[];,./!@#$%^&*()_+:}{"|?><~' '`;
    const isString = letters.split('').some(letter => inputValue.includes(letter));


    isString ?   toast.error('Input should be numbers', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    }) : setCCV(inputValue);

  });

  
  const handleInputChange = useCallback((e) => {
    const inputId = e.target.id;
    const inputValue = e.target.value;
    const letters = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ[];,./!@#$%^&*()_+:}{"|?><~' '`;
    // const isString = /^[a-zA-Z]+$/.test(inputValue);
    const isString = letters.split('').some(letter => inputValue.includes(letter));


    if (isString) {
      toast.error('Input should be numbers', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setErrors({...errors, [inputId]: 'Input should be numbers'});
    }

    else {
      setInputs({...inputs, [inputId]: inputValue});
      setErrors({...errors, [inputId] : ''});
    }


    if (inputValue.length === 4 && !isString) {
      const nextInputId = inputIds[currentInput + 1];
      if (nextInputId) {
        setCurrentInput(currentInput + 1);
        inputRefs.current[currentInput + 1].focus();
      }
    }
  },[inputs,currentInput,inputIds,errors]);


   const handleKeyDown = (e) => {
    if (!((e.keyCode > 95 && e.keyCode < 106)
      || (e.keyCode > 47 && e.keyCode < 58)
      || e.keyCode === 8
      || e.keyCode === 9
      || e.keyCode === 17
      || e.keyCode === 18
      || e.keyCode === 37
      || e.keyCode === 38
      || e.keyCode === 39
      || e.keyCode === 40
      || (e.keyCode !== 186 && e.keyCode !== 187 && e.keyCode !== 188 && e.keyCode !== 189 && e.keyCode !== 190 && e.keyCode !== 191 && e.keyCode !== 192)
      )) {
      e.preventDefault();
    }
  }
  
  const resultCardNumber = inputIds.reduce((str, idx) => str + inputs[idx] + ' ', '');


  const selectedDate = () => {
    if(selectedMonth === '' || selectedYear === '') return '';

    selectedMonth < 10 ? '0' + selectedMonth + '/' + selectedYear.toString().slice(-2) : selectedMonth + '/' + selectedYear.toString().slice(-2);
  }


  const handlePayment = async (e) => {
    e.preventDefault();
    let cardNumber = "";
    for (let i = 0 ; i < resultCardNumber.length;i++){
      cardNumber+=resultCardNumber[i]+" ";
    }
    //console.log('res '+cardNumber);
   // console.log(`result`, resultCardNumber)====
    const response = await fetch('https://yans-cloud.duckdns.org:8000/stripePayment',  {
      method: 'POST',
      body: JSON.stringify({
        data: data, //product
        ccv: CCV,
        cardHolder: cardHolder,
        cardNumber: resultCardNumber,//cardNumber
        selectedMonth: selectedMonth,
        selectedYear: selectedYear
      }),
      headers: {
        "Content-Type": "application/json"
    }
    }).then((res) => res.json())

    console.log(`for example`, response.message);
    if (response.message != "Accepted payment!"){
      
        toast.error('Somethings wrong', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setErrors('Invalid card or try again later');
      }else {
        toast.success(`${response.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
     
      }
  }


  
  return (
    <> {isOpen ? (
      <div className={styles.modal}  >
        <div className={styles.content} ref={modalRef} >
          <div className={styles.checkout}>
            <div className={ ` ${styles.creditCardBox} ${ isCcv ? styles.hover : '' }`}>
            <div className={styles.flip}>
              <div className={styles.front}>
                <div className={styles.chip}>{}</div>
                <div className={styles.logo}>

              <g>
                <g>
                  <path d="M44.688,16.814h-3.004c-0.933,0-1.627,0.254-2.037,1.184l-5.773,13.074h4.083c0,0,0.666-1.758,0.817-2.143
                          c0.447,0,4.414,0.006,4.979,0.006c0.116,0.498,0.474,2.137,0.474,2.137h3.607L44.688,16.814z M39.893,26.01
                          c0.32-0.819,1.549-3.987,1.549-3.987c-0.021,0.039,0.317-0.825,0.518-1.362l0.262,1.23c0,0,0.745,3.406,0.901,4.119H39.893z
                          M34.146,26.404c-0.028,2.963-2.684,4.875-6.771,4.875c-1.743-0.018-3.422-0.361-4.332-0.76l0.547-3.193l0.501,0.228
                          c1.277,0.532,2.104,0.747,3.661,0.747c1.117,0,2.313-0.438,2.325-1.393c0.007-0.625-0.501-1.07-2.016-1.77
                          c-1.476-0.683-3.43-1.827-3.405-3.876c0.021-2.773,2.729-4.708,6.571-4.708c1.506,0,2.713,0.31,3.483,0.599l-0.526,3.092
                          l-0.351-0.165c-0.716-0.288-1.638-0.566-2.91-0.546c-1.522,0-2.228,0.634-2.228,1.227c-0.008,0.668,0.824,1.108,2.184,1.77
                          C33.126,23.546,34.163,24.783,34.146,26.404z M0,16.962l0.05-0.286h6.028c0.813,0.031,1.468,0.29,1.694,1.159l1.311,6.304
                          C7.795,20.842,4.691,18.099,0,16.962z M17.581,16.812l-6.123,14.239l-4.114,0.007L3.862,19.161
                          c2.503,1.602,4.635,4.144,5.386,5.914l0.406,1.469l3.808-9.729L17.581,16.812L17.581,16.812z M19.153,16.8h3.89L20.61,31.066
                          h-3.888L19.153,16.8z"/>
                </g>
              </g>
            
          </div>
          <div className={styles.number}>{resultCardNumber == undefined ? 'Card Number' : resultCardNumber }</div>
          

          <div className={styles.cardHolder}>
            <label>Card Holder</label>
            <div>{cardHolder}</div>
          </div>
          <div className={styles.cardExpirationDate}>
            <label>Expires</label>
            {/* selectedMonth < 10 ? "0" + selectedMonth : selectedMonth  +'/'+ selectedYear.toString().slice(-2) */}
            <div>{
                
              selectedMonth < 10  ?  '0' + selectedMonth + '/' + selectedYear.toString().slice(-2) : selectedMonth + '/' + selectedYear.toString().slice(-2) }
              </div>
          </div>
        </div>
        <div className={styles.back}>
          <div className={styles.strip}></div>
          <div className={styles.logo}>
            
              <g>
                <g>
                  <path d="M44.688,16.814h-3.004c-0.933,0-1.627,0.254-2.037,1.184l-5.773,13.074h4.083c0,0,0.666-1.758,0.817-2.143
                          c0.447,0,4.414,0.006,4.979,0.006c0.116,0.498,0.474,2.137,0.474,2.137h3.607L44.688,16.814z M39.893,26.01
                          c0.32-0.819,1.549-3.987,1.549-3.987c-0.021,0.039,0.317-0.825,0.518-1.362l0.262,1.23c0,0,0.745,3.406,0.901,4.119H39.893z
                          M34.146,26.404c-0.028,2.963-2.684,4.875-6.771,4.875c-1.743-0.018-3.422-0.361-4.332-0.76l0.547-3.193l0.501,0.228
                          c1.277,0.53{styles.2,2.104,0.747,3.661,0.747c1.117,0,2.313-0.438,2.325-1.393c0.007-0.625-0.501-1.07-2.016-1.77
                          c-1.476-0.683-3.43-1.827-3.405-3.876c0.021-2.773,2.729-4.708,6.571-4.708c1.506,0,2.713,0.31,3.483,0.599l-0.526,3.092
                          l-0.351-0.165c-0.716-0.288-1.638-0.566-2.91-0.546c-1.522,0-2.228,0.634-2.228,1.227c-0.008,0.668,0.824,1.108,2.184,1.77
                          C33.126,23.546,34.163,24.783,34.146,26.404z M0,16.962l0.05-0.286h6.028c0.813,0.031,1.468,0.29,1.694,1.159l1.311,6.304
                          C7.795,20.842,4.691,18.099,0,16.962z M17.581,16.812l-6.123,14.239l-4.114,0.007L3.862,19.161
                          c2.503,1.602,4.635,4.144,5.386,5.914l0.406,1.469l3.808-9.729L17.581,16.812L17.581,16.812z M19.153,16.8h3.89L20.61,31.066
                          h-3.888L19.153,16.8z"/>
                </g>
              </g>
            

          </div>
          <div className={styles.ccv}>
            <label>CCV</label>
            <div>{CCV}</div>
          </div>
        </div>
      </div>
            </div>

                            {/*  Form:   */}

            <form className={styles.form} autoComplete="off" noValidate onSubmit={handlePayment}>
              <fieldset>
                <label htmlFor="card-number">Card Number</label>
                {inputIds.map((inputId, idx) => (
                  <>
                    <input ref={el => inputRefs.current[idx] = el}
                      className={styles.inputCartNumber}
                      type="num"
                      id={inputId}
                      key={inputId}
                      maxLength={4}
                      value={inputs[inputId]}
                      onChange={handleInputChange}
                      required
                      onKeyDown={handleKeyDown}/>
                  </>
                ))}
              </fieldset>
              <fieldset>
                <label htmlFor="card-holder">Card holder</label>
                <input type="text" onChange={(e) => setCardHolder(e.target.value)} maxLength={20} id="card-holder" required/>
              </fieldset>
              <fieldset className={styles.fieldsetExpiration}>
                <label htmlFor="card-expiration-month">Expiration date</label>
                <div className={styles.select}>
                  <select id="card-expiration-month" defaultValue={currentMonth + 1} onChange={(e) => setSelectedMonth(e.target.value)} required>
                  {
                    Array(12).fill().map((_,i) => <option key={i} value={i+1}>{(i+1 < 10) ? "0" + (i+1) : (i+1)}</option>)
                  }
                  </select>
                </div>
                <div className={styles.select}>
                  <select id="card-expiration-year" defaultValue={currentYear} onChange={(e) => setSelectedYear(e.target.value)} required>
                    {
                      Array(10).fill().map((_,i) => <option key={i} value={currentYear+i}>{currentYear+i}</option>)
                    }
                  </select>
                </div>
              </fieldset>
              <fieldset className={styles.fieldsetCcv}>
                <label htmlFor="card-ccv">CCV</label>
                <input type="text" pattern="[0-9]{4}" id="card-ccv" onChange={handleCcvChange} onKeyDown={handleKeyDown}  onBlur={ () => setCcv(false) } onFocus={() => setCcv(true) } maxLength="3" value={CCV} required />
              </fieldset>
              <button type={'submit'} className={styles.btn}><i className="fa fa-lock"></i> Submit</button>
            </form>
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
      </div>
    ) : null}
    </>
  );
};

export default Modal;

