// import React, { useState, useEffect } from "react";
// import AuthForm from "./components/Auth/AuthForm";
// import { auth, db } from "./firebase";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   onAuthStateChanged,
//   User,
// } from "firebase/auth";
// import { doc, setDoc, getDoc, Timestamp } from "firebase/firestore";

// export default function App() {
//   const [mode, setMode] = useState<"login" | "signup">("login");
//   const [user, setUser] = useState<User | null>(null);
//   const [roadmap, setRoadmap] = useState<any>(null);

//   // 🔹 Check if user is already logged in
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//       if (currentUser) {
//         setUser(currentUser);
//         await fetchRoadmap(currentUser.uid);
//       } else {
//         setUser(null);
//         setRoadmap(null);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   // 🔹 Handle login/signup
//   const handleAuth = async (
//     email: string,
//     password: string,
//     confirmPassword?: string
//   ): Promise<{ success: boolean; message: string }> => {
//     try {
//       if (mode === "signup") {
//         const res = await createUserWithEmailAndPassword(auth, email, password);

//         // Create user document in Firestore
//         await setDoc(doc(db, "users", res.user.uid), {
//           email,
//           createdAt: Timestamp.now(),
//         });

//         return { success: true, message: "Signup successful! Please login." };
//       }

//       if (mode === "login") {
//         const res = await signInWithEmailAndPassword(auth, email, password);
//         setUser(res.user);
//         await fetchRoadmap(res.user.uid);
//         return { success: true, message: "Login successful! Redirecting..." };
//       }

//       return { success: false, message: "Something went wrong" };
//     } catch (err: any) {
//       return { success: false, message: err.message };
//     }
//   };

//   // 🔹 Fetch roadmap from Firestore
//   const fetchRoadmap = async (userId: string) => {
//     const roadmapRef = doc(db, "users", userId, "roadmap", "categories");
//     const snapshot = await getDoc(roadmapRef);
//     if (snapshot.exists()) {
//       setRoadmap(snapshot.data());
//     } else {
//       setRoadmap(null);
//     }
//   };

//   // 🔹 Save roadmap to Firestore
//   const saveRoadmap = async (userId: string, newRoadmap: any) => {
//     await setDoc(doc(db, "users", userId, "roadmap", "categories"), newRoadmap);
//     setRoadmap(newRoadmap);
//   };

//   // 🔹 Handle logout
//   const handleLogout = async () => {
//     await signOut(auth);
//     setUser(null);
//     setRoadmap(null);
//   };

//   if (user) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
//         <h1 className="text-3xl font-bold mb-4">Welcome to the Dashboard 🚀</h1>

//         {/* Roadmap Example */}
//         <div className="w-full max-w-md bg-gray-900 p-6 rounded-lg shadow-lg">
//           <h2 className="text-xl font-semibold mb-2">Your Roadmap</h2>
//           {roadmap ? (
//             <pre className="text-gray-300">{JSON.stringify(roadmap, null, 2)}</pre>
//           ) : (
//             <p className="text-gray-400">No roadmap found. Upload a JSON file to start.</p>
//           )}

//           {/* Example: Save demo roadmap button */}
//           <button
//             onClick={() =>
//               saveRoadmap(user.uid, {
//                 Java: { target: 200, completed: 50 },
//                 Python: { target: 150, completed: 30 },
//                 DSA: { target: 300, completed: 120 },
//               })
//             }
//             className="mt-4 px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition"
//           >
//             Save Demo Roadmap
//           </button>
//         </div>

//         {/* Logout */}
//         <button
//           onClick={handleLogout}
//           className="mt-6 px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition"
//         >
//           Logout
//         </button>
//       </div>
//     );
//   }

//   return (
//     <AuthForm
//       mode={mode}
//       onSwitchMode={() => setMode(mode === "login" ? "signup" : "login")}
//       onSubmit={handleAuth}
//     />
//   );
// }



import Dashboard from "./components/Dashboard/Dashboard";

export default function App() {
  return <Dashboard />;
}
