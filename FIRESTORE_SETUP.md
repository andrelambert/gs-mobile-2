# Firestore Security Rules Setup

This document explains how to set up and deploy the Firestore Security Rules for the Nintendo Products Management App.

## Security Rules Overview

The rules implement the following security model:

### Products Collection (`/products/{productId}`)
- **Read Access**: Open to all users (authenticated and unauthenticated)
  - Anyone can view the list of Nintendo console products
  - No authentication required for browsing products

- **Write Access**: Restricted to authenticated users only
  - Only logged-in users can create new products
  - Only logged-in users can update existing products  
  - Only logged-in users can delete products

### Other Collections
- **All Access**: Denied by default
  - Prevents access to any other collections that might be created
  - Follows the principle of least privilege

## Deploying the Rules

### Option 1: Firebase Console (Recommended)
1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project (`fiap-mobile-8ca1d`)
3. Navigate to **Firestore Database** → **Rules**
4. Copy the contents of `firestore.rules` file
5. Paste into the rules editor
6. Click **Publish** to deploy the rules

### Option 2: Firebase CLI
If you have Firebase CLI installed:

```bash
# Install Firebase CLI (if not already installed)
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project (if not already done)
firebase init firestore

# Deploy the rules
firebase deploy --only firestore:rules
```

## Rules File Location
The security rules are defined in: `firestore.rules`

## Testing the Rules
You can test the rules in the Firebase Console:
1. Go to **Firestore Database** → **Rules** 
2. Click on **Rules playground**
3. Test different scenarios:
   - Unauthenticated read access to products (should succeed)
   - Unauthenticated write access to products (should fail)
   - Authenticated write access to products (should succeed)

## Rule Explanation

```javascript
// Allow everyone to read products
allow read: if true;

// Only authenticated users can write
allow create, update, delete: if request.auth != null;
```

- `request.auth != null` checks if the user is authenticated
- `if true` allows the operation for anyone
- `allow read` covers both list and get operations
- `allow create, update, delete` covers all write operations

## Important Notes

1. **Deploy Before Testing**: Make sure to deploy these rules before testing the app
2. **Production Ready**: These rules are suitable for production use
3. **Scalable**: The rules will work efficiently even with thousands of products
4. **Secure**: Prevents unauthorized modifications while allowing public reading

## Troubleshooting

If you encounter permission errors:

1. **Check Authentication**: Ensure users are properly logged in for write operations
2. **Verify Rules**: Confirm the rules are deployed correctly in Firebase Console
3. **Clear Cache**: Sometimes clearing app cache helps with rule updates
4. **Check Network**: Ensure stable internet connection for Firestore operations
