import React, { useEffect } from 'react'
import { useState } from 'react'
import { motion } from "framer-motion"
import { MdFastfood, MdCloudUpload, MdDelete, MdFoodBank, MdAttachMoney } from 'react-icons/md'
import { categories } from '../utils/data'
import Loader from './Loader'
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { storage, } from '../firebase.config'
import { GetAllFoodItems, saveItem } from '../utils/FirebaseFunctions'
import { useStateValue } from '../Context/stateProvider'
import { actionType } from '../Context/reducer'

const CreateContainer = () => {

  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrices] = useState("");
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [{ }, dispatch] = useStateValue();

  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    // console.log(imageFile);
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on('state_changed',
      (snapshot) => {
        const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
        setFields(true);
        setMessage('Error while you Uplaoding: Try Again...!');
        setAlertStatus('danger');
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadUrl => {
          setImageAsset(downloadUrl);
          setIsLoading(false);
          setFields(true);
          setMessage("Image uploaded successfully..");
          setAlertStatus("Success");
          setTimeout(() => {
            setFields(false);
          }, 4000);

        })
      }

    )
  }
  const deleteImage = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then(() => {
      setImageAsset(null);
      setIsLoading(false);
      setFields(true);
      setMessage("Image deleted successfully..");
      setAlertStatus("Success");
      setTimeout(() => {
        setFields(false);
      }, 4000);
    })
  }

  const saveDetails = () => {
    setIsLoading(true);

    try {
      if (!title || !categories || !calories || !imageAsset || !price) {
        setFields(true);
        setMessage('Required fields can"t empty...!');
        setAlertStatus('danger');
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      } else {
        const data = {
          id: `${Date.now()}`,
          title: title,
          imageURl: imageAsset,
          category: category,
          calories: calories,
          price: price,
          qty: 1
        }
        saveItem(data)
        setIsLoading(false);
        setFields(true);
        setMessage("Data uploaded successfully..");
        clearData();
        setAlertStatus("Success");
        setTimeout(() => {
          setFields(false);
        }, 4000);

      }
    }
    catch (error) {
      console.log(error);
      setFields(true);
      setMessage('Error while you Uplaoding: Try Again...!');
      setAlertStatus('danger');
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    }

    fetchData()
  };

  const clearData = () => {
    setTitle("");
    setImageAsset(null);
    setCalories("");
    setPrices("");
    setCategory("Select category")

  }

  const fetchData = async () => {
    await GetAllFoodItems().then((data) => {
      // console.log(data); 
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='w-full min-h-screen flex items-center justify-center'>
      <div className='w-[90%] md:w-[75%] border border-grey-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4'>
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${alertStatus === "danger"
              ? "bg-red-400 text-red-800"
              : "bg-emerald-400 text-emerald-800"
              }`}>{message}
          </motion.p>
        )}

        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdFastfood className='text-xl text-gray-700' />
          <input
            type="text"
            required
            value={title}
            placeholder="Give me a title...!"
            onChange={(e) => setTitle(e.target.value)}
            className='w-full h-full text-lg bg-transparent 
          outline-none border-none placeholder:text-grey-400 text-textColor'/>
        </div>

        <div className='w-full'>
          <select onChange={(e) => setCategory(e.target.value)}
            className="w-full outline-none text-base border-b-2 border-gey-200 p-2 rounded-md cursor-pointer ">
            <option value="other" className='bg-white'>Select Category</option>
            {categories && categories.map((item) => (
              <option key={item.id} className="text-base border-0 outline-none
                  capitalize bg-white text-headingColor "
                value={item.urlParamName}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div className='group flex justify-center items-center flex-col border-2 border-dotted
        border-gray-300 w-full h-225 md:h-420 cursor-pointer rounded-lg '>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!imageAsset ? (
                <>
                  <label className='w-full h-full items-center flex flex-col justify-center cursor-pointer'>
                    <div className='w-full h-full items-center flex flex-col justify-center gap-2'>
                      <MdCloudUpload className='text-grey-500 text-3xl hover:text-gray-700' />
                      <p className='text-grey-500  hover:text-gray-700'>click here to upload</p>
                    </div>
                    <input
                      type="file"
                      name='uploadimage'
                      accept='image/*'
                      onChange={uploadImage}
                      classsName="h-0 w-0" />
                  </label>
                </>) : (
                <>
                  <div className='relative h-full'>
                    <img src={imageAsset} alt="upload Image"
                      className='w-full h-full object-cover' />
                    <button
                      type='button'
                      className='absolute bottom-3 right-3 p-3 rounded-full bg-red-500
                       text-xl cursor-pointer outline-none hover: shadow-md duration-500
                       first-letter: transition-all ease-in-out'
                      onClick={deleteImage}>
                      <MdDelete className='text-white' />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <div className='w-full flex flex-col md:flex-row gap-3 items-center'>
          <div className='w-full py-2 border-b border-green-300 flex items-center gap-2'>
            <MdFoodBank className='text-gray-700 text-2xl' />
            <input
              type="text"
              required
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              placeholder='calories'
              className='w-full h-full text-lg bg-transparent outline-none border-none
               placeholder:text-gray-400 text-textColor'
            />
          </div>

          <div className='w-full py-2 border-b border-green-300 flex items-center gap-2'>
            <MdAttachMoney className='text-gray-700 text-2xl' />
            <input
              type="text"
              required
              value={price}
              onChange={(e) => setPrices(e.target.value)}
              placeholder='price'
              className='w-full h-full text-lg bg-transparent outline-none border-none
               placeholder:text-gray-400 text-textColor'
            />
          </div>
        </div>
        <div className='flex items-center w-full'>
          <button type='button' className='ml-0 md:ml-auto w-full md:w-auto
              border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold'
            onClick={saveDetails}>
            save 5:28 <hr />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateContainer
