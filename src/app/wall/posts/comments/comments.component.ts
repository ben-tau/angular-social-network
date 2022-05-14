import { Component, Input, OnInit } from '@angular/core';
import { ReworkDate } from 'src/app/helpers/reworkDate';
import { Comment } from '../../../model/comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  constructor() { }


  @Input() comments!:Comment[]


  ngOnInit(): void {
    console.log("comments",this.comments);
    this.reworkDates()
  }

  reworkDates(){
    this.comments.map((comment)=>{
      let timestamp = +comment.datePublication

      return ReworkDate.toString(timestamp,comment,"datePublication")
    })
  }
}
