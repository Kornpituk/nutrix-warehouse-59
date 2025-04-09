
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';
import { useUserContext } from '../context/UserContext';

const UserFilterBar: React.FC = () => {
  const { handleSearch, handleRoleFilter, handleClear } = useUserContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  const onSearch = () => {
    handleSearch(searchTerm);
  };

  const onRoleChange = (role: string) => {
    setSelectedRole(role);
    handleRoleFilter(role);
  };

  const onClear = () => {
    setSearchTerm('');
    setSelectedRole('');
    handleClear();
  };

  return (
    <div className="p-4 flex gap-2">
      <Select 
        value={selectedRole} 
        onValueChange={onRoleChange}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select Role" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="all">All Roles</SelectItem>
          <SelectItem value="Admin">Admin</SelectItem>
          <SelectItem value="Manager">Manager</SelectItem>
          <SelectItem value="User">User</SelectItem>
        </SelectContent>
      </Select>
      
      <div className="flex-grow relative">
        <Input 
          placeholder="Search" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pr-10"
        />
      </div>
      
      <Button 
        variant="default" 
        onClick={onSearch}
      >
        <Search className="size-4 mr-1" /> Search
      </Button>
      
      <Button 
        variant="outline" 
        onClick={onClear}
      >
        Clear
      </Button>
    </div>
  );
};

export default UserFilterBar;
