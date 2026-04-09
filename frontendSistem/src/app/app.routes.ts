import { Routes } from '@angular/router';
import { Profile } from './pages/profile/profile';
import { Project } from './pages/project/project';
import { Skill } from './pages/skill/skill';


export const routes: Routes = [
    { path: '', component: Profile },
    { path: 'profile', component: Profile },
    { path: 'projects', component: Project },
    { path: 'skills', component: Skill }
];
