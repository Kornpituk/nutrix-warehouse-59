import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Download,
  RefreshCcw,
  ChevronDown,
  ArrowUpDown,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from '@/hooks/use-toast';

import { Loading } from "@/components/ui/custom/loading";
import { StockItem, StockResponse } from "@/types/stock";
import { authenticatedFetch } from "@/utils/auth";

// Mock data for additional filters
const warehouses = [
  "All Warehouses",
  "Bangkok Central",
  "Chiang Mai Distribution",
  "Phuket Storage",
  "Pattaya Facility",
];
const zones = ["All Zones", "Zone A", "Zone B", "Zone C", "Zone D"];
const areas = [
  "All Areas",
  "Dry Food",
  "Wet Food",
  "Premium Section",
  "Specialty",
  "Health",
  "Small Pets",
  "Aquatics",
];
const categories = [
  "All Categories",
  "LADIES WEAR",
  "MEN WEAR",
  "KIDS WEAR",
  "ACCESSORIES",
];

const StockUpdate = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedWarehouse, setSelectedWarehouse] = useState("All Warehouses");
  const [selectedZone, setSelectedZone] = useState("All Zones");
  const [selectedArea, setSelectedArea] = useState("All Areas");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [stockItems, setStockItems] = useState<StockItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<StockItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<StockItem | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [error, setError] = useState<string | null>(null);
  const [locationId, setLocationId] = useState<string>("1");

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
        console.error('Error parsing stored warehouse:', error);
      }
    }

    fetchStockData();
  }, [navigate, currentPage, perPage, locationId]);

  const buildQueryParams = () => {
    const queryParams = new URLSearchParams({
      page: currentPage.toString(),
      perPage: perPage.toString(),
    });

    // Add search filters if set
    if (searchTerm) {
      queryParams.append('searchByProductName', searchTerm);
      queryParams.append('searchByBarcode', searchTerm);
      queryParams.append('searchByProductId', searchTerm);
    }

    // Add category filter if not "All Categories"
    if (selectedCategory !== "All Categories") {
      queryParams.append('searchByCategory', selectedCategory);
    }

    // Add zone filter if not "All Zones"
    if (selectedZone !== "All Zones") {
      queryParams.append('zoneId', selectedZone.replace('Zone ', ''));
    }

    // Add area filter if not "All Areas"
    if (selectedArea !== "All Areas") {
      queryParams.append('areaId', selectedArea);
    }

    // Add sorting parameters if set
    if (sortColumn) {
      const sortParam = `sortBy${sortColumn.charAt(0).toUpperCase() + sortColumn.slice(1)}`;
      queryParams.append(sortParam, sortDirection);
    }

    return queryParams;
  };

  const fetchStockData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const queryParams = buildQueryParams();

      const response = await authenticatedFetch(
        `https://webapiorg.easetrackwms.com/api/v1/StockUpdate?${queryParams.toString()}`,
        {
          headers: {
            'x-location': locationId,
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch stock data: ${response.status}`);
      }

      const data: StockResponse = await response.json();

      // Handle null items from API response
      const items = data.items || [];
      setStockItems(items);
      setFilteredItems(items);
      setTotalPages(data.totalPages || 1);
      setTotalCount(data.totalCount || 0);
      setPerPage(data.perPage || 10);
    } catch (error) {
      console.error("Error fetching stock data:", error);
      setError("Failed to load stock data. Please try again.");
      toast({
        title: "Error",
        description: "Failed to load stock data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Client-side filtering is now only used for warehouse selection
    // Other filters are handled by the API
    if (selectedWarehouse !== "All Warehouses") {
      // This would need to be implemented with actual warehouse data
      // For now, it's just a placeholder
    }
  }, [stockItems, selectedWarehouse]);

  const handleSelectAll = () => {
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredItems.map((item) => item.productId));
    }
  };

  const handleSelectItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleSort = (column: string) => {
    const newDirection = sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortDirection(newDirection);
    // Re-fetch data with new sort parameters
    setCurrentPage(1); // Reset to first page when sorting changes
    fetchStockData();
  };

  const handleViewDetail = (item: StockItem) => {
    setSelectedItem(item);
    setIsDetailOpen(true);
  };

  const handleSearch = () => {
    setCurrentPage(1); // Reset to first page on new search
    fetchStockData();
  };

  const handleClear = () => {
    setSearchTerm("");
    setSelectedWarehouse("All Warehouses");
    setSelectedZone("All Zones");
    setSelectedArea("All Areas");
    setSelectedCategory("All Categories");
    setSortColumn(null);
    setSortDirection("asc");
    setSelectedItems([]);
    setCurrentPage(1); // Reset to first page
    fetchStockData();
  };

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Your stock data is being exported to Excel.",
    });
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderSortIndicator = (column: string) => {
    if (sortColumn !== column) {
      return <ArrowUpDown className="ml-1 h-4 w-4" />;
    }
    return sortDirection === "asc" ? (
      <ChevronDown className="ml-1 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-1 h-4 w-4 rotate-180" />
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loading text="Loading stock update..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="text-red-500 mb-4">{error}</div>
        <Button onClick={fetchStockData}>Try Again</Button>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="container mx-auto"
    >
      <motion.div
        variants={itemVariants}
        className="mb-6 flex justify-between items-center"
      >
        <div>
          <h1 className="text-2xl font-bold">Stock Update: Detail by Lot Batch</h1>
          {/* <p className="text-gray-600">Manage and view your inventory items</p> */}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={handleExport}
            className="flex-1 space-x-1"
          >
            <Download size={16} />
            <span>Export</span>
          </Button>
          <Button
            variant="outline"
            onClick={handleExport}
            className="flex-1 space-x-1"
          >
            <Filter className="h-4 w-4" />
          </Button>
          {/* <Label htmlFor="showFilters" className="text-sm">
            Show Filters
          </Label>
          <Switch
            id="showFilters"
            checked={showFilters}
            onCheckedChange={toggleFilters}
          /> */}
        </div>
      </motion.div>

      {/* {showFilters && (
        <motion.div variants={itemVariants}>
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                <div className="lg:col-span-2">
                  <div className="flex w-full items-center space-x-2">
                    <Input
                      type="text"
                      placeholder="Search by product name, barcode, or ID"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>

                <div>
                  <Select
                    value={selectedWarehouse}
                    onValueChange={setSelectedWarehouse}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Warehouse" />
                    </SelectTrigger>
                    <SelectContent>
                      {warehouses.map((warehouse) => (
                        <SelectItem key={warehouse} value={warehouse}>
                          {warehouse}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Select value={selectedZone} onValueChange={setSelectedZone}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Zone" />
                    </SelectTrigger>
                    <SelectContent>
                      {zones.map((zone) => (
                        <SelectItem key={zone} value={zone}>
                          {zone}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Select value={selectedArea} onValueChange={setSelectedArea}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Area" />
                    </SelectTrigger>
                    <SelectContent>
                      {areas.map((area) => (
                        <SelectItem key={area} value={area}>
                          {area}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="lg:col-span-2">
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex space-x-2 lg:col-span-3">
                  <Button
                    variant="default"
                    onClick={handleSearch}
                    className="flex-1 space-x-1 bg-primary"
                  >
                    <Search size={16} />
                    <span>Search</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleClear}
                    className="flex-1 space-x-1"
                  >
                    <RefreshCcw size={16} />
                    <span>Clear</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleExport}
                    className="flex-1 space-x-1"
                  >
                    <Download size={16} />
                    <span>Export</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )} */}

      {showFilters && (
        <motion.div variants={itemVariants}>
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                <div className="lg:col-span-4">
                  <div className="flex w-full items-center space-x-2">
                    <Input
                      type="text"
                      placeholder="Search by product name, barcode, or ID"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="flex space-x-2 lg:col-span-1">
                  <Button
                    variant="default"
                    onClick={handleSearch}
                    className="flex-1 space-x-1 bg-primary"
                  >
                    <Search size={16} />
                    <span>Search</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleClear}
                    className="flex-1 space-x-1"
                  >
                    <RefreshCcw size={16} />
                    <span>Clear</span>
                  </Button>
                  {/* <Button
                    variant="outline"
                    onClick={handleExport}
                    className="flex-1 space-x-1"
                  >
                    <Download size={16} />
                    <span>Export</span>
                  </Button> */}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <motion.div variants={itemVariants}>
        <Card>
          <CardContent className="p-6">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    {/* <TableHead className="w-12">
                      <Checkbox
                        checked={
                          filteredItems.length > 0 &&
                          selectedItems.length === filteredItems.length
                        }
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead> */}
                    <TableHead className="w-12">No.</TableHead>
                    <TableHead className="w-16">Image</TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort("productId")}
                    >
                      <div className="flex w-40 items-center">
                        Item ID
                        {renderSortIndicator("productId")}
                      </div>
                    </TableHead>
                    
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort("productName")}
                    >
                      <div className="flex items-center">
                        Item Name
                        {renderSortIndicator("productName")}
                      </div>
                    </TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort("lotNumber")}
                    >
                      <div className="flex items-center">
                        Lot
                        {renderSortIndicator("lotNumber")}
                      </div>
                    </TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort("LotBatch")}
                    >
                      <div className="flex items-center">
                        Lot Batch
                        {renderSortIndicator("LotBatch")}
                      </div>
                    </TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort("Barcode")}
                    >
                      <div className="flex items-center w-30">
                      barcode
                        {renderSortIndicator("Barcode")}
                      </div>
                    </TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort("categories")}
                    >
                      <div className="flex items-center w-28">
                      Categories
                        {renderSortIndicator("categories")}
                      </div>
                    </TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort("Group")}
                    >
                      <div className="flex items-center">
                      Group
                        {renderSortIndicator("Group")}
                      </div>
                    </TableHead>
                    
                    {/* <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort("typeName")}
                    >
                      <div className="flex items-center">
                        Type
                        {renderSortIndicator("typeName")}
                      </div>
                    </TableHead>
                    <TableHead
                      className="cursor-pointer text-right"
                      onClick={() => handleSort("qty")}
                    >
                      <div className="flex items-center justify-end">
                        Quantity
                        {renderSortIndicator("qty")}
                      </div>
                    </TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead
                      className="cursor-pointer text-right"
                      onClick={() => handleSort("tags")}
                    >
                      <div className="flex items-center justify-end">
                        Tags
                        {renderSortIndicator("tags")}
                      </div>
                    </TableHead>
                    <TableHead
                      className="cursor-pointer text-right"
                      onClick={() => handleSort("nonTags")}
                    >
                      <div className="flex items-center justify-end">
                        Non-Tags
                        {renderSortIndicator("nonTags")}
                      </div>
                    </TableHead> */}
                    {/* <TableHead>Action</TableHead> */}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={12} className="h-24 text-center">
                        No items found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredItems.map((item, index) => (
                      <TableRow key={`${item.productId}-${item.barcode}-${item.unitId}`}>
                        {/* <TableCell>
                          <Checkbox
                            checked={selectedItems.includes(item.productId)}
                            onCheckedChange={() => handleSelectItem(item.productId)}
                          />
                        </TableCell> */}
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.productName}
                            className="h-12 w-12 rounded-md object-cover"
                            onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg" }}
                          />
                        </TableCell>
                        <TableCell>{item.productId}</TableCell>
                        <TableCell>{item.productName}</TableCell>
                        <TableCell>
                          {item.lotNumber}
                        </TableCell>
                        <TableCell>{item.lotNumber}</TableCell>
                        <TableCell>
                          {item.barcode}
                        </TableCell>
                        <TableCell>
                          {item.categoryName}
                        </TableCell>
                        <TableCell>
                          {item.typeName}
                        </TableCell>
                        
                        {/* <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleViewDetail(item)}
                          >
                            <Eye size={16} />
                          </Button>
                        </TableCell> */}
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {filteredItems.length} of {totalCount} items
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <span className="text-sm">
                  Page {currentPage} of {totalPages || 1}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages || totalPages === 0}
                >
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Product Details</DialogTitle>
          </DialogHeader>

          {selectedItem && (
            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex items-center justify-center">
                <img
                  src={selectedItem.image || "/placeholder.svg"}
                  alt={selectedItem.productName}
                  className="h-48 w-48 rounded-lg object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg" }}
                />
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {selectedItem.productName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {selectedItem.productId}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Category</p>
                    <p className="text-sm font-medium">
                      {selectedItem.categoryName}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Type</p>
                    <p className="text-sm font-medium">{selectedItem.typeName}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Barcode</p>
                    <p className="text-sm font-medium">{selectedItem.barcode}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Quantity</p>
                    <p className="text-sm font-medium">
                      {selectedItem.qty} {selectedItem.unitName}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p className="text-xs text-gray-500">Brand</p>
                    <p className="text-sm font-medium">
                      {selectedItem.brand || "N/A"}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-xs text-gray-500">Style No</p>
                    <p className="text-sm font-medium">{selectedItem.styleNo || "N/A"}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-xs text-gray-500">Color</p>
                    <p className="text-sm font-medium">{selectedItem.color || "N/A"}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-xs text-gray-500">Size</p>
                    <p className="text-sm font-medium">{selectedItem.size || "N/A"}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p className="text-xs text-gray-500">Tags</p>
                    <p className="text-sm font-medium">{selectedItem.tags}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-xs text-gray-500">Non-Tags</p>
                    <p className="text-sm font-medium">{selectedItem.nonTags}</p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="space-y-2 rounded-lg bg-background p-4">
                  <h4 className="font-medium text-gray-900">Stock Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Category</span>
                      <span>{selectedItem.categoryName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Type</span>
                      <span>{selectedItem.typeName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sub Type</span>
                      <span>{selectedItem.subTypeName}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default StockUpdate;
