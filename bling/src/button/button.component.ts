import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, Input, ElementRef, Renderer2 } from '@angular/core';

export type blType = 'default' | 'primary' | 'success' | 'danger';

export type blSize = 'default' | 'large' | 'small';

@Component({
  selector: '[bl-button]',
  templateUrl: './button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush // OnPush策略是只有输入属性改变的时候会触发变更检测，当输入属性没变的时候也想触发检测的话使用mark什么什么方法
})
export class ButtonComponent implements OnInit {

  _iconClass: string[];

  _classNames: string[] = [];

  private _nativeElement: any;

  private _blType: blType;

  private _blSize: blSize;

  private _blSquare: boolean = false;

  _blIcon: boolean = false;

  private _blEmpty: boolean = false;

  private _blDisabled: boolean = false;

  @Input()
  set blType(value: blType) {
    if (value) {
      this._blType = value;
      this._setClasses();
    }
  }

  @Input()
  set blSize(value: blSize) {
    if (value) {
      this._blSize = value;
      this._setClasses();
    }
  }

  @Input()
  set blSquare(value: boolean) {
    if (value) {
      this._blSquare = true;
    } else {
      this._blSquare = false;
    }
    this._setClasses();
  }

  @Input() blIcon(value: boolean) {
    if (value) {
      this._blIcon = value;
    } else {
      this._blIcon = false;
    }
    this._setClasses();
  }

  @Input()
  set blEmpty(value: boolean) {
    if (value) {
      this._blEmpty = value;
    } else {
      this._blEmpty = false;
    }
    this._setClasses();
  }

  @Input()
  set blDisabled(value: boolean) {
    if (value) {
      this._blDisabled = value;
      this.renderer.setProperty(this._nativeElement, 'disabled', true);
    } else {
      this._blDisabled = false;
      this.renderer.setProperty(this._nativeElement, 'disabled', false);
    }
    this._setClasses();
  }

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
  ) {
    this._nativeElement = this.elementRef.nativeElement;
  }

  ngOnInit() {
    this._setClasses();
  }

  // 设置class
  private _setClasses() {
    let classNames: string[] = ['btn'];
    if (this._blType) {
      classNames.push(`btn-type-${this._blType}`);
    }
    if (this._blSize) {
      classNames.push(`btn-size-${this._blSize}`);
    }
    if (this._blIcon) {
      classNames.push(`btn-icon`);
    }
    if (this._blEmpty) {
      classNames.push('btn-empty');
    }
    if (this._blDisabled) {
      classNames.push('btn-disabled');
    }
    if (this._blSquare && this._blSize) {
      classNames.push(`btn-square-${this._blSize}`);
    } else if (this._blSquare && !this._blSize) {
      classNames.push(`btn-square-default`);
    }
    this.updateClass(classNames);
  }

  private updateClass(classNames: string[]) {
    if (this._classNames) {
      this._classNames.forEach((className) => {
        if (classNames.indexOf(className) < 0) {
          this.removeClass(className);
        }
      });
    }
    const newClasses: string[] = [];
    classNames.forEach((className) => {
      if (className) {
        newClasses.push(className);
        if (this._classNames.indexOf(className) < 0) {
          this.addClass(className);
        }
      }
    });
    this._classNames = newClasses;
  }

  private addClass(className: string) {
    this.renderer.addClass(this._nativeElement, className);
  }

  private removeClass(className: string) {
    this.renderer.removeClass(this._nativeElement, className);
  }
}
