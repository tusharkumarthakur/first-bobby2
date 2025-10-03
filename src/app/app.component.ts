import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import confetti from 'canvas-confetti';
import lottie from 'lottie-web'; // <-- fixed import

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('lottieCanvas', { static: true })
  lottieCanvas!: ElementRef<HTMLCanvasElement>;
  currentVideoIndex = 0;
  intervalId: any;
  videos = [
    'assets/gallery/13.mp4',
    'assets/gallery/14.mp4',
    'assets/gallery/15.mp4',
    'assets/gallery/16.mp4',
  ];
  // Background Music
  audios = [
    'assets/gallery/17.mp3',
    'assets/gallery/18.mp3',
    'assets/gallery/19.mp3',
    'assets/gallery/20.mp3',
    'assets/gallery/21.mp3',
    'assets/gallery/22.mp3',
  ];
  currentAudioIndex = 0;

  @ViewChild('bgAudio') bgAudio!: ElementRef<HTMLAudioElement>;

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.currentVideoIndex =
        (this.currentVideoIndex + 1) % this.videos.length;
    }, 3000);
    this.launchConfetti();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  ngAfterViewInit(): void {
    this.loadLottieAnimation();
  }

  changeMusic() {
    this.currentAudioIndex = (this.currentAudioIndex + 1) % this.audios.length;
    const audioEl = this.bgAudio.nativeElement;
    audioEl.src = this.audios[this.currentAudioIndex];
    audioEl.load();
    audioEl.play();
  }

  launchConfetti() {
    const duration = 5 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 } });
      confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 } });

      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }
  images = [
    'assets/gallery/2.jpg',
    'assets/gallery/3.jpg',
    'assets/gallery/1.jpg',
    'assets/gallery/4.jpg',
    'assets/gallery/5.jpg',
    'assets/gallery/6.jpg',
    'assets/gallery/8.jpg',
    'assets/gallery/7.jpg',
  ];
  loadLottieAnimation() {
    lottie.loadAnimation({
      container: this.lottieCanvas.nativeElement,
      renderer: 'canvas',
      loop: true,
      autoplay: true,
      path: 'https://assets7.lottiefiles.com/packages/lf20_zGWML4.json',
    });
  }
}
