class Utils {
  constructor() {
    colors: [
      '#42a5f5',
      '#ab47bc',
      '#d32f2f',
      '#f57c00',
      '#0288d1',
      '#388e3c',
      '#90caf9',
      '#ce93d8',
      '#f44336',
      '#ffa726',
      '#29b6f6',
      '#66bb6a',
      '#81c784',
      '#f5e0dc',
      '#f2cdcd',
      '#f5c2e7',
      '#cba6f7',
      '#f38ba8',
      '#eba0ac',
      '#fab387',
      '#f9e2af',
      '#a6e3a1',
      '#94e2d5',
      '#74c7ec',
      '#89b4fa',
      '#b4bfee',
      '#cdd6f4',
      '#bac2de',
      '#a6adc8',
      '#9399b2',
      '#7f849c',
      '#6c7086',
      '#585b70',
      '#45475a',
      '#313244',
      '#1e1e2e',
      '#181825',
      '#11111b',
    ];
  }
  random(min: number, max: number, isFloor?: boolean): number {
    if (isFloor) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return Math.random() * (max - min + 1) + min;
  }
  distance(x1: number, y1: number, x2: number, y2: number): number {
    const sum1 = x1 + y1;
    const sum2 = x2 + y2;
    const sum = Math.pow(sum1, 2) + Math.pow(sum2, 2);
    return Math.sqrt(sum);
  }
}

export default Utils;
