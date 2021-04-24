import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { ResponseInterface } from '../interfaces/response.interface';
import { ReviewModel } from '../models/review.model';
import { OrganizationsService } from '../modules/core/services/organizations-service/organizations.service';
import { ReviewsService } from '../modules/core/services/reviews-service/reviews.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'Review App is running';
  addReview = false;
  term: string;
  showAllOrgReviews = false;
  reviewFormGroup: FormGroup;
  newReview = new ReviewModel();
  allOrganizations;
  message: string;
  success: boolean;
  failed: boolean;
  pending: boolean;

  constructor(
    private orgService: OrganizationsService,
    private reviewService: ReviewsService
    ) { }

  ngOnInit(): void {
    this.getOrganizations();
  }

  getOrganizations(): void {
    this.orgService.getOrganizations().subscribe((res: ResponseInterface) => {
      this.allOrganizations = res.data;
      this.allOrganizations.map((e) => {
        e.showReviews = false;
        e.showAddReview = false;
      });
    });
  }

  sendReview(index: number): void {
    this.pending = true;
    this.message = 'Please wait';
    const data = {
      orgId: this.allOrganizations[index].id,
      reviewer: this.newReview.name,
      review: this.newReview.review
    };
    this.reviewService.addNewReview(data).subscribe((res: ResponseInterface) => {
      this.pending = false;
      this.success = true;
      this.message = 'Your review has been submitted successfully, it will appear below pending admin\'s approval!';
      this.hideAddReviewField(index);
      this.getOrganizations();
    }, (err) => {
      this.failed = true;
      this.message = 'We had trouble submitting your feedback. Please try again';
    });
  }

  showAddReviewField(index: number): void {
    this.allOrganizations[index].showAddReview = true;
  }

  hideAddReviewField(index: number): void {
    this.allOrganizations[index].showAddReview = false;
  }

  showReviews(index: number): void {
    this.allOrganizations[index].showReviews = !this.allOrganizations[index].showReviews;
  }

}
