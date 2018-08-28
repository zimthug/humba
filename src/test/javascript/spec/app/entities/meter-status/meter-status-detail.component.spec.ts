/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HumbaTestModule } from '../../../test.module';
import { MeterStatusDetailComponent } from 'app/entities/meter-status/meter-status-detail.component';
import { MeterStatus } from 'app/shared/model/meter-status.model';

describe('Component Tests', () => {
    describe('MeterStatus Management Detail Component', () => {
        let comp: MeterStatusDetailComponent;
        let fixture: ComponentFixture<MeterStatusDetailComponent>;
        const route = ({ data: of({ meterStatus: new MeterStatus(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HumbaTestModule],
                declarations: [MeterStatusDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MeterStatusDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MeterStatusDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.meterStatus).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
