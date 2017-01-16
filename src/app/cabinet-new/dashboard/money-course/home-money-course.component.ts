import { Component, ViewChild  } from '@angular/core';
import { OnInit } from '@angular/core';
import { CommonService } from '../../../app.services/Common.service';
import { MoneyCourse } from '../../../app.models/MoneyCourse.model';
import {LoaderComponent} from "../../../common-new/loader/loader.component";

@Component({
    selector: 'home-money-course-component',
    templateUrl: 'home-money-course.component.html'
})
export class HomeMoneyCourseComponent implements OnInit {

    @ViewChild('exRatesLoader') exLoader: LoaderComponent;
    courses: MoneyCourse[] = [];

    constructor(
        private commonService: CommonService
    ){
        this.commonService.onGetMoneyCourses.subscribe(
            res => {
                this.courses = res;
                this.exLoader.toggle(false);
            }
        );
    }

    ngOnInit() {
        this.exLoader.toggle(true);
        const gToken = sessionStorage.getItem('gToken');
        if('undefined' !== typeof gToken && gToken) {
            this.getCourses();
        }
    }

    getCourses() {
        this.commonService.getMoneyCourse();
    }

}
