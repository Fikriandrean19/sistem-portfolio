import { Routes } from '@angular/router';
import { Profile } from './pages/profile/profile';
import { Project } from './pages/project/project';
import { Skill } from './pages/skill/skill';
import { Dashboard } from './pages/dashboard/dashboard';
import { Login } from './pages/login/login';

export const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: Login },

  {
    path: '',
    component: Dashboard,
    children: [
      { path: 'profile', component: Profile },
      { path: 'projects', component: Project },
      { path: 'skills', component: Skill },
    ]
  }
];