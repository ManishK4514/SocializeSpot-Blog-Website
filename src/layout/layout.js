import styles from "../styles/Layout.module.css";

export default function Layout({ children }) {
    return (
        <div className="flex justify-center items-center h-screen bg-blue-400">
            <div className="m-auto bg-slate-50 rounded-md w-[90%] md:w-3/5 h-[90%] md:h-3/4 grid lg:grid-cols-2 overflow-auto">
                <div className={`${styles.imgStyle} hidden md:block`}>
                    <div className={styles.cartoonImg}></div>
                    <div className={styles.cloud_one}></div>
                    <div className={styles.cloud_two}></div>
                </div>
                <div className="right flex flex-col justify-evenly">
                    <div className="text-center py-5 md:py-10">{children}</div>
                </div>
            </div>
        </div>
    );
}
