import { ToastContainer, toast } from "react-toastify";

const handleColDel = async () => {
    const response = await fetch("http://192.168.0.102:8000/delete-col", {
      method: "GET",
    })
    .then((res) => res.json())
    // .catch((err) => console.log(`Error`, err));
    if( response.message > 200 ) {
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
    else
      toast.success(response.message , {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    console.log(response.message);
};

export default handleColDel;
