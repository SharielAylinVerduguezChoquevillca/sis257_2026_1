import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Persona } from './entities/persona.entity';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';

@Injectable()
export class PersonasService {
  constructor(
    @InjectRepository(Persona)
    private personasRepository: Repository<Persona>,
  ) {}

  async create(createPersonaDto: CreatePersonaDto): Promise<Persona> {
    const existe = await this.personasRepository.findOne({
      where: {
        ci: createPersonaDto.ci.trim(),
      },
    });

    if (existe) {
      throw new ConflictException('La persona ya existe');
    }

    const persona = new Persona();
    Object.assign(persona, createPersonaDto);

    return this.personasRepository.save(persona);
  }

  async findAll(): Promise<Persona[]> {
    return this.personasRepository.find({
      order: { nombres: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Persona> {
    const persona = await this.personasRepository.findOneBy({ id });

    if (!persona) {
      throw new NotFoundException('La persona no existe');
    }

    return persona;
  }

  async update(
    id: number,
    updatePersonaDto: UpdatePersonaDto,
  ): Promise<Persona> {
    const persona = await this.findOne(id);

    Object.assign(persona, updatePersonaDto);

    return this.personasRepository.save(persona);
  }

  async remove(id: number): Promise<Persona> {
    const persona = await this.findOne(id);

    return this.personasRepository.softRemove(persona);
  }
}