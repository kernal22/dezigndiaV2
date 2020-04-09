import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', loadChildren: './site/site.module#SiteModule'},
  {path: 'auth', loadChildren: './auth/auth.module#AuthModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
