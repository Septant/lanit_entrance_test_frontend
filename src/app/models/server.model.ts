import {User} from "./app.model";


export enum ServerAction {
  user = 'user',
  users = 'users',
}

export enum ServerStatus {
  success = 'success',
  error = 'error'
}

export type ServerResponse =
  ServerResponseUserTable;

export interface BaseServerResponse {
  status: ServerStatus,
  message?: string
}

export interface ServerResponseUserTable extends BaseServerResponse {
  data?: User[]
}

