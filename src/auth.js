import api from "./api";
import Device from "./device";

import appInfo from "./app-info";

export default {
  _user: null,
  _person: null,
  _avatarURL: null,

  loggedIn() {
    return !!this._user;
  },

  getToken()
  {
    var token = window.sessionStorage.getItem("token");
    if(token === null || token == undefined)
    {
      token = window.localStorage.getItem("token");
      if(token !== null && token !== undefined)
        window.sessionStorage.setItem("token", token);
    }

    return token;
  },

  async logIn(email, password, bRememberMe = true) {
    try {

      const login = { USERNAME: email, PASSWORD: password, CAN_EXPIRE: !bRememberMe, EXPIRES: new Date(Date.now() + 24 * 1 * 60 * 60) };
      const response = await api.post('User/Login', login);

      if(response.data === null || response.data === undefined)
      {
        return {
          isOk: false,
          message: "Authentication failed"
        };
      }

      if(bRememberMe)
        window.localStorage.setItem("token", response.data.TOKEN);

      window.sessionStorage.setItem("token", response.data.TOKEN);
      const result = await this.getUser();

      return {
        isOk: true,
        data: result
      };
    }
    catch(error) {
      return {
        isOk: false,
        message: error.response.data || "Authentication failed"
      };
    }
  },

  async logOut() {

    this._user = null;
    this._person = null;
    this._avatarURL = null;

    window.localStorage.removeItem("token");
    window.sessionStorage.removeItem("token");

    // TODO: Send logout request
  },

  async getUser() {
    try {

      if(!this.loggedIn())      
      {
        this._user = (await api.get('User')).data;
        this._person = (await api.get('Person/Me')).data;

        // Build avatar URL
        const d = Device.getDevice();
        this._avatarURL = appInfo.apiURL + "Person/Image/Anonym?PersonId=" + this._person.ID + "&IMToken=" + this.getToken() + "&name=" + d.name + "&os=" + d.os + "&app=" + d.app;
      }

      return {
        isOk: true,
        data: { USER: this._user, PERSON: this._person, AVATAR_URL: this._avatarURL }
      };
    }
    catch(error) {
      return {
        isOk: false
      };
    }
  },

  async resetPassword(email) {
    try {
      // Send request
      console.log(email);

      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to reset password"
      };
    }
  },

  async changePassword(email, recoveryCode) {
    try {
      // Send request
      console.log(email, recoveryCode);

      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to change password"
      }
    }
  },

  async createAccount(email, password) {
    try {
      // Send request
      console.log(email, password);

      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to create account"
      };
    }
  }
};
