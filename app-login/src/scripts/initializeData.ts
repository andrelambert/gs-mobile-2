/**
 * Script to initialize Nintendo console data in Firestore
 * 
 * This script can be run to populate the database with initial Nintendo console products.
 * Run this script after setting up Firestore Security Rules.
 * 
 * To use this script:
 * 1. Make sure you have admin access to the Firebase project
 * 2. Ensure the user is authenticated (you can temporarily modify the script to use admin SDK)
 * 3. Call this function from a component or create a temporary admin script
 */

import { createProduct, NINTENDO_CONSOLES } from '../services/productService';

export const initializeNintendoConsoles = async (userId?: string): Promise<void> => {
  try {
    console.log('Initializing Nintendo console data...');
    
    for (const console of NINTENDO_CONSOLES) {
      try {
        const productId = await createProduct(console, userId);
        console.log(`Created product: ${console.title} (ID: ${productId})`);
      } catch (error) {
        console.error(`Failed to create product: ${console.title}`, error);
      }
    }
    
    console.log('Nintendo console initialization completed!');
  } catch (error) {
    console.error('Failed to initialize Nintendo consoles:', error);
  }
};

/**
 * Utility function to check if database is empty
 */
import { getAllProducts } from '../services/productService';

export const isDatabaseEmpty = async (): Promise<boolean> => {
  try {
    const products = await getAllProducts();
    return products.length === 0;
  } catch (error) {
    console.error('Error checking if database is empty:', error);
    return false;
  }
};

/**
 * Auto-initialize function that can be called when the app starts
 * Only initializes if the database is empty
 */
export const autoInitializeIfEmpty = async (userId?: string): Promise<void> => {
  try {
    const isEmpty = await isDatabaseEmpty();
    if (isEmpty) {
      console.log('Database is empty, initializing with Nintendo console data...');
      await initializeNintendoConsoles(userId);
    } else {
      console.log('Database already contains products, skipping initialization.');
    }
  } catch (error) {
    console.error('Auto-initialization failed:', error);
  }
};
