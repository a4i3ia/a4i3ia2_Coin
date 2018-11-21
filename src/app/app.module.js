"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var platform_browser_1 = require('@angular/platform-browser');
var core_1 = require('@angular/core');
var service_service_1 = require('./service.service');
var app_component_1 = require('./app.component');
var animations_1 = require('@angular/platform-browser/animations');
var tabs_1 = require('@angular/material/tabs');
var forms_1 = require('@angular/forms');
var input_1 = require('@angular/material/input');
var http_1 = require('@angular/http');
var card_1 = require('@angular/material/card');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent
            ],
            imports: [
                forms_1.FormsModule,
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                tabs_1.MatTabsModule,
                input_1.MatInputModule,
                card_1.MatCardModule,
                http_1.HttpModule,
                forms_1.ReactiveFormsModule,
            ],
            providers: [service_service_1.ServiceService],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map