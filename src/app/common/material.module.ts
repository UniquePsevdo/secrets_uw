// angular
import { NgModule } from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatMenuModule, MatSelectModule, MatTabsModule,
    MatToolbarModule
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
export class MaterialModule {
}
