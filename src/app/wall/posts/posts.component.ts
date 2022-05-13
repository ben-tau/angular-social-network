import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { Post } from '../../model/post';

@Component({
  selector: 'app-wall-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class WallPostsComponent implements OnInit {

  posts!:Post[]
  comments!:string[]
  showComments:boolean = false
  userDetails!:any

  constructor(private route:ActivatedRoute,private postsService:PostsService) { }

  ngOnInit(): void {
    this.getStorage()
    this.getPosts()
  }

  getStorage(){
    let storage = localStorage.getItem('userDetails');
    if(storage){
      this.userDetails = JSON.parse(storage)
    }

    console.log('userDetails',this.userDetails);
  }

  displayComments(){
    this.showComments = true;
  }

  private getPosts(){
    this.postsService.getPosts(+this.userDetails.id,this.userDetails.token).subscribe(posts=>{
      console.log("posts",posts);

      posts.map(post => {
        let timestamp = +post.datePublication

        var date = new Date(timestamp);
        var time = new Date(timestamp * 1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();
        var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

        post.datePublication = 'le ' + date.toLocaleDateString('fr-FR') + ' à ' + formattedTime

        return post;
      })

      this.posts = posts
      console.log("this.posts",this.posts);

    })
  }

}
