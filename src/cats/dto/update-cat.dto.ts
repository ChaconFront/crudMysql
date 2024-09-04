import { PartialType } from '@nestjs/mapped-types';
import { CreateCatDto } from './create-cat.dto';

export class UpdateCatDto extends PartialType(CreateCatDto) {
    // nos permite tener todos los atributos de la tabla CreateCatDto opcionales
}
