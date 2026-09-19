import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Uuid {
  Uuid(): number {
    const timestamp = Date.now();
    const performanceNow = Math.floor(performance.now() * 100) % 1000;
    const random = Math.floor(Math.random() * 1000);

    return Number(`${timestamp}${performanceNow}${random}`);
  }

}
