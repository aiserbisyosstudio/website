const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
  },

  USER: {
    REGISTER: "/user/register",
    UPDATE_LANGUAGE: "/user/update-language",
    UPDATE_PLAN: "/user/update-plan"
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