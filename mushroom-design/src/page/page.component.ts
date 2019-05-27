import { Component, OnInit, Input, forwardRef, EventEmitter, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PageComponent),
      multi: true
    }
  ]
})
export class PageComponent implements OnInit, ControlValueAccessor {

  _totalNumber: number;

  _curPage: number;

  _pageSize = 10;

  totalPage: number;

  pageList: Array<number> = [];

  @Output() pageChange: EventEmitter<Number> = new EventEmitter<number>();

  onChange: (value: number) => void = () => null;

  onTouched: () => void = () => null;

  @Input()
  set curPage (value: number) {
    this._curPage = value;
  }

  @Input()
  set totalNumber (value: number) {
    this._totalNumber = value;
  }

  @Input()
  set pageSize (value: number) {
    if (value) {
      this._pageSize = value;
    }
  }

  constructor() { }

  ngOnInit() {
    this.totalPage = Math.ceil(this._totalNumber / this._pageSize);
    this._makePageList(this.totalPage, this._curPage, 2);
  }

  change(value: any, index: number) {
    if (value === '...' && index === this.pageList.length - 2) {
      this._curPage += 5;
    } else if (value === '...' && index === 1) {
      this._curPage -= 5;
    } else {
      this._curPage = value;
    }
    this._makePageList(this.totalPage, this._curPage, 2);
    this.pageChange.emit(this._curPage);
  }

  previous() {
    if (this._curPage > 1) {
      this._curPage --;
      this._makePageList(this.totalPage, this._curPage, 2);
      this.pageChange.emit(this._curPage);
    }
  }

  next() {
    if (this._curPage < this.totalPage) {
      this._curPage ++;
      this._makePageList(this.totalPage, this._curPage, 2);
      this.pageChange.emit(this._curPage);
    }
  }

  private _makePageList (totalPage: number, curPage: number, aroundNumber: number) {
    let result = [];
    const baseCount = aroundNumber * 2 + 1 + 2 + 2 + 2; // 总共元素个数
    const surplus = baseCount - 4; // 只出现一个省略号 剩余元素个数
    const startPosition = 1 + 2 + aroundNumber + 1; // 前面出现省略号的临界点
    const endPosition = totalPage - 2 - aroundNumber - 1; // 后面出现省略号的临界点

    if (totalPage <= baseCount - 2) { // 全部显示 不出现省略号
        result =  Array.from({length: totalPage}, (v, i) => i + 1);
    } else { // 需要出现省略号
        if (curPage < startPosition) { // 1.只有后面出现省略号
            result = [...Array.from({length: surplus}, (v, i) => i + 1), '...', totalPage];
        } else if (curPage > endPosition) { // 2.只有前边出现省略号
            result = [1, '...', ...Array.from({length: surplus}, (v, i) => totalPage - surplus + i + 1)];
        } else { // 3.两边都有省略号
            result = [1, '...', ...Array.from({length: aroundNumber * 2 + 1}, (v, i) => curPage - aroundNumber + i), '...', totalPage];
        }
    }
    this.pageList =  result;
  }

  writeValue(value: number) {
    this._curPage = value;
    this._makePageList(this.totalPage, this._curPage, 2);
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
}
