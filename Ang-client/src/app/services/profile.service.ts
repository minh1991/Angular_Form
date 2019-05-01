import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { profileModel } from "./../models/profile.model";
// import "rxjs/add/operator/map";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class ProfileService {
  selectedProfile: profileModel;
  profilemodel: profileModel[];

  constructor(private http: HttpClient) {}
  BASEURL = "http://localhost:3000/api/profile";

  postProfile(profile: profileModel) {
    return this.http.post(this.BASEURL + "/", profile);
  }

  getProfilesList(): Observable<any> {
    return this.http.get<profileModel[]>(this.BASEURL + "/");
  }

  getProfileById(id: string) {
    return this.http.get<profileModel>(this.BASEURL + "/" + id);
  }

  updatePutProfile(profile: profileModel) {
    return this.http.put(this.BASEURL + `/update/${profile._id}`, profile);
  }
  deleteProfile(_id: String) {
    return this.http.delete(this.BASEURL + `/delete/${_id}`);
  }
}
