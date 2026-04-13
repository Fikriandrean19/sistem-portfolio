
import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App{

  // profile: any;
  // projects: any[] = [];
  // skills: any[] = [];

  // constructor(private api: Api) {}

  // ngOnInit(): void {
  //   this.api.getProfile().subscribe(res => this.profile = res);
  //   this.api.getProjects().subscribe((res: any) => this.projects = res);
  //   this.api.getSkills().subscribe((res: any) => this.skills = res);
  // }
}
