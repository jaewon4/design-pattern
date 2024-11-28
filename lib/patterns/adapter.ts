// 원본 데이터 인터페이스들
export interface LegacyUserData {
  user_id: number;
  first_name: string;
  last_name: string;
  mail: string;
  birth_date: string;
  user_type: "admin" | "regular";
}

export interface ThirdPartyUserData {
  id: string;
  displayName: string;
  email: string;
  metadata: {
    dateOfBirth: string;
    role: string;
  };
}

// 통일된 사용자 데이터 인터페이스
export interface StandardUserData {
  id: string | number;
  fullName: string;
  email: string;
  birthDate: Date;
  role: string;
}

// 어댑터 인터페이스
export interface UserDataAdapter {
  adapt(data: LegacyUserData | ThirdPartyUserData): StandardUserData;
}

// Legacy 데이터 어댑터
export class LegacyUserAdapter implements UserDataAdapter {
  adapt(data: LegacyUserData): StandardUserData {
    return {
      id: data.user_id,
      fullName: `${data.first_name} ${data.last_name}`,
      email: data.mail,
      birthDate: new Date(data.birth_date),
      role: data.user_type,
    };
  }
}

// 서드파티 데이터 어댑터
export class ThirdPartyUserAdapter implements UserDataAdapter {
  adapt(data: ThirdPartyUserData): StandardUserData {
    return {
      id: data.id,
      fullName: data.displayName,
      email: data.email,
      birthDate: new Date(data.metadata.dateOfBirth),
      role: data.metadata.role,
    };
  }
}

// 샘플 데이터 생성
export const sampleLegacyUsers: LegacyUserData[] = [
  {
    user_id: 1,
    first_name: "John",
    last_name: "Doe",
    mail: "john@legacy.com",
    birth_date: "1990-05-15",
    user_type: "regular",
  },
  {
    user_id: 2,
    first_name: "Jane",
    last_name: "Smith",
    mail: "jane@legacy.com",
    birth_date: "1985-03-20",
    user_type: "admin",
  },
];

export const sampleThirdPartyUsers: ThirdPartyUserData[] = [
  {
    id: "user-123",
    displayName: "Mike Johnson",
    email: "mike@thirdparty.com",
    metadata: {
      dateOfBirth: "1988-09-10",
      role: "regular",
    },
  },
  {
    id: "user-456",
    displayName: "Sarah Wilson",
    email: "sarah@thirdparty.com",
    metadata: {
      dateOfBirth: "1992-12-25",
      role: "admin",
    },
  },
];
