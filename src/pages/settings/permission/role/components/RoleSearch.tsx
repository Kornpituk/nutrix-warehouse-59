
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface RoleSearchProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  onSearch: () => void;
  onClear: () => void;
}

const RoleSearch: React.FC<RoleSearchProps> = ({ 
  searchTerm, 
  setSearchTerm,
  onSearch,
  onClear
}) => {
  return (
    <div className="p-4">
      <div className="flex gap-2">
        <div className="relative flex-grow">
          <Input 
            placeholder="Search all" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
        </div>
        <Button variant="default" onClick={onSearch}>
          <Search className="size-4 mr-1" /> Search
        </Button>
        <Button variant="outline" onClick={onClear}>
          <span>Clear</span>
        </Button>
      </div>
    </div>
  );
};

export default RoleSearch;
