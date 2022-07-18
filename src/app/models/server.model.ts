import {User} from "./app.model";

export interface TitledText {
  title: string;
  text: string;
}

export enum ServerAction {
  userTable = 'user-table',
  updateUsersTable = 'update-table'
}

export enum ServerStatus {
  success = 'success',
  error = 'error'
}

export enum ServerAnswer {
  Done = 'done'
}

export type ServerResponse =
  ServerResponseUserTable ;

export interface BaseServerResponse {
  status: ServerStatus,
  message?: string
}

export interface ServerResponseUserTable extends BaseServerResponse{
 data?: User[]
}

export interface ServerResponseAnswer extends BaseServerResponse {
  data: ServerAnswer
}
