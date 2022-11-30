/* eslint-disable react-hooks/exhaustive-deps */
import {
  doc,
  updateDoc,
  collection,
  deleteDoc,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useContext, createContext, useState } from "react";
import { db, storage } from "../../Firebase/Credenciales";

export const productsContext = createContext();

export const useProducts = () => {
  const context = useContext(productsContext);
  return context;
};

export function ProductProvider({ children }) {
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [allProducts, setAllProducts] = useState();
  const [categories, setCategories] = useState([])

  const deleteProductsImg = async (imgName) => {
    const imgRef = ref(storage, `documents/${imgName}`);
    deleteObject(imgRef);
  };

  const deleteTheProduct = async (id, imgName) => {
    setLoadingProduct(true);
    await deleteDoc(doc(db, "products", id));
    for (let i = 0; i < imgName.length; i++) {
      const names = imgName[i];
      await deleteProductsImg(names);
    }
  };

  const addStock = async (stock, id) => {
    const collectionRef = collection(db, "products");
    const refDoc = doc(collectionRef, id);

    await updateDoc(refDoc, {
      available: stock + 1,
    });
  };

  const ratingStars = async (rating, id, total) => {
    const collectionRef = collection(db, "products");
    const refDoc = doc(collectionRef, id);

    await updateDoc(refDoc, {
      rating: {
        ratingPorcentaje: rating,
        total: total,
      },
    });
  };


  const sendReviewsForProduct = async (id, review) => {
    const collectionRef = collection(db, "products");
    const refDoc = doc(collectionRef, id);
    const snapDoc = await getDoc(refDoc)
    const { reviews } = snapDoc.data()

    console.log(snapDoc.data())

    await updateDoc(refDoc, {
      reviews: [...reviews, review]
    })
  };

  const removeStock = async (stock, id) => {
    const collectionRef = collection(db, "products");
    const refDoc = doc(collectionRef, id);

    await updateDoc(refDoc, {
      available: stock - 1,
    });
  };

  const getListOfAllProducts = async () => {
    const products = [];
    const producstRef = collection(db, "products");
    const snapshot = await getDocs(producstRef);
    snapshot.forEach((doc) => {
      products.push(doc.data());
    });
    return products;
  };

  const getCategories = async ()=>{
    const categories = [];
    const categoriesRef = collection(db, "categorie");
    const snapshot = await getDocs(categoriesRef);
    snapshot.forEach((doc) => {
      categories.push(doc.data());
    });
    return categories;
  }

  const getListOfOneProduct = async (id) => {
    const collectionRef = collection(db, "products");
    const docuRef = doc(collectionRef, id);
    const snapDoc = await getDoc(docuRef);
    const product = snapDoc.data();
    return product;
  };

  const updateFetchingApi = () => {
    getListOfAllProducts().then((products) => {
      setAllProducts(products);
    });
  };

  const updateFetchingApiCategories = () => {
    getCategories().then((categories) => {
      setCategories(categories);
    });
  }

  return (
    <productsContext.Provider
      value={{
        deleteTheProduct,
        loadingProduct,
        addStock,
        removeStock,
        setLoadingProduct,
        updateFetchingApi,
        allProducts,
        getListOfOneProduct,
        ratingStars,
        sendReviewsForProduct,
        updateFetchingApiCategories,
        categories
      }}
    >
      {children}
    </productsContext.Provider>
  );
}
