import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModeService {
  private mode: 'user' | 'support' = 'user';

  getMode(): 'user' | 'support' {
    return this.mode;
  }

  setMode(mode: 'user' | 'support'): void {
    this.mode = mode;
  }
}