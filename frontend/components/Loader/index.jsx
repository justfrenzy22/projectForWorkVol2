import styles from './loader.module.css';
import { useEffect } from 'react';


const Loader = () => {


    return (
        <>
            <div className={styles.all} >
                <div className={styles.center} >
                    <div className={styles.ring} >
                        <span className={styles.text} >Loading...</span>
                    </div>
                </div>
            </div>
        </>
    )

}


export default Loader;