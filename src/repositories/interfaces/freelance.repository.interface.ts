import { Freelance } from '../../types';
import { CreateFreelanceDTO } from '../../dto';

export interface IFreelanceRepository {
  create(data: CreateFreelanceDTO): Promise<Freelance>;
  findAll(): Promise<Freelance[]>;
  findById(id: number): Promise<Freelance | null>;
  existsByEmail(email: string): Promise<boolean>;
}
