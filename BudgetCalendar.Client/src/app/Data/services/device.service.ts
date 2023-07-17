import {Injectable, signal, effect, computed} from '@angular/core';

export enum DeviceType {
  mobile = 'mobile',
  tablet = 'tablet',
  laptop = 'laptop',
  desktop = 'desktop'
}

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  innerWidth = signal(window.innerWidth);
  deviceType = computed(() => this.getDeviceType());
  constructor() {
    // window.onresize = (e) => {
    //   this.innerWidth.set(window.innerWidth);
    // }

  }

  getDeviceType(): DeviceType {
    if (this.innerWidth() < 640) {
      return DeviceType.mobile;
    } else if (this.innerWidth() >= 640 && this.innerWidth() < 768) {
      return DeviceType.tablet;
    } else  if (this.innerWidth() >= 768 && this.innerWidth() < 1024) {
      return DeviceType.laptop;
    }
    return DeviceType.desktop;
}}

