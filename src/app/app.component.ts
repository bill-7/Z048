import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: { '(document:keypress)': 'key($event)' }
})
export class AppComponent {

  grid = [[0, 0, 2, 0], [0, 2, 0, 0], [0, 0, 0, 0], [2, 0, 0, 0]]

  key(event: any) {
    switch (event.key) {
      case 'a': this.move(); break
      case 'd': this.flip(); this.move(); this.flip(); break
      case 'w': this.spin(); this.move(); this.spin(); break
      case 's': this.fsf(); this.move(); this.fsf(); break
    }
    this.add();
  }

  fsf = () => { this.flip(); this.spin(); this.flip(); }
  spin = () => this.grid = this.grid.map((_, c) => this.grid.map(row => row[c]));
  flip = () => this.grid.forEach(row => row.reverse())
  move = () => {
    this.grid.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell != 0) {
          for (let q = j + 1; q <= 3; q++) {
            if (this.grid[i][q] == 0)
              continue
            else if (this.grid[i][q] == cell) {
              this.grid[i][j] *= 2
              this.grid[i][q] = 0
              break
            }
            else break
          }
        }
      })
      row.forEach((cell, j) => {
        if (cell != 0) {
          for (let x = 0; x < j; x++) {
            if (this.grid[i][x] == 0) {
              this.grid[i][x] = cell
              this.grid[i][j] = 0
              break
            }
          }
        }
      })
    })
  }

  add = () => {
    const x = Math.floor(Math.random() * 3)
    const y = Math.floor(Math.random() * 3)
    this.grid[x][y] == 0 ? this.grid[x][y] = Math.floor(Math.random() * 1) + 1 * 2 : this.add()
  }

  c(n: number): string {
    if (n == 0) return "#f0f0f0"
    if (n == 1) return "blue"
    if (n == 2) return "green"
    return "grey"
  }
}
