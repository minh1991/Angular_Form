import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthComponent } from "./../components/auth/auth.component";
import { TableComponent } from "./../components/table/table.component";
import { AddProfileComponent } from "./../components/add-profile/add-profile.component";
const routes: Routes = [
  {
    path: "",
    component: AuthComponent
  },
  { path: "all", component: TableComponent },
  { path: "add-profile", component: AddProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})
export class AuthRoutingModule {}
