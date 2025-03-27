
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { Plus, Search, Edit, Trash } from 'lucide-react';

const ProductSettings = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [products, setProducts] = useState([
    { id: 'PROD-001', name: 'Premium Dog Food', sku: 'DF-PREM-25', category: 'Dog Food', stock: 125 },
    { id: 'PROD-002', name: 'Standard Dog Food', sku: 'DF-STD-25', category: 'Dog Food', stock: 324 },
    { id: 'PROD-003', name: 'Cat Toy Mouse', sku: 'CT-MOUSE-01', category: 'Cat Toys', stock: 76 },
    { id: 'PROD-004', name: 'Premium Cat Food', sku: 'CF-PREM-10', category: 'Cat Food', stock: 108 },
    { id: 'PROD-005', name: 'Dog Bone Toy', sku: 'DT-BONE-01', category: 'Dog Toys', stock: 54 },
    { id: 'PROD-006', name: 'Cat Scratching Post', sku: 'CS-POST-01', category: 'Cat Accessories', stock: 32 },
    { id: 'PROD-007', name: 'Dog Collar - Large', sku: 'DC-LRG-01', category: 'Dog Accessories', stock: 48 },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: '',
    stock: 0,
  });

  const categories = ['Dog Food', 'Cat Food', 'Dog Toys', 'Cat Toys', 'Dog Accessories', 'Cat Accessories', 'Other'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'stock' ? parseInt(value) || 0 : value });
  };

  const handleCategoryChange = (value: string) => {
    setFormData({ ...formData, category: value });
  };

  const handleAddProduct = () => {
    if (!formData.name || !formData.sku || !formData.category) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newProduct = {
      id: `PROD-${(products.length + 1).toString().padStart(3, '0')}`,
      name: formData.name,
      sku: formData.sku,
      category: formData.category,
      stock: formData.stock
    };

    setProducts([...products, newProduct]);
    setIsAddDialogOpen(false);
    setFormData({ name: '', sku: '', category: '', stock: 0 });
    
    toast({
      title: "Product Added",
      description: `${newProduct.name} has been added successfully`
    });
  };

  const handleEditProduct = () => {
    if (!formData.name || !formData.sku || !formData.category) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const updatedProducts = products.map(product => {
      if (product.id === selectedProduct.id) {
        return {
          ...product,
          name: formData.name,
          sku: formData.sku,
          category: formData.category,
          stock: formData.stock
        };
      }
      return product;
    });

    setProducts(updatedProducts);
    setIsEditDialogOpen(false);
    setSelectedProduct(null);
    
    toast({
      title: "Product Updated",
      description: `${formData.name} has been updated successfully`
    });
  };

  const openAddDialog = () => {
    setFormData({ name: '', sku: '', category: '', stock: 0 });
    setIsAddDialogOpen(true);
  };

  const openEditDialog = (product: any) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      sku: product.sku,
      category: product.category,
      stock: product.stock
    });
    setIsEditDialogOpen(true);
  };

  // Filter products based on search term
  const filteredProducts = products.filter(product => 
    product.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('settings.product')}</h1>
          <p className="text-muted-foreground">
            Manage your product catalog and inventory settings.
          </p>
        </div>
        <Button onClick={openAddDialog} className="flex items-center gap-1">
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{products.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {new Set(products.map(p => p.category)).size}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {products.reduce((sum, p) => sum + p.stock, 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0 items-start">
          <div>
            <CardTitle>Product Catalog</CardTitle>
            <CardDescription>
              View and manage your product inventory
            </CardDescription>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.sku}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button size="icon" variant="outline" onClick={() => openEditDialog(product)}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button size="icon" variant="outline" className="text-destructive">
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Product Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>
              Enter the details for the new product
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange} 
                placeholder="Enter product name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sku">SKU</Label>
              <Input 
                id="sku" 
                name="sku" 
                value={formData.sku} 
                onChange={handleInputChange} 
                placeholder="Enter product SKU"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={handleCategoryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Initial Stock</Label>
              <Input 
                id="stock" 
                name="stock" 
                type="number" 
                min="0" 
                value={formData.stock.toString()} 
                onChange={handleInputChange} 
                placeholder="Enter initial stock quantity"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddProduct}>Add Product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Update the details for {selectedProduct?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Product Name</Label>
              <Input 
                id="edit-name" 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange} 
                placeholder="Enter product name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-sku">SKU</Label>
              <Input 
                id="edit-sku" 
                name="sku" 
                value={formData.sku} 
                onChange={handleInputChange} 
                placeholder="Enter product SKU"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-category">Category</Label>
              <Select value={formData.category} onValueChange={handleCategoryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-stock">Stock</Label>
              <Input 
                id="edit-stock" 
                name="stock" 
                type="number" 
                min="0" 
                value={formData.stock.toString()} 
                onChange={handleInputChange} 
                placeholder="Enter stock quantity"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEditProduct}>Update Product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductSettings;
