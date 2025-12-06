// ui/src/app/nordvpn.service.ts
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NordvpnService {

  getCountries(): Observable<string> {
    return from(window.nordvpn.getCountries());
  }

getAccount(): Observable<string> {
  const account = from(window.nordvpn.account());
  console.log(account);
  return account;
}
}
