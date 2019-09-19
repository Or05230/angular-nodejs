import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { JsonComponent } from './posts/json/json.component';
// const routing: Routes (Failed)
const routes: Routes = [
  // empty path => get domain.com/
  { path: '', component: PostListComponent },
  // { path: '/create', component: PostCreateComponent }
  { path: 'create', component: PostCreateComponent },
  { path: 'edit/:postId', component: PostCreateComponent },
  { path: 'data', component: JsonComponent }
];

// imporf ng module about the routes
@NgModule({
  // calls the method to be aware on the routes
  imports: [RouterModule.forRoot(routes)],
  // be able to export as RouterModule
  exports: [RouterModule]

})
export class AppRoutingModule {}
