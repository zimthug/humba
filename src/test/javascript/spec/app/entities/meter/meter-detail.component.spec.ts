/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HumbaTestModule } from '../../../test.module';
import { MeterDetailComponent } from 'app/entities/meter/meter-detail.component';
import { Meter } from 'app/shared/model/meter.model';

describe('Component Tests', () => {
    describe('Meter Management Detail Component', () => {
        let comp: MeterDetailComponent;
        let fixture: ComponentFixture<MeterDetailComponent>;
        const route = ({ data: of({ meter: new Meter(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HumbaTestModule],
                declarations: [MeterDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MeterDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MeterDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.meter).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
