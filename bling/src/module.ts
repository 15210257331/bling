import { NgModule, ModuleWithProviders } from '@angular/core';
import { ButtonModule } from './button';
import { PageModule } from './page';
import { ThyDialogModule } from './dialog';


const IMPORT_EXPORT_MODULES = [
    ButtonModule,
    PageModule,
    ThyDialogModule
]

@NgModule({
    declarations: [],
    imports: [...IMPORT_EXPORT_MODULES],
    exports: IMPORT_EXPORT_MODULES,
    providers: []
})
export class MushroomModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: MushroomModule,
            providers: []
        };
    }
}