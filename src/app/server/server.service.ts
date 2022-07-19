import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ServerAction, ServerResponse} from "../models/server.model";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private httpClient: HttpClient) { }

  private static getPath(action: ServerAction, data = '') {
    return (data)
      ? environment.api + action + '?' + data
      : environment.api + action;
  }

  public getServer(action: ServerAction, data = ''): Observable<ServerResponse> {
    return this.httpClient.get<ServerResponse>(ServerService.getPath(action, data));
  }

  public serverPut(action: ServerAction, path: string, data: any): Observable<ServerResponse> {
    return this.httpClient.put<ServerResponse>(ServerService.getPath(action, ''), data);
  }
}
