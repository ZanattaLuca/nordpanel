import { Injectable } from '@angular/core';
import { Status } from '../models/status.interface'
import { Subject, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NordvpnStatusService {
    status$ = new Subject<Status>();

    private parseStatus(raw: any): Status {
    const result: Status = {
        status: 'Disconnected',
        server: '',
        country: '',
        city: '',
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


    refreshStatus(): any {
        from(window.nordvpn.nordVpnStatus())
        .pipe(map(raw => this.parseStatus(raw)))
        .subscribe((status) => {this.status$.next(status)
            console.log(status)
        });
    }
}
