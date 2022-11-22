import React, { useState } from "react";
import {storage} from "../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import {BsCameraFill} from "react-icons/bs"
import './perfilStyles.css'
import Navbar from '../Navbar/navbar'

let loadfeed = 0

const Perfil = () => {
  const [imgURL2, setImgURL2] = useState("");

  const postPhoto = async (e) => {
    if (imgURL2 != "") {
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({
                    imgURL2: imgURL2   
                })
            }
           await fetch('http://localhost:3001/api/user', requestOptions)
          }catch(error){
            setImgURL2('')     
        }
    }else{
      alert("preencha todos os campos")
        }
    }
  const [progressPorcent, setProgresspercent] = useState(0);
  const [users, setUsers] = useState([])

//   const getPerfil = async () => {  
//     try {
//         const  response = await fetch('http://localhost:3001/api/user/' + JSON.parse(localStorage.getItem('id')))
//         const data = response.json()
//         data.then(
//             (val) => setUsers(val.data)
//         )   
//       }catch( error){
//         console.log(error);
//         setUsers([])
        
//     }
// }
// if(loadfeed < 7){
// loadfeed++
// getPerfil()
// }

   const formHandler = (e) => {
    e.preventDefault()
    const file = e.target[0]?.files[0]

    if(!file) return; 
    

    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed",
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
     () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgURL2(downloadURL)
        });
        
      }
    );
   }
    return (
        <>
        <Navbar/>
        <div className='perfil'>
          <div className='perfil-container'>
          <div className='box-perfil'>
          <div className='fundo-perfil'>
          <div className="foto-perfil">
          {imgURL2 && <img className="foto-perfil2" src={URL.createObjectURL(imgURL2)} alt="Imagem"  value={imgURL2} onChange={(e) => setImgURL2(e.target.value)}/>}
          </div>
          <form onSubmit={formHandler}className="">
        <label className="label-file2" for="input-file2">
          <BsCameraFill className="iconmodalimg2"size={30} color='#532E1C' />
        </label>
      <input type="file" id='input-file2' onChange={e => setImgURL2(e.target.files[0])}/> 
     
       </form>
           
          </div>
          </div>
         
          <div className='box-perfil2'>
            
           
            <p className='gustavin'>Gustavin</p>
         
            <div className='inputes'>
              <div className='inpt'>
              <label className='label'>Alterar nome:</label>
            <input  type="text" className='inp_perfil' placeholder='Gustavo Silles'/>
            </div>
            <div className='inpt'>
            <label className='label'>Alterar nome de usuário:</label>
            <input  type="text" className='inp_perfil' placeholder='Gustavin'/>
            </div>
            <div className='inpt'>  
            <label className='label'>Alterar e-mail:</label>
            <input  type="text" className='inp_perfil' placeholder='sillesgustavo05@gmail.com'/>
            </div>
            <div className='inpt'>
            <label className='label'>Alterar senha:</label>
            <input  type="password" className='inp_perfil' placeholder='********'/>
            </div>
            </div>
            <div className='cantoEsquerdo'>
          <button className='btn_perfil' onClick={postPhoto}>Salvar alterações</button>
          </div>
         
          </div>
          </div>
        </div>
        
        </>
    )
}

export default Perfil
