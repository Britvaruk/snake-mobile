import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { pause, refresh, play } from 'ionicons/icons';
// @ts-ignore
import nipplejs from 'nipplejs';
import { PageHeaderComponent } from 'src/app/components/page-header/page-header.component';

const SHAKE_DEFAULT_COORDS = [
  { x: 140, y: 160 },
  { x: 120, y: 160 },
  { x: 100, y: 160 },
  { x: 80, y: 160 },
  { x: 60, y: 160 },
];

@Component({
  selector: 'app-game',
  templateUrl: 'game.page.html',
  styleUrls: ['game.page.scss'],
  standalone: true,
  imports: [IonicModule, PageHeaderComponent],
})
export class GamePage implements AfterViewInit {
  @ViewChild('canvas') canvasEl!: ElementRef;
  @ViewChild('joystick') joystickEl!: ElementRef<HTMLElement>;

  private canvas!: HTMLCanvasElement;
  private canvasContext!: CanvasRenderingContext2D;

  private joystick!: HTMLElement;
  private manager: any;

  private cellSize: number = 20;
  private height: number =
    Math.floor((window.innerHeight * 0.75) / this.cellSize) * this.cellSize;
  private width: number =
    Math.floor((window.innerWidth * 0.9) / this.cellSize) * this.cellSize;

  private snake = Array.from(SHAKE_DEFAULT_COORDS);
  private dx: number = this.cellSize;
  private dy: number = 0;
  private direction = 'right';

  private foodX!: number;
  private foodY!: number;

  public score: number = 0;
  private speed: number = 190;

  private gameStatus: any;
  public pause: boolean = false;

  public isAlertOpen = false;

  public alertButtons = [
    {
      text: 'Еще раз',
      handler: () => this.restart(),
    },
  ];

  constructor() {
    addIcons({ pause, refresh, play });
  }

  ngAfterViewInit(): void {
    this.canvas = this.canvasEl.nativeElement;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.joystick = this.joystickEl.nativeElement;
    var options = {
      zone: this.joystick,
      color: '#ffa600',
    };
    this.manager = nipplejs.create(options);
    this.manager.on('dir:up', () => {
      this.onUp();
    });
    this.manager.on('dir:down', () => {
      this.onDown();
    });
    this.manager.on('dir:left', () => {
      this.onLeft();
    });
    this.manager.on('dir:right', () => {
      this.onRight();
    });
    this.createFood();
    this.main();
  }

  private main(): void {
    this.gameStart();
  }

  private gameStart(): void {
    this.gameStatus = setTimeout(() => {
      this.initialiseCanvas();
      this.drawFood();
      this.advanceSnake();
      this.biteItSelf(this.snake);
      this.drawSnake();
      this.main();
    }, this.speed);
  }

  private initialiseCanvas(): void {
    if (this.canvas.getContext('2d')) {
      this.setupCanvas();
    }
  }
  private setupCanvas(): void {
    this.canvasContext = this.canvas.getContext('2d')!;
    this.canvasContext.fillStyle = '#424242';
    this.canvasContext.fillRect(0, 0, this.width, this.height);
  }

  private drawSnake(): void {
    this.snake.forEach((element) => {
      this.drawSnakePart(element);
    });
  }

  private drawSnakePart(snakePart: { x: number; y: number }): void {
    this.canvasContext.fillStyle = 'lightgreen';
    this.canvasContext.strokeStyle = 'darkgreen';
    this.canvasContext.fillRect(
      snakePart.x,
      snakePart.y,
      this.cellSize,
      this.cellSize
    );
    this.canvasContext.strokeRect(
      snakePart.x,
      snakePart.y,
      this.cellSize,
      this.cellSize
    );
  }

  private advanceSnake(): void {
    let head;
    switch (this.direction) {
      case 'up':
        if (this.snake[0].y <= 0) {
          head = {
            x: this.snake[0].x + this.dx,
            y:
              this.snake[0].y +
              Math.ceil(this.canvas.height / this.cellSize) * this.cellSize -
              this.cellSize,
          };
        } else {
          head = { x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy };
        }
        break;
      case 'right':
        if (this.snake[0].x >= this.canvas.width - this.cellSize) {
          head = { x: 0, y: this.snake[0].y + this.dy };
        } else {
          head = { x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy };
        }
        break;
      case 'left':
        if (this.snake[0].x <= 0) {
          head = {
            x:
              Math.ceil(this.canvas.width / this.cellSize) * this.cellSize -
              this.cellSize,
            y: this.snake[0].y + this.dy,
          };
        } else {
          head = { x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy };
        }
        break;
      case 'down':
        if (this.snake[0].y >= this.canvas.height - this.cellSize) {
          head = { x: this.snake[0].x + this.dx, y: 0 };
        } else {
          head = { x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy };
        }
        break;
    }

    if (head) {
      this.snake.unshift(head);
    }

    const didEatFood =
      this.snake[0].x === this.foodX && this.snake[0].y === this.foodY;

    if (didEatFood) {
      this.score++;
      this.createFood();
    } else {
      this.snake.pop();
    }
  }

  private onUp(): void {
    if (this.direction != 'down') {
      this.direction = 'up';
      this.dx = 0;
      this.dy = -this.cellSize;
    }
  }
  private onLeft(): void {
    if (this.direction != 'right') {
      this.direction = 'left';
      this.dx = -this.cellSize;
      this.dy = 0;
    }
  }
  private onRight(): void {
    if (this.direction != 'left') {
      this.direction = 'right';
      this.dx = this.cellSize;
      this.dy = 0;
    }
  }
  private onDown(): void {
    if (this.direction != 'up') {
      this.direction = 'down';
      this.dx = 0;
      this.dy = this.cellSize;
    }
  }

  private randomTen(min: number, max: number): number {
    return (
      Math.round((Math.random() * (max - min) + min) / this.cellSize) *
      this.cellSize
    );
  }

  private createFood(): void {
    this.foodX = this.randomTen(0, this.width - this.cellSize);
    this.foodY = this.randomTen(0, this.height - this.cellSize);
    this.snake.forEach((part) => {
      const foodIsOnSnake = part.x == this.foodX && part.y == this.foodY;
      if (foodIsOnSnake) this.createFood();
    });
  }

  private drawFood(): void {
    this.canvasContext.fillStyle = '#ffa600';
    this.canvasContext.fillRect(
      this.foodX,
      this.foodY,
      this.cellSize,
      this.cellSize
    );
  }

  private biteItSelf(snake: { x: number; y: number }[]): void {
    snake.forEach((snakePart, index) => {
      if (index > 1) {
        if (snake[0].x === snakePart.x && snake[0].y === snakePart.y) {
          this.setOpenLossAlert(true);
        }
      }
    });
  }

  public setOpenLossAlert(isOpen: boolean): void {
    this.isAlertOpen = isOpen;

    if (isOpen) {
      this.pause = true;
      setTimeout(() => clearInterval(this.gameStatus));
    }
  }

  public restart(): void {
    this.score = 0;
    this.direction = 'right';
    this.dx = this.cellSize;
    this.dy = 0;
    this.snake = Array.from(SHAKE_DEFAULT_COORDS);
    this.createFood();
    this.pause = false;

    clearInterval(this.gameStatus);
    this.main();
  }

  public onPause(): void {
    if (!this.pause) {
      this.pause = true;
      clearInterval(this.gameStatus);
    } else {
      this.pause = false;
      this.gameStart();
    }
  }

  ionViewWillLeave(): void {
    this.pause = true;
    clearInterval(this.gameStatus);
  }
}
