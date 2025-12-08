import { Injectable } from '@angular/core';
import { Observable, from, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NordvpnConnectionService {

  connect(country?: string): Observable<string> {
    return from(window.nordvpn.nordvpnConnect(country)).pipe(
      catchError(error => {
        console.error(`ERROR: Connection attempt to ${country || 'quick connect'} failed:`, error);
        return throwError(() => new Error(`Unable to connect.`));
      })
    );
  }

  disconnect(): Observable<string> {
    return from(window.nordvpn.nordvpnDisconnect()).pipe(
      catchError(error => {
        console.error('ERROR: Disconnection failed:', error);
        return throwError(() => new Error('Unable to connect.'));
      })
    );
  }
}