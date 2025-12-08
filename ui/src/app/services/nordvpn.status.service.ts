import { Injectable } from '@angular/core';
import { Status } from '../models/status.interface'
import { Observable, Subject, from, map, shareReplay, startWith, switchMap, timer } from 'rxjs';


const INITIAL_STATE: Status = {
  status: 'Checking...',
  server: '',
  country: '',
  city: '',
  isLoaded: false
};

@Injectable({
  providedIn: 'root'
})
export class NordvpnStatusService {

    status$: Observable<Status> = timer(0, 5000).pipe(

        switchMap(() => from(window.nordvpn.nordVpnStatus())),
        map(raw => this.parseStatus(raw)),
        startWith(INITIAL_STATE),

        shareReplay(1) 
    );

    private parseStatus(raw: any): Status {
    const result: Status = {
        status: '',
        server: '',
        country: '',
        city: '',
        isLoaded: true
    };

    if (typeof raw !== 'string') {
        return result;
    }

    const lines = raw.split(/\r?\n/);

    for (const line of lines) {
        const [keyPart, ...rest] = line.split(':');
        if (!rest.length) continue;

        const key = keyPart.trim();
        const value = rest.join(':').trim();

        switch (key) {
        case 'Status':
            result.status = value;
            break;
        case 'Server':
            result.server = value;
            break;
        case 'Country':
            result.country = value;
            break;
        case 'City':
            result.city = value;
            break;
        }
    }

    return result;
    }


}
