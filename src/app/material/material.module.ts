import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatStepperModule, MatInputModule, MatFormFieldModule, 
         MatAutocompleteModule, MatCardModule, MatDatepickerModule, MatNativeDateModule,
         MatExpansionModule, MatToolbarModule, MatSnackBarModule  } from '@angular/material';

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
    MatToolbarModule,
    MatSnackBarModule
]

@NgModule({
    imports: [...modules],
    exports: [...modules],
})

export class MaterialModule { }