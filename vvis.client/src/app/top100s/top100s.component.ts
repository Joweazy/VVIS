import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-top100s',
  standalone: true,
  imports: [CommonModule, TableModule, RouterModule],
  templateUrl: './top100s.component.html',
  styleUrls: ['./top100s.component.css']
})
export class Top100sComponent implements OnInit {
  public top100Years = [2024, 2023, 2022, 2021, 2020];

  ngOnInit() {

  }
}
