import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Api } from '../../services/api';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import  { HostListener } from '@angular/core';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './project.html',
  styleUrl: './project.css',
})
export class Project implements OnInit{
  projects: any[] = [];
  newProject: any = {};
  showModal = false;
  isEdit = false;
  editId: number | null = null;
  selectedFile: File | null = null;
  previewUrl: any;
  activeMenu: number | null = null;
  isLoading = false;

  constructor(private api: Api, private cdr: ChangeDetectorRef, private ngZone: NgZone) {}

  @HostListener('document:click')
  closeMenuOutside() {
    this.activeMenu = null;
  }

  toggleMenu(index: number, event: MouseEvent) {
    event.stopPropagation();
  this.activeMenu = this.activeMenu === index ? null : index;
  } 

  ngOnInit() {
    this.loadData();
  }
  
  openModal() {
    this.newProject = {};
    this.showModal = true;
    this.isEdit = false;
    this.editId = null;
    this.selectedFile = null;
    this.previewUrl = null;
  }

  closeModal() {
    this.showModal = false;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.previewUrl = URL.createObjectURL(file);
      this.cdr.detectChanges();
    }
  }

  formatLink(url: string): string {
  if (!url) return '#';

  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return 'https://' + url;
  }

  return url;
}

  save() {
    if (this.isLoading) return;
  this.isLoading = true;
  const formData = new FormData();
  formData.append('title', this.newProject.title || '');
  formData.append('description', this.newProject.description || '');
  formData.append('technologies', this.newProject.technologies || '');
  formData.append('live_link', this.newProject.live_link || '');

  if (this.selectedFile) {
    formData.append('image', this.selectedFile);
  }

  if (this.isEdit) {
    formData.append('_method', 'PUT');

    this.api.updateProject(this.editId!, formData).subscribe(() => {
      this.loadData();
      this.showModal = false;
    });
  } else {
    this.api.addProject(formData).subscribe(() => {
      this.loadData();
      this.showModal = false;
    });
  }
}

  loadData() {
    this.api.getProjects().subscribe((res: any) => {
      this.projects = res;
      this.cdr.detectChanges();
    });
  }

  edit(project: any) {
  this.isEdit = true;
  this.editId = project.id;

  this.newProject = {
    title: project.title,
    description: project.description,
    live_link: project.live_link,
    technologies: project.technologies
  };

  this.previewUrl = project.image
    ? 'http://127.0.0.1:8000/storage/' + project.image
    : null;

  this.showModal = true;
}

  delete(project: any) {
    Swal.fire({
    title: 'Yakin?',
    text: 'Data tidak bisa dikembalikan!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ya, hapus!',
    cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.deleteProject(project.id).subscribe({
                next: () => {
                  this.projects = this.projects.filter(p => p.id !== project.id);
        
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
