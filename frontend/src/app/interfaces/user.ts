export interface User {
    userId: string;
    userName: string;
    userEmail: string;
    userPhone: string;
    password: string;
    profilePic: string;
    role: string;
}


  export interface LoginResponse {
    user: User | undefined;
    // userID(userID: any): unknown;
    token: string;
    userId:string
    // Add other properties if needed
  }

  export interface userLogin {
    email: string,
    password : string
}


export interface UserDetails {
  userId: string;
  userPhone: string;
  userName: string;
  userEmail: string;
  profilePic: string;
}

export interface updatedUserData {
  userId:string,
  userName: string,
  userEmail: string,
  userPhone: string;
  profilePic: string;
  role: string;
};



export interface Person extends User{
  age: number;
}

export interface Guy extends Person{
  profession:string;
  color:string;
}