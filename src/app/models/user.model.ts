import { Transfer } from "./transfer.model";

export interface User {

     _id?: string,
     username: string,
     password: string,
     coins: string,
     moves: Transfer[]
}


