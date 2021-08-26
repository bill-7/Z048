import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: { '(document:keypress)': 'key($event)' }
})
export class AppComponent {

  grid = [[0, 0, 0, 0], [2, 2, 2, 2], [0, 0, 2, 0], [2, 0, 0, 0]]

  key(event: any) {
    const k = event.key

    switch (event.key) {
      case 'a': this.move(); break
      case 'd': this.flip(); this.move(); this.flip(); break
      case 'w': this.spin(); this.move(); this.spin(); break
      case 's': this.spin(); this.move(); this.flip(); this.spin(); break

    }
  }

  spin = () => this.grid = this.grid.map((_, c) => this.grid.map(row => row[c]));
  flip = () => this.grid.forEach(row => row.reverse())
  move = () => {
    this.grid.forEach((row, i) => {
      //find duplicates and merge them
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
      //move cells
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

  c(n: number): string {
    if (n == 0) return "orange"
    if (n == 1) return "blue"
    if (n == 2) return "green"
    return "grey"
  }
}
