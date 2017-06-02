import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'mtg-welcome',
	templateUrl: './welcome.component.html',
	styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

	public user: boolean;

	constructor (private authService: AuthService) { }

	ngOnInit () {
		this.authService.user.subscribe(value => {
			this.user = value ? true : false;
		});
	}

	public login (): void {
		this.authService.loginGoogle();
	}

	public logout (): void {
		this.authService.logout();
	}


}
