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
    passwordHistory: Partial<PasswordHistoryDto>[];
}

export interface CreateUserDto extends Omit<UserDto, "id"> {
    id?: string;
}

export interface UpdateUserDto extends Omit<UserDto, "password"> {
    password?: string;
}

export interface PasswordHistoryDto {
    id: string;
    userId: string;
    password: string;
    changedAt: Date;
    changedBy?: string;
    reason?: string;
}
