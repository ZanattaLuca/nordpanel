import { Component, signal } from '@angular/core';
import { NordvpnService } from '../nordvpn.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly title = signal('ui');

  countries = '';
  account = '';

  constructor(private nordvpn: NordvpnService) {}

  showCountries() {
    this.countries = 'Running "nordvpn countries"...';

    this.nordvpn.getCountries().subscribe({
      next: (result) => {
        this.countries = result;
        console.log('Countries:', result);
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
      },
      error: (err) => {
        this.account = 'Error: ' + err;
        console.error(err);
      },
    });
  }
}
