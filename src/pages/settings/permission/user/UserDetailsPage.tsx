
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserContext } from './context';
import UserDetailsHeader from './components/UserDetailsHeader';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';

const UserDetailsPage: React.FC = () => {
  const { users } = useUserContext();
  const { id } = useParams();
  const navigate = useNavigate();
  
  const user = users.find(u => u.id === id);
  
  if (!user) {
    return (
      <div className="container mx-auto py-6 text-center">
        <h1 className="text-2xl font-bold">User not found</h1>
        <button 
          onClick={() => navigate('/settings/permission/users')}
          className="mt-4 text-blue-600 hover:underline"
        >
          Back to users
        </button>
      </div>
    );
  }

  const statusClassName = user.isActive 
    ? "bg-green-100 text-green-800" 
    : "bg-red-100 text-red-800";
  
  const statusText = user.isActive ? "Active" : "Inactive";
  
  const userRole = user.isAdmin 
    ? 'Admin' 
    : user.permissions.length > 5 
      ? 'Manager' 
      : 'User';

  const handleEdit = () => {
    navigate(`/settings/permission/users/edit/${user.id}`);
  };

  return (
    <div className="container mx-auto py-4">
      <UserDetailsHeader user={user} onEdit={handleEdit} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>User personal information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center text-gray-500 text-xl mr-4">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{user.name}</h3>
                  <Badge className={statusClassName}>
                    {statusText}
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500">First Name</div>
                  <div>{user.firstName}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Last Name</div>
                  <div>{user.lastName}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <div>{user.email}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Username</div>
                  <div>{user.userName}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Job Information</CardTitle>
            <CardDescription>User role and department information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Role</div>
                  <div>{userRole}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Department</div>
                  <div>{user.department}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Position</div>
                  <div>{user.position}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Admin Access</div>
                  <div>{user.isAdmin ? 'Yes' : 'No'}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Permissions</CardTitle>
            <CardDescription>User assigned permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {user.permissions.length === 0 ? (
                <div className="text-gray-500">No permissions assigned</div>
              ) : (
                user.permissions.map(permission => (
                  <Badge key={permission.id} variant="outline" className="bg-gray-100">
                    {permission.name}
                  </Badge>
                ))
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Metadata</CardTitle>
            <CardDescription>User creation and modification information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500">Created</div>
                <div>{format(new Date(user.created), 'PPP')}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Last Updated</div>
                <div>{format(new Date(user.updated), 'PPP')}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDetailsPage;
