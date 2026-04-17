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
  selectedImage: File | null = null;
  previewUrl: string | null = null;


  constructor(private api: Api, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
      this.api.getProfile().subscribe((res: any) => {
       console.log('GET PROFILE RESPONSE:', res);
      this.profile = res;
      this.cdr.detectChanges();
    });
  }

  openModal() {
    this.editProfile = { ...this.profile };
    console.log('OPEN MODAL editProfile:', this.editProfile);
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      this.previewUrl = URL.createObjectURL(file);
    }
  }

save() {
  const formData = new FormData();

  formData.append('_method', 'PUT');

  formData.append('name', this.editProfile?.name ?? '');
  formData.append('email', this.editProfile?.email ?? '');
  formData.append('bio', this.editProfile?.bio ?? '');
  formData.append('github', this.editProfile?.github ?? '');
  formData.append('linkedin', this.editProfile?.linkedin ?? '');

  if (this.selectedImage) {
    formData.append('image', this.selectedImage);
  }

  this.api.updateProfile(this.profile.id, formData).subscribe({
    next: (res) => {
      this.profile = res;
      this.showModal = false;
    },
    error: (err) => {
      console.error(err);
    }
  });
}
}
