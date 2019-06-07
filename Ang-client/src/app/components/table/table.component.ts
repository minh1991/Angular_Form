import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from './../../services/profile.service';
import { ProfileModel } from './../../models/profile.model';
import { ProfileModule } from './../../modules/profile.module';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  public profiles: ProfileModel[];

  constructor(private profileService: ProfileService, private router: Router) {}

  ngOnInit() {
    this.getAllProfile();
  }
  getAllProfile(): void {
    this.profileService.getProfilesList().subscribe(data => {
      this.profiles = data;
    });
  }

  addProfile(): void {
    this.router.navigate(['add-profile']);
  }
  updateProfile(profile: ProfileModel) {
    this.profileService.selectedProfile = profile;
    this.router.navigate(['edit-profile']);
  }

  // tslint:disable-next-line:variable-name
  deleteProfile(_id: string, form: NgForm) {
    if (confirm('bạn muốn xóa ? ') === true) {
      this.profileService.deleteProfile(_id).subscribe(data => {
        this.getAllProfile();
      });
    }
  }
}
