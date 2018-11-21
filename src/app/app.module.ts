import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ServiceService} from './service.service';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {HttpModule} from '@angular/http';
import {MatCardModule} from '@angular/material/card';
@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        FormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        MatTabsModule,
        MatInputModule,
        MatCardModule,
        HttpModule,
        ReactiveFormsModule,
    ],
    providers: [ServiceService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
