import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { ProfileModel } from './../models/profile.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private data = new BehaviorSubject('');
  selectedProfile: ProfileModel;
  profileModel: ProfileModel[];

  constructor(private http: HttpClient) {}
  BASEURL = 'http://localhost:3000/api/profile';

  postProfile(profile: ProfileModel) {
    return this.http.post(this.BASEURL + '/', profile);
  }

  getProfilesList(): Observable<any> {
    return this.http.get<ProfileModel[]>(this.BASEURL + '/');
  }

  getProfileById(id: string) {
    return this.http.get<ProfileModel>(this.BASEURL + '/' + id);
  }

  updatePutProfile(profile: ProfileModel) {
    return this.http.put(this.BASEURL + `/update/${profile._id}`, profile);
  }

  // tslint:disable-next-line:variable-name
  deleteProfile(_id: string) {
    return this.http.delete(this.BASEURL + `/delete/${_id}`);
  }

  // Form Data
  getData(): Observable<any> {
    return this.data.asObservable();
  }
  pushData(dataValue) {
    this.data.next(dataValue);
  }
}
