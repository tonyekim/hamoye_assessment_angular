import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-master',
  templateUrl: './user-master.component.html',
  styleUrls: ['./user-master.component.css'],
})
export class UserMasterComponent {

  airPortDetails: any;
  aircraftDetails: any[] = [];

  constructor(private httpClient: HttpClient) {
    this.airPortDetails = [];
  }

  ngOnInit(): void {
    this.getAirPortDetails();
  }

  getAirPortDetails () {
    this.httpClient.get('https://opensky-network.org/api/states/all?lamin=46.5&lamax=49.9&lomin=-1.4&lomax=6.8').subscribe((result: any) => {
      this.airPortDetails = result.states;

      this.aircraftDetails = this.airPortDetails.map((state: any) => {
        return {
          airport: state[2],
          time: new Date(state[4] * 1000).toLocaleTimeString(),
          arriving: state[9] > 0 ? state[1] : '',
          departing: state[9] <= 0 ? state[1] : ''
        };
      });
    });
  }
}

