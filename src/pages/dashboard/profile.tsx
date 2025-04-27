import React from "react";
import ProtectedRouteWrapper from "@/layout/ProtectedRouteWrapper";
import { useStoreValue } from "zustand-x";
import { authStore } from "@/store/auth.store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Profile = () => {
  const user = useStoreValue(authStore, "user");

  if (!user) return null;

  return (
    <ProtectedRouteWrapper>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <Card className="w-full max-w-md shadow-2xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-gray-800">
              User Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-gray-700">
              <strong>Email:</strong> {user.email || "N/A"}
            </div>
            <div className="text-gray-700">
              <strong>ID:</strong> {user.id}
            </div>
            <div className="text-gray-700">
              <strong>Role:</strong> {user.role || "N/A"}
            </div>
            <div className="text-gray-700">
              <strong>Created At:</strong>{" "}
              {new Date(user.created_at).toLocaleString()}
            </div>
            {user.last_sign_in_at && (
              <div className="text-gray-700">
                <strong>Last Sign In:</strong>{" "}
                {new Date(user.last_sign_in_at).toLocaleString()}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ProtectedRouteWrapper>
  );
};

export default Profile;
