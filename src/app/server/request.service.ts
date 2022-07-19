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

  public getUserList(): void {
    this.responseService.serverResponse(this.serverService.getServer(ServerAction.users, ''), ServerAction.users);
  }

  public updateUser(user: User): void {
    this.responseService.serverResponse(this.serverService.serverPut(ServerAction.user, user.id.toString(), {user}),
      ServerAction.user);
  }

  public deleteUser(id: number): void {
    this.responseService.serverResponse(this.serverService.serverDelete(ServerAction.user, id.toString()),
      ServerAction.user);
  }

  public createUser(user: User): void {
    this.responseService.serverResponse(this.serverService.postServer(ServerAction.user, {user}),
      ServerAction.user);
  }
}
