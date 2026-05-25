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

    failedLoginCount: number;
    lastFailedLogin?: Date | null;

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

export interface CreateUserDto extends Omit<UserDto, "id" | "failedLoginCount" | "lastFailedLogin"> {
    id?: string;
}

export interface UpdateUserDto extends Omit<UserDto, "password" | "failedLoginCount"> {
    password?: string;
    failedLoginCount?: number;
}

export interface PasswordHistoryDto {
    id: string;
    userId: string;
    password: string;
    changedAt: Date;
    changedBy?: string;
    reason?: string;
}
