
export type Size = 'default' | 'small' | 'medium' | 'large';

export interface BlLoadingConfig {
    bdOpacity?: number; // background的透明度
    bdColor?: string; // background的颜色
    size?: Size;  // size
    color?: string; // loading 的文本颜色
    type?: string;  // loading 动画的type
    fullScreen?: boolean;  // 是否全屏
    name?: string;
}

export const defaultBlLoadingConfig: BlLoadingConfig = {
    bdOpacity: 1,
    bdColor: 'rgba(51,51,51,0.8)',
    color: '#fff',
    type: 'ball-scale-multiple',
    name: 'primary'
}

export const loadingAnimationTypes = {
    'ball-beat': 3,
    'ball-circus': 5,
    'ball-clip-rotate': 1,
    'ball-fussion': 4,
    'ball-pulse': 3,
    'ball-spin': 8,
    'square-jelly-box': 2,
}

export class BlLoadingRef {
    name: string;
    bdColor: string;
    bdOpacity: number;
    size: Size;
    color: string;
    type: string;
    class: string;
    divCount: number;
    divArray: Array<number>;
    fullScreen: boolean;
    show: boolean;

    constructor(init?: Partial<BlLoadingRef>) {
        Object.assign(this, init);
    }
}