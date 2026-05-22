export interface UserDto {
    id: string;
    firstName: string;
    lastName: string;
    image?: string | null;
    license?: string | null;
    username: string;
    password: string;
    certifiedNumber?: string | null;
    roleId: string;
    createdAt?: Date;
    updatedAt?: Date;

    isActive?: boolean;
    isLock?: boolean;
    lockedAt?: Date | null;
    isDelete?: boolean;
    deletedAt?: Date | null;
}

export interface UserResponseDto extends UserDto {
    role: {
        id: string;
        name: string;
        createdAt?: Date | null;
        updatedAt?: Date | null;
    };
}

export interface CreateUserDto extends Omit<UserDto, "id"> {
    id?: string;
}

export interface UpdateUserDto extends Omit<UserDto, "password"> {
    password?: string;
}
