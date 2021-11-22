import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  name: string;
  password: string;
  errorString: string;
  constructor(private r: Router) {}

  ngOnInit(): void {
    this.name = 'user';
  }

  submit() {
    this.errorString = '';
    if (this.name == 'user') {
      this.r.navigate(['/main', {id: 'user'}]);
    } else if (this.name == 'admin') {
      this.r.navigate(['/main', {id: 'admin'}]);
    } else {
      this.errorString = 'Please check the username and password';
    }
  }
}
