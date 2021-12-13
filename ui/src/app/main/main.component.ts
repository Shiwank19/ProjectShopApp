import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  title = 'dpm-project';
  isAdminConsole: boolean;
  constructor(
    private primengConfig: PrimeNGConfig,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.activateRoute.snapshot.paramMap.get('id');
    if (id != 'user' && id != 'admin') {
      this.router.navigate(['/login']);
    } else if (id == 'user') {
      this.isAdminConsole = false;
    } else {
      this.isAdminConsole = true;
    }
  }
}
