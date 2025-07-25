import { ChatMemberRole } from '@ecorally/shared';

export class ChatMember {
  constructor(
    private readonly _id: string,
    private readonly _imageUrl: string,
    private readonly _firstName: string,
    private readonly _lastName: string | null,
    private readonly _role: ChatMemberRole,
  ) {}

  static create(params: { id: string; role: ChatMemberRole }): ChatMember {
    return new ChatMember(params.id, '', '', null, params.role);
  }

  static fromPersistence(params: {
    id: string;
    imageUrl: string;
    firstName: string;
    lastName: string | null;
    role: ChatMemberRole;
  }): ChatMember {
    return new ChatMember(
      params.id,
      params.imageUrl,
      params.firstName,
      params.firstName,
      params.role,
    );
  }

  get id(): string {
    return this._id;
  }

  get imageUrl(): string {
    return this._imageUrl;
  }

  get firstName(): string {
    return this._firstName;
  }

  get lastName(): string | null {
    return this._lastName;
  }

  get role(): ChatMemberRole {
    return this._role;
  }

  toJSON() {
    return {
      id: this._id,
      firstName: this._firstName,
      lastName: this._lastName,
      imageUrl: this._imageUrl,
      role: this._role,
    };
  }
}
