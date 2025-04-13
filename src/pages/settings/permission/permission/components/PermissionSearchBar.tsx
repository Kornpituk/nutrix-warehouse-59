
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface PermissionSearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  handleSearch: () => void;
  handleClear: () => void;
}

const PermissionSearchBar: React.FC<PermissionSearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  handleSearch,
  handleClear,
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
        <Button variant="default" onClick={handleSearch}>
          <Search className="size-4 mr-1" /> Search
        </Button>
        <Button variant="outline" onClick={handleClear}>
          <span>Clear</span>
        </Button>
      </div>
    </div>
  );
};

export default PermissionSearchBar;
