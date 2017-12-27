// angular
import { NgModule } from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatMenuModule, MatSelectModule,
    MatToolbarModule
} from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs'

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
