import { NgModule, ModuleWithProviders } from '@angular/core';
import { ButtonModule } from './button';
import { PageModule } from './page';
import { ThyDialogModule } from './dialog';
import { LoadingModule } from './loading';
import { TooltipModule } from './tooltip';
import { SwitchModule } from './switch';
import { NotificationModule } from './notification';


const IMPORT_EXPORT_MODULES = [
    ButtonModule,
    PageModule,
    ThyDialogModule,
    LoadingModule,
    TooltipModule,
    SwitchModule,
    NotificationModule
];

@NgModule({
    declarations: [],
    imports: [...IMPORT_EXPORT_MODULES],
    exports: IMPORT_EXPORT_MODULES,
    providers: []
})
export class BlingModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: BlingModule,
            providers: []
        };
    }
}
