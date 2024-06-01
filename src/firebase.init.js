import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
/*
.env.local
VITE_apiKey= AIzaSyAsFV_ADQnqe0izoAXIZqR4xkOz7XtCWm0
VITE_authDomain= myhealth-792e7.firebaseapp.com
VITE_projectId= myhealth-792e7
VITE_storageBucket= myhealth-792e7.appspot.com
VITE_messagingSenderId= 437698324753
VITE_appId= 1:437698324753:web:be4c0ecf5851ed80d284b0

.gitignore

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

*/
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;