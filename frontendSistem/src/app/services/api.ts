import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post(`${this.baseUrl}/login`, data);
  }

  getProfile() {
    return this.http.get(`${this.baseUrl}/profile`);
  }

  getProjects() {
    return this.http.get(`${this.baseUrl}/project`);
  }

  getSkills() {
    return this.http.get(`${this.baseUrl}/skill`);
  }

  addSkill(data: FormData) {
    return this.http.post(`${this.baseUrl}/skill`, data);
  }

  addProject(data: FormData) {
    return this.http.post(`${this.baseUrl}/project`, data);
  }

  deleteSkill(id: number) {
    return this.http.delete(`${this.baseUrl}/skill/${id}`);
  }

  deleteProject(id: number) {
    return this.http.delete(`${this.baseUrl}/project/${id}`);
  }

  updateSkill(id: number, data: any) {
    return this.http.post(`${this.baseUrl}/skill/${id}`, data);
  }

  updateProfile(id: number, data: any) {
    return this.http.post(`${this.baseUrl}/profile/${id}`, data);
  }

  updateProject(id: number, data: any) {
    return this.http.post(`${this.baseUrl}/project/${id}`, data);
  }

}
