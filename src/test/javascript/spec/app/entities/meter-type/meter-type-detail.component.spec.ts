/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HumbaTestModule } from '../../../test.module';
import { MeterTypeDetailComponent } from 'app/entities/meter-type/meter-type-detail.component';
import { MeterType } from 'app/shared/model/meter-type.model';

describe('Component Tests', () => {
    describe('MeterType Management Detail Component', () => {
        let comp: MeterTypeDetailComponent;
        let fixture: ComponentFixture<MeterTypeDetailComponent>;
        const route = ({ data: of({ meterType: new MeterType(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HumbaTestModule],
                declarations: [MeterTypeDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MeterTypeDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MeterTypeDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.meterType).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
