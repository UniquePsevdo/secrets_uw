// angular
import { NgModule } from '@angular/core';
import {
    MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatMenuModule, MatSelectModule,
    MatToolbarModule, MatAutocompleteModule, MatTabsModule, MAT_RIPPLE_GLOBAL_OPTIONS, MAT_LABEL_GLOBAL_OPTIONS,
    RippleGlobalOptions, MAT_OPTION_PARENT_COMPONENT
} from '@angular/material';
import { COMPOSITION_BUFFER_MODE, NgForm } from '@angular/forms';

const globalRippleConfig: RippleGlobalOptions = {
    disabled: true,
    baseSpeedFactor: 1.5 // Ripples will animate 50% faster than before.
}

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
    /*providers: [
        { provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: globalRippleConfig },
        { provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: {float: 'always'}},
        { provide: COMPOSITION_BUFFER_MODE, useValue: false },
        { provide: MAT_OPTION_PARENT_COMPONENT },
        NgForm
    ]*/
})
export class MaterialModuleAdmin {
}
