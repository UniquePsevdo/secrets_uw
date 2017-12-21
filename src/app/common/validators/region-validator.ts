import { AbstractControl } from '@angular/forms';

export function validateRegion(control: AbstractControl) {
    let regions = [
        'Одеська область',
        'Дніпропетровська область',
        'Чернігівська область',
        'Харківська область',
        'Житомирська область',
        'Полтавська область',
        'Херсонська область',
        'Київська область',
        'Запорізька область',
        'Луганська область',
        'Донецька область',
        'Вінницька область',
        'Автономна Республіка Крим',
        'Миколаївська область',
        'Кіровоградська область',
        'Сумська область',
        'Львівська область',
        'Черкаська область',
        'Хмельницька область',
        'Волинська область',
        'Рівненська область',
        'Івано-Франківська область',
        'Тернопільська область',
        'Закарпатська область',
        'Чернівецька область'
    ];
    if (regions.indexOf(control.value) === -1) {
        return { regionValid: false };
    }
    return null;
}



/*
import {Directive, forwardRef} from '@angular/core';
import {NG_VALIDATORS, FormControl} from '@angular/forms';

function validateRegionFactory() {
    let regions = [
        'Одеська область',
        'Дніпропетровська область',
        'Чернігівська область',
        'Харківська область',
        'Житомирська область',
        'Полтавська область',
        'Херсонська область',
        'Київська область',
        'Запорізька область',
        'Луганська область',
        'Донецька область',
        'Вінницька область',
        'Автономна Республіка Крим',
        'Миколаївська область',
        'Кіровоградська область',
        'Сумська область',
        'Львівська область',
        'Черкаська область',
        'Хмельницька область',
        'Волинська область',
        'Рівненська область',
        'Івано-Франківська область',
        'Тернопільська область',
        'Закарпатська область',
        'Чернівецька область'
    ];
    return (c: FormControl) => {
        return {
            validateRegion: {
                valid: regions.indexOf(c.value)>-1
            }
        }
    };
}

@Directive({
    selector: '[validateRegion][ngModel],[validateRegion][formControl]',
    providers: [
        {provide: NG_VALIDATORS, useExisting: forwardRef(() => RegionValidator), multi: true}
    ]
})
export class RegionValidator {

    validator: Function;

    constructor() {
        this.validator = validateRegionFactory();
    }

    validate(c: FormControl) {
        console.log(this.validator(c));
        return this.validator(c);
    }
}*/
