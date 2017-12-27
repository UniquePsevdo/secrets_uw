// angular
import { NgModule } from '@angular/core';
import {
    MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatMenuModule, MatSelectModule,
    MatToolbarModule, MatAutocompleteModule, MatTabsModule, RippleGlobalOptions
} from '@angular/material';

@NgModule({
    exports: [
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatToolbarModule,
        MatSelectModule,
        MatTabsModule,
        MatAutocompleteModule
    ]
})
export class MaterialModuleAdmin {
}

