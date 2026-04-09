import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { Api } from './services/api';
import { RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App  implements OnInit{
  profile: any;
  projects: any[] = [];
  skills: any[] = [];

  constructor(private api: Api) {}

  ngOnInit(): void {
    this.api.getProfile().subscribe(res => this.profile = res);
    this.api.getProjects().subscribe((res: any) => this.projects = res);
    this.api.getSkills().subscribe((res: any) => this.skills = res);
  }
}
