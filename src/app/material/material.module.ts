import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatStepperModule, MatInputModule, MatFormFieldModule, 
         MatAutocompleteModule, MatCardModule, MatDatepickerModule, MatNativeDateModule,
         MatExpansionModule, MatToolbarModule  } from '@angular/material';

const modules = [
    MatButtonModule,
    MatStepperModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatToolbarModule
]

@NgModule({
    imports: [...modules],
    exports: [...modules],
})

export class MaterialModule { }