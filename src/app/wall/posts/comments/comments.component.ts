import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  constructor() { }


  @Input() comments!:string[]


  ngOnInit(): void {
    console.log("comments",this.comments);

  }
}
