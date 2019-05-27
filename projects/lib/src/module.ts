import { NgModule, ModuleWithProviders } from '@angular/core';
import { ButtonModule } from './button';
import { PageModule } from './page';


const IMPORT_EXPORT_MODULES = [
    ButtonModule,
    PageModule
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