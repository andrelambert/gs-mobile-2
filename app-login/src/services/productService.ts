import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Product, CreateProductRequest, UpdateProductRequest } from '../types/Product';

const PRODUCTS_COLLECTION = 'products';

// Convert Firestore timestamp to Date
const timestampToDate = (timestamp: any): Date => {
  if (timestamp && timestamp.toDate) {
    return timestamp.toDate();
  }
  return new Date();
};

// Get all products
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const q = query(collection(db, PRODUCTS_COLLECTION), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      title: doc.data().title || '',
      description: doc.data().description || '',
      createdAt: timestampToDate(doc.data().createdAt),
      updatedAt: timestampToDate(doc.data().updatedAt),
      userId: doc.data().userId || undefined,
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
};

// Get a single product by ID
export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        title: data.title || '',
        description: data.description || '',
        createdAt: timestampToDate(data.createdAt),
        updatedAt: timestampToDate(data.updatedAt),
        userId: data.userId || undefined,
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw new Error('Failed to fetch product');
  }
};

// Create a new product
export const createProduct = async (productData: CreateProductRequest, userId?: string): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), {
      title: productData.title,
      description: productData.description,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      userId: userId || null,
    });
    
    return docRef.id;
  } catch (error) {
    console.error('Error creating product:', error);
    throw new Error('Failed to create product');
  }
};

// Update an existing product
export const updateProduct = async (id: string, productData: UpdateProductRequest): Promise<void> => {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    const updateData: any = {
      updatedAt: serverTimestamp(),
    };
    
    if (productData.title !== undefined) {
      updateData.title = productData.title;
    }
    if (productData.description !== undefined) {
      updateData.description = productData.description;
    }
    
    await updateDoc(docRef, updateData);
  } catch (error) {
    console.error('Error updating product:', error);
    throw new Error('Failed to update product');
  }
};

// Delete a product
export const deleteProduct = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, PRODUCTS_COLLECTION, id));
  } catch (error) {
    console.error('Error deleting product:', error);
    throw new Error('Failed to delete product');
  }
};

// Nintendo console placeholder data
export const NINTENDO_CONSOLES = [
  {
    title: "Nintendo Switch",
    description: "Hybrid gaming console that can be docked to a TV or played as a handheld device. Features detachable Joy-Con controllers and supports both first-party and third-party games."
  },
  {
    title: "Nintendo Switch OLED",
    description: "Enhanced version of the Nintendo Switch featuring a vibrant 7-inch OLED screen, improved audio, enhanced stand, and 64GB internal storage."
  },
  {
    title: "Nintendo 3DS",
    description: "Portable gaming system with dual screens and stereoscopic 3D display without glasses. Backward compatible with DS games and features StreetPass connectivity."
  },
  {
    title: "Nintendo Wii U",
    description: "Home console with innovative GamePad controller featuring a touchscreen. Supports both GamePad and traditional Wii Remote controllers for versatile gameplay."
  },
  {
    title: "Nintendo Wii",
    description: "Revolutionary motion-controlled gaming console that introduced intuitive gesture-based gameplay. Backward compatible with GameCube games and controllers."
  },
  {
    title: "Nintendo DS Lite",
    description: "Dual-screen handheld gaming system with touch controls. Smaller and lighter than the original DS with brighter screens and longer battery life."
  }
];
