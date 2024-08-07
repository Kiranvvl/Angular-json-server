import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
})
export class ChildComponent implements OnInit {
  parentData: string | undefined;
  constructor(private dataService: DataService) {}
  ngOnInit(): void {
    this.dataService.data$.subscribe({
      next: (data) => {
        this.parentData = data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
