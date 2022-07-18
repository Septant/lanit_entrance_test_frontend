import {Injectable} from '@angular/core';
import {ServerService} from "./server.service";
import {ResponseService} from "./response.service";
import {ServerAction} from "../models/server.model";
import {User} from "../models/app.model";

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private serverService: ServerService,
              private responseService: ResponseService) {
  }

  public getFriendList(): void {
    this.responseService.serverResponse(this.serverService.getServer(ServerAction.userTable,), ServerAction.userTable);
  }

  public postUpdateUser(id: number, name: string, surname: string, date_of_birth: string): void {
    this.responseService.serverResponse(this.serverService.postServer
    (ServerAction.updateUsersTable, {id, name, surname, date_of_birth}),
      ServerAction.updateUsersTable);
  }
}
