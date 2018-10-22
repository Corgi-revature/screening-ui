import { TestBed, async } from '@angular/core/testing';
import { SkillTypeBucketsComponent } from './skillType-buckets.component';
import { FormsModule } from '@angular/forms';
import { AlertsService } from 'src/app/services/alert-service/alerts.service';
import { BucketsService } from 'src/app/services/buckets/buckets.service';
import { QuestionsService } from 'src/app/services/questions/questions.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UrlService } from 'src/app/services/urls/url.service';
import { Bucket } from 'src/app/entities/Bucket';
import { of } from 'rxjs';
import { NgbModal, NgbModalRef, NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('SkillTypeBucketsComponent', () => {
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        NgbModule.forRoot(),
      ],
      declarations: [
        SkillTypeBucketsComponent, 
      ],
      providers: [ 
        { provide: Router, useValue: routerSpy },
        AlertsService,
        BucketsService,
        QuestionsService,
        UrlService,
      ]
    })
    .compileComponents();
  });

  it('should create the component', () => {
    let fixture = TestBed.createComponent(SkillTypeBucketsComponent);
    let component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should get and sort buckets', async(() => {
    let fixture = TestBed.createComponent(SkillTypeBucketsComponent);
    let component = fixture.debugElement.componentInstance;
    let bucketsService = fixture.debugElement.injector.get(BucketsService);
    let buckets: Bucket[] = [
      {
        bucketId: 0,
        bucketDescription: 'description1',
        isActive: false
      },
      {
        bucketId: 1,
        bucketDescription: 'description2',
        isActive: true
      },
      {
        bucketId: 2,
        bucketDescription: 'description3',
        isActive: false
      },
      {
        bucketId: 3,
        bucketDescription: 'description4',
        isActive: true
      }
    ];
    spyOn(bucketsService, 'getAllBuckets').and.returnValue(of(buckets));
    component.getBuckets();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.buckets).toEqual(buckets);
      var i: number;
      for (i = 1; i < component.buckets.length; ++i) {
        if (component.buckets[i].isActive === 'true')
          expect(component.buckets[i - 1].isActive).toEqual('true');
        }
      });
  }));

  it('should return -1 if the first bucket is active and 1 if it\'s not', () => {
    let fixture = TestBed.createComponent(SkillTypeBucketsComponent);
    let component = fixture.debugElement.componentInstance;
    let buckets: Bucket[] = [{
      bucketId: 0,
      bucketDescription: 'description1',
      isActive: true
    },
    {
      bucketId: 1,
      bucketDescription: 'description2',
      isActive: false
    }
  ];
    let firstBucketIsActiveValue = component.compare(buckets[0], buckets[1]);
    expect(firstBucketIsActiveValue).toEqual(-1);
    let secondBucketIsActiveValue = component.compare(buckets[1], buckets[0]);
    expect(secondBucketIsActiveValue).toEqual(1);
  });

  it('should set a bucket and call the expected url when routing', () => {
    let fixture = TestBed.createComponent(SkillTypeBucketsComponent);
    let component = fixture.debugElement.componentInstance;
    let bucketsService = TestBed.get(BucketsService);
    let bucket: Bucket = {
      bucketId: 416,
      bucketDescription: 'SQL',
      isActive: true
    };
    spyOn(bucketsService, 'setBucket');
    let spy = component.router.navigate as jasmine.Spy;
    component.routeToBucket(bucket);
    expect(bucketsService.setBucket.calls.count()).toEqual(1);
    let navArgs = spy.calls.first().args[0];;
    expect(navArgs).toEqual(['settings/bucket']);
  });

  it('should edit the current bucket', () => {
    let fixture = TestBed.createComponent(SkillTypeBucketsComponent);
    let component = fixture.debugElement.componentInstance;
    let bucket: Bucket = {
      bucketId: 0,
      bucketDescription: 'description',
      isActive: true
    };
    component.editBucket(bucket);
    expect(component.currBucket).toEqual(bucket);
  });

  it('should update buckets with the current bucket if the argument is falsy and with the argument if not.', () => {
    let fixture = TestBed.createComponent(SkillTypeBucketsComponent);
    let component = fixture.debugElement.componentInstance;
    let bucketsService = fixture.debugElement.injector.get(BucketsService);
    let nullBucket: Bucket = null;
    let bucket: Bucket = {
      bucketId: 0,
      bucketDescription: 'description',
      isActive: true
    };
    spyOn(bucketsService, 'updateBucket').and.returnValue(of(bucket));
    spyOn(component, 'getBuckets');
    spyOn(component, 'savedSuccessfully');
    component.updateBucket(bucket);
    expect(bucketsService.updateBucket).toHaveBeenCalled();
    expect(component.getBuckets.calls.count()).toEqual(1);
    expect(component.savedSuccessfully.calls.count()).toEqual(1);
    
    let currentBucket: Bucket = {
      bucketId: 1,
      bucketDescription: 'null bucket should be replaced by the current bucket',
      isActive: true
    };
    component.getBuckets.calls.reset();
    component.savedSuccessfully.calls.reset();
    component.currBucket = currentBucket;
    component.updateBucket(nullBucket);
    expect(bucketsService.updateBucket).toHaveBeenCalled();
    expect(component.getBuckets.calls.count()).toEqual(1);
    expect(component.savedSuccessfully.calls.count()).toEqual(1);
  });

  it('should create a new bucket', () => {
    let fixture = TestBed.createComponent(SkillTypeBucketsComponent);
    let component = fixture.debugElement.componentInstance;
    let bucketsService = fixture.debugElement.injector.get(BucketsService);
    let bucket: Bucket = {
      bucketId: 0,
      bucketDescription: 'description',
      isActive: true
    };
    spyOn(bucketsService, 'createNewBucket').and.returnValue(of(bucket));
    component.buckets = [];
    component.createBucket();
    expect(bucketsService.createNewBucket).toHaveBeenCalled();
    expect(component.buckets).toContain(bucket);
  });

  it('should emit the success message from alertsService', () => {
    let fixture = TestBed.createComponent(SkillTypeBucketsComponent);
    let component = fixture.debugElement.componentInstance;
    let alertsService = TestBed.get(AlertsService);
    spyOn(alertsService, 'getMessage').and.returnValue(alertsService.subject);
    let alertsServicesSubj = alertsService.getMessage();
    alertsServicesSubj.subscribe((data) => {
      expect(data).toEqual({type: "success", text: "Saved successfully"});
    })
    component.savedSuccessfully();
  });
  
  it('should open the modal', () => {
    let fixture = TestBed.createComponent(SkillTypeBucketsComponent);
    let component = fixture.debugElement.componentInstance;
    let modalService = TestBed.get(NgbModal);
    let modalRef: NgbModalRef;
    modalRef = modalService.open(component.nameInputRef);
    spyOn(modalService, "open").and.returnValue(modalRef);
    component.open(component.nameInputRef);
    expect(modalService.open).toHaveBeenCalled();
  });

});
