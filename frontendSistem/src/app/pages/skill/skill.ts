import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Api } from '../../services/api';
import { FormsModule } from '@angular/forms';
import { NgZone } from '@angular/core';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-skill',
  imports: [CommonModule, FormsModule],
  templateUrl: './skill.html',
  styleUrl: './skill.css',
})
export class Skill implements OnInit {

  skills: any[] = [];
  newSkill: any;
  showModal= false;
  selectedFile: File | null = null;
  previewUrl: any;
  isLoading = false;
  isEdit = false;
  editId: number | null = null;

  constructor(private api: Api, private cdr: ChangeDetectorRef, private ngZone: NgZone) {}

  ngOnInit() {
    this.loadData();
   }

  loadData() {
    this.api.getSkills().subscribe((res: any) => {
      this.skills = res.map((skill: any) => ({
        ...skill,
        image: skill.image ? 'http://127.0.0.1:8000/storage/' + skill.image : null,
      }));
      this.cdr.detectChanges();
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

        this.ngZone.run(() => {
          this.previewUrl = URL.createObjectURL(file);
          this.cdr.detectChanges();
        });
    }
  }

  openModal() {
      this.newSkill = {};
    this.showModal = true;
    this.isEdit = false;
    this.editId = null;
    this.selectedFile = null;
    this.previewUrl = null;
  }

  closeModal() {
    this.showModal = false;
    this.selectedFile = null;
    this.previewUrl = null;
    this.isLoading = false;
  }

save() {
  if (this.isLoading) return;
  this.isLoading = true;

  const formData = new FormData();
  formData.append('name', this.newSkill.name);
  formData.append('level', this.newSkill.level);

  if (this.selectedFile) {
    formData.append('image', this.selectedFile);
  }

  if (this.isEdit) {
    formData.append('_method', 'PUT'); 

    this.api.updateSkill(this.editId!, formData).subscribe({
      next: () => {
        this.loadData();
        this.closeModal();
        Swal.fire('Berhasil!', 'Data berhasil diupdate', 'success');
      },
      error: () => {
        this.isLoading = false;
        Swal.fire('Error!', 'Gagal update data', 'error');
      }
    });
  } else {
    this.api.addSkill(formData).subscribe({
      next: () => {
        this.loadData();
        this.closeModal();
        Swal.fire('Berhasil!', 'Data berhasil ditambahkan', 'success');
      }
    });
  }
}

  edit(skill:any) {
    this.isEdit =true;
    this.editId = skill.id;

    this.newSkill = {
      name: skill.name,
      level: skill.level,
    };

    this.previewUrl = skill.image;
    this.showModal = true;
  }

delete(skill: any) {
  Swal.fire({
    title: 'Yakin?',
    text: 'Data tidak bisa dikembalikan!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ya, hapus!',
    cancelButtonText: 'Batal'
  }).then((result) => {
    if (result.isConfirmed) {
      this.api.deleteSkill(skill.id).subscribe({
        next: () => {
          this.skills = this.skills.filter(s => s.id !== skill.id);

          Swal.fire('Berhasil!', 'Data berhasil dihapus.', 'success');
        },
        error: () => {
          Swal.fire('Error!', 'Gagal menghapus data.', 'error');
        }
      });
    }
  });
}
}