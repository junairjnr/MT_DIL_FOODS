
import { collection, doc, getDocs, orderBy, query, setDoc } from "firebase/firestore"
import { firestore } from "../firebase.config"

//saving new Item
export const saveItem = async (data) => {
    await setDoc(doc(firestore, "foodItems", `${Date.now()}`), data, { merge: true });
}


//get all food items    
export const GetAllFoodItems = async () => {

    const Items = await getDocs(query(collection(firestore, "foodItems"), orderBy("id", "desc")));
    return Items.docs.map((doc) => doc.data());
} 