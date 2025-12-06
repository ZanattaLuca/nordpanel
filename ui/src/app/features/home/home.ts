import { ChangeDetectorRef, Component } from '@angular/core';
import { NordvpnService } from '../../services/nordvpn.service';
import { NordvpnStatusService } from '../../services/nordvpn.status.service';
import { Observable } from 'rxjs';
import { Status } from '../../models/status.interface';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [AsyncPipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

  status$!: Observable<Status>;
  
  countries = '';
  account = '';
  user = 'Mario Rossi';
  status = 'Connected';

  constructor(private nordvpn: NordvpnService, private nordvpnStatusService: NordvpnStatusService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.status$ = this.nordvpnStatusService.status$;
  }

  showCountries() {
    this.countries = 'Running "nordvpn countries"...';

    this.nordvpn.getCountries().subscribe({
      next: (result) => {
        this.countries = result;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.countries = 'Error: ' + err;
        console.error(err);
      },
    });
  }

  showAccount() {
    this.account = 'Running "nordvpn account"...';

    this.nordvpn.getAccount().subscribe({
      next: (result) => {
        this.account = result;
        console.log('Account:', result);
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.account = 'Error: ' + err;
        console.error(err);
      },
    });
  }

  nordVpnStatus(): any {
    this.account = 'Running "nordvpn account"...';

    this.nordvpnStatusService.refreshStatus()
  }
}
