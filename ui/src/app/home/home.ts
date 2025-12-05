import { ChangeDetectorRef, Component } from '@angular/core';
import { NordvpnService } from '../nordvpn.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

  countries = '';
  account = '';
  user = 'Mario Rossi';
  status = 'Connected';


  constructor(private nordvpn: NordvpnService, private cdr: ChangeDetectorRef) {}

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
}
