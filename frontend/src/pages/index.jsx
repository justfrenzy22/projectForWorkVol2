import Image from 'next-image-export-optimizer';
import styles from  '../../public/home.module.css';
import NavbarH from '../../components/Navbar';
import Footer from '../../components/Footer/Footer';
import { useState, useEffect } from 'react';
import css from 'styled-jsx/css';
// Import site map



const Page = () =>{
    const [currentImage, setCurrentImage] = useState(0);
    const [hover, setHover] = useState(null);

    const images = [
      'An-Introduction-To-Graphic-Design-Part-1.png',
      'backgroundImage1.webp',
      'backgroundImage2.webp',
      'backgroundImage3.webp',
      'backgroundImage4.webp',
    ];

    const dotStyles = css`
    color: #dadada;
    &:hover {
      color: blue;
    }
  `;

    const handleNext = () => {
        setCurrentImage(currentImage === images.length - 1 ? 0 : currentImage + 1);
      };
    
      const handlePrevious = () => {
        setCurrentImage(currentImage === 0 ? images.length - 1 : currentImage - 1);
      };

      const handleKeyDown = event => {
        if (event.key === 'ArrowRight') {
          handleNext();
        } else if (event.key === 'ArrowLeft') {
          handlePrevious();
        }
      };

      useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
      });

      useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 10000)
        return () => clearInterval(interval);
      }, [currentImage, images.length] );


    return(
    <>
        
      
    <div  style={{backgroundImage: `url(/${images[currentImage]})`}} className={styles.background} >
        <NavbarH />
        <h2 className =  {styles.title}>Dimov Design</h2>
      <h3 className =  {styles.subtitle}>Graphic Design Services</h3>
      <button className={styles.arrLeft} onClick={handlePrevious}><i className='fa-solid fa-chevron-left'/></button>

      <button className={styles.arrRight} onClick={handleNext}><i className='fa-solid fa-chevron-right' /></button>
      <div className={styles.dotsDiv}>
      {images.map((e, idx) => {
        return <i key={idx} class={` fa-solid fa-circle ${styles.dots}`} style={{color: currentImage === idx ? 'red' : hover === idx ? '#5d5de7' : '#dadada', cursor: 'pointer'}} 
        onMouseOver={() => setHover(idx)} onMouseOut={() => setHover(null)} onClick={() => setCurrentImage(idx)} />
      })}
      </div>
    </div>
    <div className =  {styles.aboutUs}>
        <h1 className =  {styles.h1AboutUs}>About Us</h1>
        <h4 className =  {styles.brand}>Brand identity</h4>
        
        <div className= {styles.grid}>
        <Image placeholder={'blur'} alt={'image'}  className ={styles.aboutUsdivForPicture} width={'520'} height={'280'} src="/Brand-2-01.png"  />
        <div className={styles.overflowLorem}>
            <p className =  {styles.paragraph}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                 Animi blanditiis dolores placeat nihil, quia distinctio at voluptatibus dolor!
                  Voluptatem velit magnam veniam libero!
                   Natus illum quasi magni fugit earum veniam!
              </p>
            </div>
        </div>
       
            <div className="col-sm-6 col-md-6 col-xs-6">
                
            </div>
            <div className= {styles.grid2}>
            <h4 className =  {styles.message2AboutUs}>Build a precense online</h4> 
            <div className={styles.free}></div>
                <Image placeholder={'blur'} alt={'image'} className = { styles.buildPicture} width={520} height={280} src="/Presence-01.png" />
               <div className={styles.overflowLorem}>
                <p className =  {styles.secondLorem}> Lorem ipsum dolor sit amet, consectetur
                adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum
                dolore eu fugiat
                </p>
                </div>
            </div>
        <h2 className =  {styles.spaceAbout}>000</h2>
    </div>
    <div className =  {styles.sponsors}>
        <h2>Sponsors</h2>
        <Image placeholder={'blur'} alt={'image'} className={ styles.nikeLogo} width={520} height={280} src = "/Nike-Logo.png" />
        <Image placeholder={'blur'} alt={'image'} className={styles.luisViton} width={520} height={280} src = "/Louis-Vuitton-Logo-Tagline-Slogan-Founder-Owner-480x480.jpg" />
        <Image placeholder={'blur'} alt={'image'} className={styles.bapeLogo} width={520} height={280} src = "/bape-logo-bape-collab-transparent.png" />
        <div className ={styles.names} >
            <p className={styles.nikeText} >Nike</p>
            <p className={styles.luisVitonText} >Louis Viton</p>
            <p className={styles.bapeText} >Bape</p>
        </div>
        <Image placeholder={'blur'} alt={'image'} className={styles.balenciagaLogo} width={520} height={280} src = "/balenciaga-logo-brandlogos.net_.png" />
        <Image placeholder={'blur'} alt={'image'} className={styles.lacosteLogo} width={520} height={280} src = "/7067e2a36888b59fdc990c38980e066d.png" />
        <Image placeholder={'blur'} alt={'image'} className={styles.adidasLogo} width={520} height={280} src = "/2Pn8AyNV_400x400.png" />
        <div className ={styles.names} >
            <p className={styles.balenciagaText} >Balenciaga</p>
            <p className={styles.lacosteText} >Lacoste</p>
            <p className={styles.adidasText} >Adidas</p>
        </div>
    </div>
            <Footer />
        </>
    )
}


export default Page;