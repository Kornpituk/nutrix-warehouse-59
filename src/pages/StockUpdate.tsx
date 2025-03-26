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

import { Loading } from "@/components/ui/custom/loading";

const stockItems = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    itemCode: "DF-1001",
    itemName: "Premium Dry Dog Food",
    category: "Dog Food",
    lot: "LOT-A123",
    lotQty: 120,
    totalQty: 1200,
    uom: "kg",
    warehouse: "Bangkok Central",
    zone: "Zone A",
    area: "Dry Food",
    shelfLife: 365,
    expiryDays: 210,
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    itemCode: "CF-2001",
    itemName: "Gourmet Cat Food",
    category: "Cat Food",
    lot: "LOT-B456",
    lotQty: 80,
    totalQty: 960,
    uom: "kg",
    warehouse: "Bangkok Central",
    zone: "Zone B",
    area: "Premium Section",
    shelfLife: 300,
    expiryDays: 175,
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    itemCode: "DF-1002",
    itemName: "Puppy Growth Formula",
    category: "Dog Food",
    lot: "LOT-C789",
    lotQty: 100,
    totalQty: 800,
    uom: "kg",
    warehouse: "Bangkok Central",
    zone: "Zone A",
    area: "Specialty",
    shelfLife: 400,
    expiryDays: 280,
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1607246749396-c1c289bc2227?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    itemCode: "CF-2002",
    itemName: "Senior Cat Formula",
    category: "Cat Food",
    lot: "LOT-D012",
    lotQty: 75,
    totalQty: 600,
    uom: "kg",
    warehouse: "Bangkok Central",
    zone: "Zone B",
    area: "Specialty",
    shelfLife: 280,
    expiryDays: 150,
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1603047384516-2658696884a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    itemCode: "BF-3001",
    itemName: "Premium Bird Seed Mix",
    category: "Bird Food",
    lot: "LOT-E345",
    lotQty: 50,
    totalQty: 400,
    uom: "kg",
    warehouse: "Bangkok Central",
    zone: "Zone C",
    area: "Small Pets",
    shelfLife: 240,
    expiryDays: 180,
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1597843786411-a7fa8ad44a95?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    itemCode: "FF-4001",
    itemName: "Tropical Fish Flakes",
    category: "Fish Food",
    lot: "LOT-F678",
    lotQty: 30,
    totalQty: 180,
    uom: "kg",
    warehouse: "Bangkok Central",
    zone: "Zone C",
    area: "Aquatics",
    shelfLife: 180,
    expiryDays: 120,
  },
  {
    id: 7,
    image:
      "https://images.unsplash.com/photo-1585846888147-3fe14c130048?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    itemCode: "DF-1003",
    itemName: "Grain-Free Dog Food",
    category: "Dog Food",
    lot: "LOT-G901",
    lotQty: 110,
    totalQty: 880,
    uom: "kg",
    warehouse: "Bangkok Central",
    zone: "Zone A",
    area: "Specialty",
    shelfLife: 320,
    expiryDays: 240,
  },
  {
    id: 8,
    image:
      "https://images.unsplash.com/photo-1608408832581-9c2b8c5a41fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    itemCode: "CF-2003",
    itemName: "Wet Cat Food Variety",
    category: "Cat Food",
    lot: "LOT-H234",
    lotQty: 90,
    totalQty: 720,
    uom: "kg",
    warehouse: "Bangkok Central",
    zone: "Zone B",
    area: "Wet Food",
    shelfLife: 200,
    expiryDays: 100,
  },
  {
    id: 9,
    image:
      "https://images.unsplash.com/photo-1591154669695-5f2a8d20c089?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    itemCode: "DF-1004",
    itemName: "Senior Dog Joint Care",
    category: "Dog Food",
    lot: "LOT-I567",
    lotQty: 70,
    totalQty: 560,
    uom: "kg",
    warehouse: "Bangkok Central",
    zone: "Zone A",
    area: "Health",
    shelfLife: 280,
    expiryDays: 160,
  },
  {
    id: 10,
    image:
      "https://images.unsplash.com/photo-1571566882372-1598d88abd90?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    itemCode: "SF-5001",
    itemName: "Small Animal Food Mix",
    category: "Small Animal",
    lot: "LOT-J890",
    lotQty: 40,
    totalQty: 320,
    uom: "kg",
    warehouse: "Bangkok Central",
    zone: "Zone C",
    area: "Small Pets",
    shelfLife: 240,
    expiryDays: 130,
  },
];

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
  "Dog Food",
  "Cat Food",
  "Bird Food",
  "Fish Food",
  "Small Animal",
];

const StockUpdate = () => {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedWarehouse, setSelectedWarehouse] = useState("All Warehouses");
  const [selectedZone, setSelectedZone] = useState("All Zones");
  const [selectedArea, setSelectedArea] = useState("All Areas");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [filteredItems, setFilteredItems] = useState(stockItems);
  const [selectedItem, setSelectedItem] = useState<
    (typeof stockItems)[0] | null
  >(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(true);



  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const selectedWarehouse = localStorage.getItem("selectedWarehouse");
    if (!selectedWarehouse) {
      navigate("/select-warehouse");
      return;
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigate]);

  useEffect(() => {
    let filtered = stockItems;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.itemCode.toLowerCase().includes(term) ||
          item.itemName.toLowerCase().includes(term) ||
          item.lot.toLowerCase().includes(term)
      );
    }

    if (selectedWarehouse !== "All Warehouses") {
      filtered = filtered.filter(
        (item) => item.warehouse === selectedWarehouse
      );
    }

    if (selectedZone !== "All Zones") {
      filtered = filtered.filter((item) => item.zone === selectedZone);
    }

    if (selectedArea !== "All Areas") {
      filtered = filtered.filter((item) => item.area === selectedArea);
    }

    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    if (sortColumn) {
      filtered = [...filtered].sort((a, b) => {
        const aValue = a[sortColumn as keyof typeof a];
        const bValue = b[sortColumn as keyof typeof b];

        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortDirection === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        } else {
          return sortDirection === "asc"
            ? (aValue as number) - (bValue as number)
            : (bValue as number) - (aValue as number);
        }
      });
    }

    setFilteredItems(filtered);
  }, [
    searchTerm,
    selectedWarehouse,
    selectedZone,
    selectedArea,
    selectedCategory,
    sortColumn,
    sortDirection,
  ]);

  const handleSelectAll = () => {
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredItems.map((item) => item.id));
    }
  };

  const handleSelectItem = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handleViewDetail = (item: (typeof stockItems)[0]) => {
    setSelectedItem(item);
    setIsDetailOpen(true);
  };

  const handleSearch = () => {};

  const handleClear = () => {
    setSearchTerm("");
    setSelectedWarehouse("All Warehouses");
    setSelectedZone("All Zones");
    setSelectedArea("All Areas");
    setSelectedCategory("All Categories");
    setSortColumn(null);
    setSortDirection("asc");
    setSelectedItems([]);
  };

  const handleExport = () => {
    alert("Exporting data...");
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
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
      <Loading text="Loading stock update..."  />
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
          <h1 className="text-2xl font-bold text-gray-900">Stock Update</h1>
          <p className="text-gray-600">Manage and view your inventory items</p>
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="showFilters" className="text-sm">
            Show Filters
          </Label>
          <Switch
            id="showFilters"
            checked={showFilters}
            onCheckedChange={toggleFilters}
          />
        </div>
      </motion.div>

      {showFilters && (
        <motion.div variants={itemVariants}>
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                <div className="lg:col-span-2">
                  <div className="flex w-full items-center space-x-2">
                    <Input
                      type="text"
                      placeholder="Search by item code, name, or lot"
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
      )}

      <motion.div variants={itemVariants}>
        <Card>
          <CardContent className="p-6">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={
                          selectedItems.length > 0 &&
                          selectedItems.length === filteredItems.length
                        }
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead className="w-12">No.</TableHead>
                    <TableHead className="w-16">Image</TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort("itemCode")}
                    >
                      <div className="flex items-center">
                        Item Code
                        {renderSortIndicator("itemCode")}
                      </div>
                    </TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort("itemName")}
                    >
                      <div className="flex items-center">
                        Item Name
                        {renderSortIndicator("itemName")}
                      </div>
                    </TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort("category")}
                    >
                      <div className="flex items-center">
                        Category
                        {renderSortIndicator("category")}
                      </div>
                    </TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort("lot")}
                    >
                      <div className="flex items-center">
                        Lot
                        {renderSortIndicator("lot")}
                      </div>
                    </TableHead>
                    <TableHead
                      className="cursor-pointer text-right"
                      onClick={() => handleSort("lotQty")}
                    >
                      <div className="flex items-center justify-end">
                        Lot Qty
                        {renderSortIndicator("lotQty")}
                      </div>
                    </TableHead>
                    <TableHead
                      className="cursor-pointer text-right"
                      onClick={() => handleSort("totalQty")}
                    >
                      <div className="flex items-center justify-end">
                        Total Qty
                        {renderSortIndicator("totalQty")}
                      </div>
                    </TableHead>
                    <TableHead>UoM</TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort("warehouse")}
                    >
                      <div className="flex items-center">
                        Warehouse
                        {renderSortIndicator("warehouse")}
                      </div>
                    </TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort("zone")}
                    >
                      <div className="flex items-center">
                        Zone
                        {renderSortIndicator("zone")}
                      </div>
                    </TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort("area")}
                    >
                      <div className="flex items-center">
                        Area
                        {renderSortIndicator("area")}
                      </div>
                    </TableHead>
                    <TableHead
                      className="cursor-pointer text-right"
                      onClick={() => handleSort("shelfLife")}
                    >
                      <div className="flex items-center justify-end">
                        Shelf Life (days)
                        {renderSortIndicator("shelfLife")}
                      </div>
                    </TableHead>
                    <TableHead
                      className="cursor-pointer text-right"
                      onClick={() => handleSort("expiryDays")}
                    >
                      <div className="flex items-center justify-end">
                        Expiry Days
                        {renderSortIndicator("expiryDays")}
                      </div>
                    </TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={15} className="h-24 text-center">
                        No items found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredItems.map((item, index) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedItems.includes(item.id)}
                            onCheckedChange={() => handleSelectItem(item.id)}
                          />
                        </TableCell>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <img
                            src={item.image}
                            alt={item.itemName}
                            className="h-12 w-12 rounded-md object-cover"
                          />
                        </TableCell>
                        <TableCell>{item.itemCode}</TableCell>
                        <TableCell>{item.itemName}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-gray-100">
                            {item.category}
                          </Badge>
                        </TableCell>
                        <TableCell>{item.lot}</TableCell>
                        <TableCell className="text-right">
                          {item.lotQty.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.totalQty.toLocaleString()}
                        </TableCell>
                        <TableCell>{item.uom}</TableCell>
                        <TableCell>{item.warehouse}</TableCell>
                        <TableCell>{item.zone}</TableCell>
                        <TableCell>{item.area}</TableCell>
                        <TableCell className="text-right">
                          {item.shelfLife}
                        </TableCell>
                        <TableCell className="text-right">
                          <span
                            className={
                              item.expiryDays < 30
                                ? "text-red-600"
                                : item.expiryDays < 90
                                ? "text-amber-600"
                                : "text-green-600"
                            }
                          >
                            {item.expiryDays}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleViewDetail(item)}
                          >
                            <Eye size={16} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Item Details</DialogTitle>
          </DialogHeader>

          {selectedItem && (
            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex items-center justify-center">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.itemName}
                  className="h-48 w-48 rounded-lg object-cover"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {selectedItem.itemName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {selectedItem.itemCode}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Category</p>
                    <p className="text-sm font-medium">
                      {selectedItem.category}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Lot</p>
                    <p className="text-sm font-medium">{selectedItem.lot}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Lot Quantity</p>
                    <p className="text-sm font-medium">
                      {selectedItem.lotQty} {selectedItem.uom}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Total Quantity</p>
                    <p className="text-sm font-medium">
                      {selectedItem.totalQty} {selectedItem.uom}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p className="text-xs text-gray-500">Warehouse</p>
                    <p className="text-sm font-medium">
                      {selectedItem.warehouse}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-xs text-gray-500">Zone</p>
                    <p className="text-sm font-medium">{selectedItem.zone}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-xs text-gray-500">Area</p>
                    <p className="text-sm font-medium">{selectedItem.area}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p className="text-xs text-gray-500">Shelf Life</p>
                    <p className="text-sm font-medium">
                      {selectedItem.shelfLife} days
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-xs text-gray-500">Expiry In</p>
                    <p
                      className={`text-sm font-medium ${
                        selectedItem.expiryDays < 30
                          ? "text-red-600"
                          : selectedItem.expiryDays < 90
                          ? "text-amber-600"
                          : "text-green-600"
                      }`}
                    >
                      {selectedItem.expiryDays} days
                    </p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="space-y-2 rounded-lg bg-gray-50 p-4">
                  <h4 className="font-medium text-gray-900">Stock History</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Last Received</span>
                      <span>May 10, 2023 (50 {selectedItem.uom})</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Shipped</span>
                      <span>May 15, 2023 (30 {selectedItem.uom})</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Count</span>
                      <span>May 1, 2023</span>
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
