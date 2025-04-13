
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { authenticatedFetch } from '@/utils/auth';
import { PermissionItem } from '@/types/settingType/permission/permission';

export const usePermissionData = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState<PermissionItem[]>([]);
  const [selectedPermission, setSelectedPermission] = useState<PermissionItem | null>(null);
  const [isAddPermissionDialogOpen, setIsAddPermissionDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDetailsMode, setIsViewDetailsMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [newPermissionName, setNewPermissionName] = useState("");
  const [newPermissionCode, setNewPermissionCode] = useState("");
  const [newPermissionDescription, setNewPermissionDescription] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [locationId, setLocationId] = useState<string>("1");

  const fetchPermissionData = async () => {
    try {
      const response = await authenticatedFetch(
        `https://hyperintruntime.srphub.com:2096/megw/apis/stream/users-permission-get-2cf66/v1.0/exec`,
        {
          method: 'POST',
          headers: {
            "x-location": locationId,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch permission data: ${response.status}`);
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        setPermissions(data);
      } else if (data) {
        setPermissions([data]);
      } else {
        setPermissions([]);
      }
    } catch (error) {
      console.error("Error fetching permission data:", error);
      toast({
        title: "Error",
        description: "Failed to load permission data. Please try again.",
        variant: "destructive",
      });
      setPermissions([]);
    }
  };

  const handleAddPermission = () => {
    if (!newPermissionName.trim() || !newPermissionCode.trim()) {
      toast({
        title: "Error",
        description: "Permission name and code are required",
        variant: "destructive",
      });
      return;
    }

    const newPermissionItem: PermissionItem = {
      PermissionId: 0, 
      PermissionName: newPermissionName,
      PermissionCode: newPermissionCode,
      Description: newPermissionDescription || null,
      UsedInRols: 0,
      CreatedAt: new Date().toISOString(),
      CreatedBy: null,
      CreatedByName: null,
      ModifiedAt: null,
      ModifiedBy: null,
      ModifiedByName: null,
    };

    setPermissions(prevPermissions => [...prevPermissions, newPermissionItem]);
    setNewPermissionName("");
    setNewPermissionCode("");
    setNewPermissionDescription("");
    setIsAddPermissionDialogOpen(false);

    toast({
      title: "Success",
      description: "Permission added successfully",
    });
  };

  const handleDeletePermission = () => {
    if (selectedPermission) {
      setPermissions(
        permissions.filter(
          (permission) =>
            permission.PermissionId !== selectedPermission.PermissionId
        )
      );
      setIsDeleteDialogOpen(false);
      setSelectedPermission(null);

      toast({
        title: "Success",
        description: `Permission "${selectedPermission.PermissionName}" has been deleted`,
      });
    }
  };

  const handleViewPermissionDetails = (permission: PermissionItem) => {
    setSelectedPermission(permission);
    setIsViewDetailsMode(true);
  };

  const handleEditPermission = (permission: PermissionItem) => {
    setSelectedPermission(permission);
    setNewPermissionName(permission.PermissionName);
    setNewPermissionCode(permission.PermissionCode);
    setNewPermissionDescription(permission.Description || "");
    setIsEditMode(true);
  };

  const handleSaveEdit = () => {
    if (selectedPermission) {
      const updatedPermissions = permissions.map((permission) =>
        permission.PermissionId === selectedPermission.PermissionId
          ? {
              ...permission,
              PermissionName: newPermissionName,
              PermissionCode: newPermissionCode,
              Description: newPermissionDescription || null,
              ModifiedAt: new Date().toISOString(),
            }
          : permission
      );

      setPermissions(updatedPermissions);
      setIsEditMode(false);
      setSelectedPermission(null);

      toast({
        title: "Success",
        description: "Permission updated successfully",
      });
    }
  };

  const handleSearch = () => {
    // Implement search functionality
  };

  const handleClear = () => {
    setSearchTerm("");
    // Reset search results
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const storedWarehouse = localStorage.getItem("selectedWarehouse");
    if (!storedWarehouse) {
      navigate("/select-warehouse");
      return;
    } else {
      try {
        const parsedWarehouse = JSON.parse(storedWarehouse);
        if (parsedWarehouse && parsedWarehouse.id) {
          setLocationId(parsedWarehouse.id);
        }
      } catch (error) {
        console.error("Error parsing stored warehouse:", error);
      }
    }

    fetchPermissionData();
  }, [navigate]);

  return {
    permissions,
    selectedPermission,
    isAddPermissionDialogOpen,
    isDeleteDialogOpen,
    isViewDetailsMode,
    isEditMode,
    newPermissionName,
    newPermissionCode,
    newPermissionDescription,
    searchTerm,
    setSearchTerm,
    setSelectedPermission,
    setIsAddPermissionDialogOpen,
    setIsDeleteDialogOpen,
    setIsViewDetailsMode,
    setIsEditMode,
    setNewPermissionName,
    setNewPermissionCode,
    setNewPermissionDescription,
    handleAddPermission,
    handleDeletePermission,
    handleViewPermissionDetails,
    handleEditPermission,
    handleSaveEdit,
    handleSearch,
    handleClear,
  };
};
