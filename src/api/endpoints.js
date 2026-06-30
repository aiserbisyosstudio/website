const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    UPDATE_PASSWORD: "/auth/update-password",
    SEND_EMAIL_OTP: "/auth/send-email-otp"
  },

  USER: {
    REGISTER: "/user/register",
    UPDATE_LANGUAGE: "/user/update-language",
    UPDATE_PLAN: "/user/update-plan",
    GET_PROFILE: "/user/get-profile",
    UPDATE_PHOTO: "/user/upload-photo",
    REMOVE_PHOTO: "/user/remove-photo"
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