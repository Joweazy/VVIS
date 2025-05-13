import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-vvis',
  standalone: true,
  imports: [CommonModule, TableModule, RouterModule],
  templateUrl: './vvis.component.html',
  styleUrls: ['./vvis.component.css']
})
export class VvisComponent implements OnInit {
  public top100Years = [2024, 2023, 2022, 2021, 2020];

  ngOnInit() {

  }
}
