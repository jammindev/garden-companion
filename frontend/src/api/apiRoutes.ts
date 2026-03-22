const getBaseUrl = () => {
    if (window.location.hostname === "localhost") {
      return "http://localhost:8000/api/v1/"; // Local development URL
    } else {
      return "https://jammin-dev.com/api/v1/"; // Staging environment
    }
  };
  
export const ROOTURL = getBaseUrl();


const backendRoutes = {
    emailVisit: ROOTURL + "email-visit/",
    register: ROOTURL + "auth/users/",
    login: ROOTURL + "auth/jwt/create/",
    activate: ROOTURL + "auth/users/activation/",
    verifyToken: ROOTURL + "auth/jwt/verify/",
    todos: ROOTURL + "todos/",
    areas: ROOTURL + "areas/",
    seedlings: ROOTURL + "seedlings/",
    operations: ROOTURL + "operations/",
    // SEEDLING

}

export default backendRoutes

