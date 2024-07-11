// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'mern-blog-296e0.firebaseapp.com',
  projectId: 'mern-blog-296e0',
  storageBucket: 'mern-blog-296e0.appspot.com',
  messagingSenderId: '86202823141',
  appId: '1:86202823141:web:7739d1c632888de8607f0c',
  measurementId: 'G-GW6QWGG9D1',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)
