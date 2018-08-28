/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HumbaTestModule } from '../../../test.module';
import { MeterMakeDetailComponent } from 'app/entities/meter-make/meter-make-detail.component';
import { MeterMake } from 'app/shared/model/meter-make.model';

describe('Component Tests', () => {
    describe('MeterMake Management Detail Component', () => {
        let comp: MeterMakeDetailComponent;
        let fixture: ComponentFixture<MeterMakeDetailComponent>;
        const route = ({ data: of({ meterMake: new MeterMake(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HumbaTestModule],
                declarations: [MeterMakeDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MeterMakeDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MeterMakeDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.meterMake).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
