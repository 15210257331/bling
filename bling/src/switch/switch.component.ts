import {
    Component, OnInit, ViewChild, ElementRef,
    ChangeDetectionStrategy, ChangeDetectorRef, HostListener, Input, forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'bl-switch',
    templateUrl: './switch.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SwitchComponent),
            multi: true
        }
    ],
})
export class SwitchComponent implements OnInit, ControlValueAccessor {

    checked = false;

    classNameMap: any;

    @Input() nzDisabled = false;

    @Input() nzLoading = false;

    @Input() nzControl = false;

    @ViewChild('switchElement') private switchElement: ElementRef;

    onChange: (value: boolean) => void = () => null;

    onTouched: () => void = () => null;

    constructor(private cdr: ChangeDetectorRef) { }

    @HostListener('click', ['$event'])
    onClick(e: MouseEvent): void {
        e.preventDefault();
        if ((!this.nzDisabled) && (!this.nzLoading) && (!this.nzControl)) {
            this._updateValue(!this.checked);
        }
    }

    private _updateValue(value: boolean): void {
        if (this.checked !== value) {
            this.checked = value;
            this.setClassNameMap();
            this.cdr.markForCheck();
            this.onChange(this.checked);
        }
    }

    writeValue(value: boolean): void {
        this.checked = value;
        this.cdr.markForCheck();
    }

    registerOnChange(fn: (_: boolean) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    ngOnInit() {
        this.setClassNameMap();
    }

    setClassNameMap() {
        this.classNameMap = {
            'switch-check': this.checked,
            'switch-disabled': this.nzDisabled
        };
    }
}
