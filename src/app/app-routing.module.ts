import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactListComponent } from './contact-list/contact-list.component';
import { AddContactComponent } from './add-contact/add-contact.component';

const routes: Routes = [
{ path: '', redirectTo: 'view-contact', pathMatch: 'full' },
{ path: 'view-contact', component: ContactListComponent },
{ path: 'add-contact', component: AddContactComponent },
];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule {}
