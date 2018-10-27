import { ThoughtService } from 'src/services/thought.service';
import { Thought } from 'src/models/Thought';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-shared-news-thoughts',
  templateUrl: './shared-news-thoughts.component.html',
  styleUrls: ['./shared-news-thoughts.component.scss']
})
export class SharedNewsThoughtsComponent implements OnInit {
  thoughts: Thought[];
  rootUrl = environment.rootUrl;

  constructor(
    config: NgbCarouselConfig,
    private thoughtService: ThoughtService,
  ) {
    config.interval = 6000;
    config.wrap = true;
    config.keyboard = true;
    config.pauseOnHover = true;
    config.showNavigationIndicators = false;
  }

  ngOnInit() {
    this.loadThoughts();
  }

  loadThoughts() {
    this.thoughtService.getNewsThoughts().subscribe(
      (res: any) => {
        this.thoughts = res.body;
        console.log(this.thoughts);
        console.log(this.rootUrl + this.thoughts[0].thoughtPhotoUrl);
        // console.log(+res.status);
      },
      error => {
        console.log(error);
      }
    );
  }
}
