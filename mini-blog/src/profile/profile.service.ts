// profile.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../entities/profile.entity';
import { CreateProfileDto, UpdateProfileDto } from './dto/profile.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(dto: CreateProfileDto): Promise<Profile> {
    const user = await this.userRepository.findOneBy({ id: dto.userId });
    if (!user) throw new NotFoundException('Không tìm thấy user');

    const profile = this.profileRepository.create({ fullname: dto.fullname, bio: dto.bio, user });
    return this.profileRepository.save(profile);
  }

  findAll(): Promise<Profile[]> {
    return this.profileRepository.find({ relations: ['user'] });
  }

  findOne(id: number): Promise<Profile | null> {
    return this.profileRepository.findOne({ where: { id }, relations: ['user'] });
  }

  async update(id: number, dto: UpdateProfileDto): Promise<Profile> {
    const profile = await this.profileRepository.findOneBy({ id });
    if (!profile) throw new NotFoundException('Không tìm thấy profile');

    Object.assign(profile, dto);
    return this.profileRepository.save(profile);
  }

  async remove(id: number): Promise<void> {
    await this.profileRepository.delete(id);
  }
}
