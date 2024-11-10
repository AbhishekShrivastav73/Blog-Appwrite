import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteURL)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // Await the login attempt and return the session if successful
        const session = await this.login({ email, password });
        return session;
      }
      return null; // Explicitly return null if userAccount creation fails
    } catch (error) {
      console.log("Appwrite Service :: createAccount :: error", error);
      throw error; // Throw error to be handled in SignUp component
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log("Appwrite Service :: login :: error", error);
      throw error; // Throw error to be handled in SignUp component
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite Service :: getCurrentUser :: error", error);
      throw error; // Throw error if fetching user fails
    }
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite Service :: logout :: error", error);
      throw error; // Throw error to be handled where logout is called
    }
  }
}

const authService = new AuthService();

export default authService;
