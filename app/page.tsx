"use client"

import { useEffect, useMemo, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button';
import EditModal from '@/components/edit-form';
import { MockProductDetails } from '@/util/data/models/product-detail';
import AddModal from '@/components/add-form';
import { CirclePlus, Ghost, Pencil } from 'lucide-react';



export default function Home() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAdd, setIsAdd] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);



useEffect(() => {
    setLoading(true);
    setData(MockProductDetails);
    setLoading(false);
  }, []);


const filteredData = useMemo(() => {
  
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    return data.filter(pd => 
      pd.purchaseOrderNumber.toLowerCase().includes(query) ||
      pd.itemNumber.toString().toLowerCase().includes(query) ||
      pd.itemName.toLowerCase().includes(query) ||
      pd.itemDescription.toLowerCase().includes(query) 
  )} else {
    return data;
  }
}, [data, searchQuery]);
 

 

function clearFilter() {
  setSearchQuery("");
}
 const handleChildData = (data: boolean) => {
  setIsAdd(data);
  setEditingId(null);
 }
  if (loading) {
      return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 text-white font-bold text-3xl">Loading...</div>;
  }

  return (
    <div className="container mx-auto">
      <div className="flex justify-end items-center">
          <input type="text"
            placeholder="Filter Product Details..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-2 mt-5 px-2 py-2 rounded border-2" />
          
          <Button className="mx-4 mt-3 button-lg" onClick={clearFilter}>Clear Filter</Button>
      </div>
      <Table className='border-1'>
        <TableHeader>
          <TableRow>
            <TableHead><Button variant={Ghost} onClick={(e) => { e.preventDefault(); setIsAdd(true);}}><CirclePlus></CirclePlus></Button>
          {isAdd && <AddModal onSendData={handleChildData} />}</TableHead>
            <TableHead className="font-bold">Item Id</TableHead>
            <TableHead className="font-bold">Purchase Order #</TableHead>
            <TableHead className="font-bold">Line #</TableHead>
            <TableHead className="font-bold">Item #</TableHead>
            <TableHead className="font-bold">Item Name</TableHead>
            <TableHead className="font-bold">Item Description</TableHead>
            <TableHead className="text-right font-bold">Purchase Price</TableHead>
            <TableHead className="font-bold">Purchase Quantitiy</TableHead>
            <TableHead className="font-bold">Last Modified By</TableHead>
            <TableHead className="font-bold">Date Last Modified</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((detail, i) => (
            <TableRow key={detail.purchaseDetailItemAutoId}>
              <TableCell>
                <Button variant={Ghost} onClick={(e) => { e.preventDefault(); setEditingId(detail.purchaseDetailItemAutoId);}}><Pencil></Pencil></Button>
                {editingId === detail.purchaseDetailItemAutoId && <EditModal id={detail.purchaseDetailItemAutoId} onSendData={handleChildData} />}
              </TableCell>
              <TableCell className="font-medium">{detail.purchaseDetailItemAutoId}</TableCell>
              <TableCell>{detail.purchaseOrderNumber}</TableCell>
              <TableCell>{detail.lineNumber}</TableCell>
              <TableCell>{detail.itemNumber}</TableCell>
              <TableCell>{detail.itemName}</TableCell>
              <TableCell>{detail.itemDescription}</TableCell>
              <TableCell className="text-right">{detail.purchasePrice}</TableCell>
              <TableCell>{detail.purchaseQuantity}</TableCell>
              <TableCell>{detail.lastModifiedByUser}</TableCell>
              <TableCell>{detail.lastModifiedDateTime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      
   </div>
  )
}
