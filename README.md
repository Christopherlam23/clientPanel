--------------- REACT FIREBASE APP ---------------

Create your firebase Project:

Under Develop/Database/Rules

REPLACE:
    service cloud.firestore {
      match /databases/{database}/documents {
        match /{document=**} {
          allow read, write;
        }
      }
    }

WITH:
    service cloud.firestore {
      match /databases/{database}/documents {
        match /{document=**} {
          allow read, write: if request.auth.uid != null;
        }
      }
    }
    
    
    
Download the Git Repository
and execute "npm install".

Go to src/store.js
Replace the content of firebaseConfig with yours.
==> Click on Setting Icon on the left panel.
==> Project Settings
==> Scroll Down
==> CLick on "Add Firebase to your web app"


To run the app, execute "npm start"

DONE :)



    
    
