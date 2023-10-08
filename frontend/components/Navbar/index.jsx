import styles from "../../public/products.module.css";
import { useRouter } from "next/router";
import ExportedImage from "next-image-export-optimizer";
import Head from "../Head";


export default function Page() {
    const router = useRouter();

    return (
        <>
            <Head />
            <div className={styles.containerForButtons}>
                <ExportedImage onClick={() => router.push('/')} width={"50"} height={"60"} className={styles.logo} alt="Logo picture" src="/Logo.png" />
                <button onClick={() => router.push("/")} className={styles.buttonHome} >
                    Home
                </button>
                <button onClick={() => router.push("/products")}  className={styles.buttonProducts} >
                    Products
                </button>
                <button onClick={() => router.push("/contacts")}  className={styles.buttonContactUs1} >
                    Contacts
                </button>
                <i onClick={() => router.push('/login')} className={`fa-regular fa-user ${styles.iconka}`} id={styles.akaunt} />
                <i onClick={() => router.push("/card")}  className={`fa-regular fa-credit-card ${styles.iconka}`}  id={styles.kolichka} />
            </div>

        </>
    );
}
