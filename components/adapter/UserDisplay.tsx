import { useState } from "react";
import {
  StandardUserData,
  LegacyUserAdapter,
  ThirdPartyUserAdapter,
  sampleLegacyUsers,
  sampleThirdPartyUsers,
} from "@/lib/patterns/adapter";

const legacyAdapter = new LegacyUserAdapter();
const thirdPartyAdapter = new ThirdPartyUserAdapter();

interface UserCardProps {
  user: StandardUserData;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">{user.fullName}</h3>
        <span className="px-2 py-1 text-xs rounded-full bg-gray-100">
          {user.role}
        </span>
      </div>
      <div className="space-y-2 text-sm text-gray-600">
        <p>ID: {user.id}</p>
        <p>Email: {user.email}</p>
        <p>Birth Date: {user.birthDate.toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export const UserDisplay: React.FC = () => {
  const [dataSource, setDataSource] = useState<"legacy" | "thirdParty">(
    "legacy"
  );

  const adaptedUsers =
    dataSource === "legacy"
      ? sampleLegacyUsers.map((user) => legacyAdapter.adapt(user))
      : sampleThirdPartyUsers.map((user) => thirdPartyAdapter.adapt(user));

  return (
    <div className="space-y-6">
      <div className="flex space-x-4">
        <button
          onClick={() => setDataSource("legacy")}
          className={`px-4 py-2 rounded ${
            dataSource === "legacy" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Legacy Data
        </button>
        <button
          onClick={() => setDataSource("thirdParty")}
          className={`px-4 py-2 rounded ${
            dataSource === "thirdParty"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Third Party Data
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {adaptedUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-2">Original Data Format:</h4>
          <pre className="text-sm overflow-auto bg-white p-4 rounded">
            {JSON.stringify(
              dataSource === "legacy"
                ? sampleLegacyUsers[0]
                : sampleThirdPartyUsers[0],
              null,
              2
            )}
          </pre>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-2">Standardized Data Format:</h4>
          <pre className="text-sm overflow-auto bg-white p-4 rounded">
            {JSON.stringify(
              adaptedUsers[0],
              (key, value) => {
                // value가 Date 객체인지 확인
                if (key === "birthDate" && value instanceof Date) {
                  return value.toISOString().split("T")[0];
                }
                return value;
              },
              2
            )}
          </pre>
        </div>
      </div>
    </div>
  );
};
