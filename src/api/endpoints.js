const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
  },

  USER: {
    REGISTER: "/user/register",
    UPDATE_LANGUAGE: "/user/update-language",
    UPDATE_PLAN: "/user/update-plan",
    GET_PROFILE: "/user/get-profile",
    UPDATE_PROFILE_PHOTO: "/user/upload-profile-photo"
  },

  ORDER: {
    CREATE: "/orders/create",
    VERIFY: "/orders/verify",
  },

  CONTACT: {
    CREATE: "/contact/create-new-contact",
  }
};

export default ENDPOINTS;