import { Component, ViewChild  } from '@angular/core';
import { OnInit } from '@angular/core';
import { CommonService } from '../../../app.services/Common.service';
import { MoneyCourse } from '../../../app.models/MoneyCourse.model';

@Component({
    selector: 'home-money-course-component',
    templateUrl: 'home-money-course.component.html'
})
export class HomeMoneyCourseComponent implements OnInit {

    courses: MoneyCourse[] = [];

    constructor(
        private commonService: CommonService
    ){
        this.commonService.onGetMoneyCourses.subscribe(
            res => {
                this.courses = res;
            }
        );
    }

    ngOnInit() {
        this.getCourses();
    }

    getCourses() {
        this.commonService.getMoneyCourse();
    }

}
