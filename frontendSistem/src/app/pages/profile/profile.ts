import { Component, OnInit } from '@angular/core';
import { Api } from '../../services/api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile  implements OnInit {

  profile: any;
  editProfile: any;
  showModal = false;

  constructor(private api: Api, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
       this.api.getProfile().subscribe((res: any) => {
      this.profile = res;
      this.cdr.detectChanges();
    });
  }

  openModal() {
    this.editProfile = { ...this.profile };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

save() {
  this.api.updateProfile(this.profile.id, this.editProfile).subscribe({
    next: (res) => {

      this.profile = res; 
      this.showModal = false;
    },
    error: (err) => {
      console.error('ERROR:', err);
      alert('Gagal update!');
    }
  });
}
}
