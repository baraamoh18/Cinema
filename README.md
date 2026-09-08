# Cinema App

This project is a React application for searching movies and managing your favourites. 

## AI Prompts Used

Below is a list of the prompts that were used with the AI assistant during this session to develop and troubleshoot the app:

1. **Routing and Authentication Setup:**
   > "Update the application routing. Requirements: add an /auth route that displays AuthView, allow HomeView to remain publicly accessible, protect the /favourites route, when an unauthenticated user opens /favourites, redirect them to /auth, when an authenticated user opens /auth, redirect them to /, preserve the Header on every page, use the user and authLoading values from AuthContext"

2. **Redirecting Unauthenticated Users:**
   > "If I am unauth and click favourite button from the home page, redirect me to the favourites page"

3. **User-Specific Data Storage in Firebase:**
   > "Update the existing favourites service so favourites are stored under the signed-in user's profile. Use this Real time DB structure: users/{userId}/favourites/{imdbID}. Update the existing functions so they receive userId... Requirements: use userId as the parent user document ID, use imdbID as the favourite document ID, preserve the existing function behaviour, do not use React hooks, do not access auth.currentUser inside the service, throw a readable error when userId is missing"

4. **Logout Button Implementation:**
   > "add logout button as well and connect it with logout function"

5. **Troubleshooting Firebase Configuration:**
   > "i got these errors and i cant even create a new account. Fix these errors"

6. **Fixing UI/Asset Errors:**
   > "fix these errors" *(This addressed the missing `favicon.ico` and broken poster images from deprecated placeholder URLs)*

7. **Documentation:**
   > "create me in read me all prompts that we used for this app"

## How AI Assisted Throughout the Implementation

The AI assistant acted as a collaborative pair programmer, significantly accelerating the development process. Key areas of assistance included:
- **Architectural Refactoring:** Rapidly rewriting the React Router setup in `App.tsx` to handle authenticated and unauthenticated routes securely using a nested component (`AppRoutes`).
- **Feature Implementation:** Modifying business logic across multiple ViewModels (e.g., `useHomeViewModel.ts`, `useFavouritesViewModel.ts`) to seamlessly wire up UI components (like the Favourite button) to authentication states and navigation.
- **Database Restructuring:** Quickly updating the Firebase Service layer to use user-specific real-time database paths (`users/{userId}/favourites`) across all CRUD operations, ensuring strict separation of user data.
- **Error Resolution:** Analyzing browser console screenshots to identify Firebase misconfigurations (e.g., disabled Email/Password provider) and broken image placeholders, providing immediate HTML/CSS fixes to resolve them.

## Manual Improvements and Corrections

While the AI handled the bulk of code generation, specific manual oversight and constraints were required to ensure code quality:
- **Architectural Constraints:** The AI was explicitly instructed *not* to use React Hooks inside `firebaseService.ts`. This manual boundary enforced a clean separation of concerns, ensuring that `userId` was properly passed as arguments from the ViewModels rather than coupling the service layer to React Context.
- **Contextual Verification:** When prompted to "add a logout button," manual review revealed that a logout button was already implemented and fully functional within `Header.tsx`. The AI was then utilized simply to verify that the routing edge cases upon logout were handled correctly.
- **Asset Management:** To fix broken external image placeholders (via.placeholder.com), the AI suggested using inline SVG data URIs and CSS fallbacks. These suggestions were reviewed and integrated manually to ensure they matched the dark-mode aesthetic of the application without needing to download external assets.
