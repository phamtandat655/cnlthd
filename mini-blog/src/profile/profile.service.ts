// profile.service.ts
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
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

  async create(dto: CreateProfileDto, currentUser: any): Promise<Profile> {

    const user = await this.userRepository.findOneBy({ id: currentUser.id });
    if (!user) throw new NotFoundException('Không tìm thấy user');

    const profile = this.profileRepository.create({ fullname: dto.fullname, bio: dto.bio, user });
    const savedProfile = await this.profileRepository.save(profile);

    // Cập nhật lại user.profile (đồng bộ luôn entity User)
    user.profile = savedProfile;
    await this.userRepository.save(user); // cập nhật field profile_id
    return savedProfile
  }

  findAll(): Promise<Profile[]> {
    return this.profileRepository.find({ relations: ['user'] });
  }

  findOne(id: number): Promise<Profile | null> {
    return this.profileRepository.findOne({ where: { id }, relations: ['user'] });
  }

  async update(id: number, dto: UpdateProfileDto, user: any): Promise<Profile> {
    const profile = await this.profileRepository.findOne({ where:{id} , relations: ['user']});
    if (!profile) throw new NotFoundException('Không tìm thấy profile');

    console.log(user.id, profile.user.id)
    // Nếu không phải admin, phải là chủ sở hữu mới được sửa
    if (user.role !== 'admin' && profile.user.id !== user.id) {
    throw new ForbiddenException('Bạn không thể chỉnh sửa profile này');
    }
    Object.assign(profile, dto);
    return this.profileRepository.save(profile);
  }

  async remove(id: number, user: any): Promise<void> {
    const profile = await this.profileRepository.findOne({ where:{id} , relations: ['user']});
    if (!profile) throw new NotFoundException('Không tìm thấy profile');
    // Nếu không phải admin, phải là chủ sở hữu mới được xoá
    if (user.role !== 'admin' && profile.user.id !== user.userId) {
      throw new ForbiddenException('Bạn không thể xoá profile này');
    }
    await this.profileRepository.delete(id);
  }
}
