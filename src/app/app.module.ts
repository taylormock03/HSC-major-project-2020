import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';

import {
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
} from '@angular/material';
import {RouterModule, Routes} from '@angular/router';



// COMPONENTS
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import { AdminComponent } from './Administration/admin-list/admin.component';
import { AdminLoginComponent } from './Administration/admin-login/admin-login.component';
import { AdminEditComponent } from './Administration/admin-edit/admin-edit.component';
import { RegisterComponent } from './Users/register/register.component';
import { RosterComponent } from './Users/roster/roster.component';
import { UserEditComponent } from './Users/user-edit/user-edit.component';
import { UserAvailabilitiesComponent } from './Users/user-availabilities/user-availabilities.component';
import { ServiceService } from './service.service';
import { DeleteDialogueComponent } from './delete-dialogue/delete-dialogue.component';
import { AdminHomeComponent } from './Administration/admin-home/admin-home.component';
import { AdminRosterComponent } from './Administration/admin-roster/admin-roster.component';




// ROUTING LINKS
const appRoutes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'aList', component: AdminComponent},
    {path: 'aLogin', component: AdminLoginComponent},
    {path: 'aEdit', component: AdminEditComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'roster', component: RosterComponent},
    {path: 'uEdit/:id', component: UserEditComponent},
    {path: 'availability', component: UserAvailabilitiesComponent},
    {path: 'aHome', component: AdminHomeComponent},
    {path: 'aRoster', component: AdminRosterComponent},
    {path: '**', component: HomeComponent}
];





// MODULES
@NgModule({
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        MatAutocompleteModule,
        MatBadgeModule,
        MatBottomSheetModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatStepperModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        // ROUTING
        RouterModule.forRoot(
            appRoutes,
            //  { enableTracing: true } // <-- debugging purposes only
        )
    ],  // end imports
    declarations: [AppComponent, HomeComponent, AdminComponent, AdminLoginComponent,AdminEditComponent, RegisterComponent,RosterComponent,UserEditComponent,UserAvailabilitiesComponent, DeleteDialogueComponent, AdminHomeComponent, AdminRosterComponent],
    bootstrap: [AppComponent],
    providers: [ServiceService],
    entryComponents: [DeleteDialogueComponent]
})
export class AppModule {
  MatPaginatorModule
}


