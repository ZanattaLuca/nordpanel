import { ChangeDetectorRef, Component } from '@angular/core';
import { NordvpnService } from '../../services/nordvpn.service';
import { NordvpnStatusService } from '../../services/nordvpn.status.service';
import { Observable } from 'rxjs';
import { Status } from '../../models/status.interface';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NordvpnConnectionService } from '../../services/nordvpn.connection.service';

@Component({
  selector: 'app-home',
  imports: [AsyncPipe,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

  status$!: Observable<Status>;
  
  countries = '';
  account = '';
  user = 'Mario Rossi';

  constructor(private nordvpn: NordvpnService, 
    private nordvpnStatusService: NordvpnStatusService, 
    private cdr: ChangeDetectorRef,
    private nordvpnConnectionService: NordvpnConnectionService) {
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

  }

  disconnect(){
    this.nordvpnConnectionService.disconnect()
  }

  quickConnectItaly(){
    this.nordvpnConnectionService.connect('italy')
  }
}
