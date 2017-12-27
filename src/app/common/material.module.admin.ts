// angular
import { NgModule } from '@angular/core';
import {
    MatButtonModule, MatInputModule, MatSelectModule, MatAutocompleteModule, MatTabsModule, MatIconModule
} from '@angular/material';

@NgModule({
    exports: [
        MatButtonModule,
        MatInputModule,
        MatSelectModule,
        MatTabsModule,
        MatIconModule,
        MatAutocompleteModule
    ]
})
export class MaterialModuleAdmin {
}

