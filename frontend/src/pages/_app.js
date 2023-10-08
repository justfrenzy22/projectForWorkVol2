import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import Head from "next/head";
import Head1 from "../../components/Head";
// import '@/styles/globals.css'
// import sharp from "sharp";
config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
  
  return (
  <>
    <Head>
      <Head1 />
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous"/>
      <link rel='stylesheet'  href ='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/brands.min.css'/>
      <script src="https://kit.fontawesome.com/f561b3dc90.js" crossOrigin="anonymous"></script>
    </Head> 
    <Component {...pageProps} />
  </>
  )
};

export default MyApp;
