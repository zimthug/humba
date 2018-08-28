/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HumbaTestModule } from '../../../test.module';
import { MeterModelDetailComponent } from 'app/entities/meter-model/meter-model-detail.component';
import { MeterModel } from 'app/shared/model/meter-model.model';

describe('Component Tests', () => {
    describe('MeterModel Management Detail Component', () => {
        let comp: MeterModelDetailComponent;
        let fixture: ComponentFixture<MeterModelDetailComponent>;
        const route = ({ data: of({ meterModel: new MeterModel(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HumbaTestModule],
                declarations: [MeterModelDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MeterModelDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MeterModelDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.meterModel).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
