import { Component, OnInit, Input, ElementRef, Renderer2, ChangeDetectionStrategy } from '@angular/core';

export type blType = 'default' | 'warning' | 'danger' | 'link' | 'empty';

export type blSize = 'md' | 'lg' | 'sm';

const blTypeClassesMap: any = {
  'default': ['btn', 'btn-default'],
  'warning': ['btn', 'btn-warning'],
  'danger': ['btn', 'btn-danger'],
  'link': ['btn', 'btn-link'], // 只有文本 没有按钮形状
  'empty': ['btn', 'btn-empty'], // 空心按钮
};

@Component({
  selector: '[bl-button]',
  templateUrl: './button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent implements OnInit {

  private _classNames: string[] = [];

  private _nativeElement: any;

  private _blType: blType;

  private _blSize: blSize;

  // 是否显示圆角默认非圆角
  private _blSquare: boolean = false;

  public _blIcon: boolean = false;

  public _iconClass: string[];

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

  @Input() 
  set blIcon(value: boolean) {
    if (value) {
      this._blIcon = value;
    } else {
      this._blIcon = false;
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

  // 设置class数组
  private _setClasses() {
    let classNames: string[] = null;
    if (blTypeClassesMap[this._blType]) {
      classNames = [...blTypeClassesMap[this._blType]];
    } else {
      classNames = ['btn'];
      if (this._blType) {
        classNames.push(`btn-${this._blType}`);
      }
    }
    if (this._blSize) {
      classNames.push(`btn-${this._blSize}`);
    }
    if (this._blIcon) {
      classNames.push(`btn-icon`);
    }
    if (this._blDisabled) {
      if(this._blType === 'link') {
        classNames.push('btn-link-disabled');
      } else {
        classNames.push('btn-disabled');
      }
    }
    if (this._blSquare && this._blSize) {
      classNames.push(`btn-square-${this._blSize}`);
    } else if (this._blSquare && !this._blSize) {
      classNames.push(`btn-square-md`);
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
