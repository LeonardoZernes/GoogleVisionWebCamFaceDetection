import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { GoogleTestComponent } from "./google-test/google-test.component";

const routes: Routes = [
  { path: "", redirectTo: "test", pathMatch: "full" },
  { path: "test", component: GoogleTestComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
