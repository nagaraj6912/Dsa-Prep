import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { userRoleService, profileService } from '@/integrations/firebase/services';
import { auth } from '@/integrations/firebase/config';
import { Loader2, Users, Shield, User } from 'lucide-react';

interface UserWithRole {
  id: string;
  email: string;
  display_name: string | null;
  role: 'admin' | 'user';
  created_at: string;
}

export default function UserManagement() {
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const currentUser = auth.currentUser;
      
      // Get all user roles
      const userRoles = await userRoleService.getAll();
      console.log('Found user roles:', userRoles);

      // If no users in database, create a default entry for current user
      if (userRoles.length === 0 && currentUser) {
        console.log('No users found, creating default admin user');
        const defaultUser: UserWithRole = {
          id: currentUser.uid,
          email: currentUser.email || 'admin@example.com',
          display_name: currentUser.displayName || 'Admin User',
          role: 'admin',
          created_at: new Date().toISOString(),
        };
        setUsers([defaultUser]);
        setLoading(false);
        return;
      }

      // Get all profiles
      const profiles = await Promise.all(
        userRoles.map(async (userRole) => {
          const profile = await profileService.getByUserId(userRole.user_id);
          return profile;
        })
      );

      // Combine user roles and profiles
      const usersWithRoles: UserWithRole[] = userRoles.map((userRole, index) => {
        const profile = profiles[index];
        
        return {
          id: userRole.user_id,
          email: 'user@example.com', // Placeholder since we can't access auth.users without admin SDK
          display_name: profile?.display_name || `User ${userRole.user_id.slice(0, 8)}`,
          role: userRole.role,
          created_at: userRole.created_at,
        };
      });

      // Add current user if not already in the list
      if (currentUser && !usersWithRoles.find(u => u.id === currentUser.uid)) {
        usersWithRoles.push({
          id: currentUser.uid,
          email: currentUser.email || 'current@user.com',
          display_name: currentUser.displayName || 'Current User',
          role: 'admin', // Since you have admin access
          created_at: new Date().toISOString(),
        });
      }

      setUsers(usersWithRoles);
    } catch (error) {
      console.error('Error fetching users:', error);
      
      // Fallback: show current user if available
      const currentUser = auth.currentUser;
      if (currentUser) {
        const fallbackUser: UserWithRole = {
          id: currentUser.uid,
          email: currentUser.email || 'admin@example.com',
          display_name: currentUser.displayName || 'Admin User',
          role: 'admin',
          created_at: new Date().toISOString(),
        };
        setUsers([fallbackUser]);
      }
      
      toast({
        title: "Warning",
        description: "Could not fetch all users, showing current user only",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: 'admin' | 'user') => {
    setUpdating(userId);
    
    try {
      await userRoleService.update(userId, newRole);

      setUsers(prev => prev.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      ));

      toast({
        title: "Success",
        description: `User role updated to ${newRole}`,
      });
    } catch (error) {
      console.error('Error updating user role:', error);
      toast({
        title: "Error",
        description: "Failed to update user role",
        variant: "destructive",
      });
    } finally {
      setUpdating(null);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-6">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="ml-2">Loading users...</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          User Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user) => (
            <div 
              key={user.id} 
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  {user.role === 'admin' ? (
                    <Shield className="h-5 w-5 text-primary" />
                  ) : (
                    <User className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <div className="font-medium">
                    {user.display_name || 'No name'}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {user.email}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    ID: {user.id.slice(0, 8)}...
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                  {user.role}
                </Badge>
                
                <Select
                  value={user.role}
                  onValueChange={(value: 'admin' | 'user') => updateUserRole(user.id, value)}
                  disabled={updating === user.id}
                >
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>

                {updating === user.id && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}
              </div>
            </div>
          ))}

          {users.length === 0 && (
            <div className="text-center text-muted-foreground py-6">
              <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No users found</p>
              <p className="text-sm">Users will appear here once they sign up</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}