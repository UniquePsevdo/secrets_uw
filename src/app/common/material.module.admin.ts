// angular
import { NgModule } from '@angular/core';
import {
    MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatMenuModule, MatSelectModule,
    MatToolbarModule, MatAutocompleteModule, MatTabsModule, MAT_RIPPLE_GLOBAL_OPTIONS
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
    ],
    providers: [
        {provide: MAT_RIPPLE_GLOBAL_OPTIONS}
    ]
})
export class MaterialModuleAdmin {
}
