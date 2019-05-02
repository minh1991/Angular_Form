import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthComponent } from "./../components/auth/auth.component";
import { TableComponent } from "./../components/table/table.component";
import { AddProfileComponent } from "./../components/add-profile/add-profile.component";
import { ConfirmProfileComponent } from "./../components/confirm-profile/confirm-profile.component";
const routes: Routes = [
  {
    path: "",
    component: AuthComponent
  },
  { path: "all", component: TableComponent },
  { path: "add-profile", component: AddProfileComponent },
  { path: "confirm-profile", component: ConfirmProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})
export class AuthRoutingModule {}
